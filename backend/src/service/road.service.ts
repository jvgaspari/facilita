import { Customer } from "../model/customer";
import { RoadRepository } from "../repository/road.repository";

export class RoadService {
  static async getOptimizedRoad(): Promise<{
    status: number;
    message: string;
    data: Customer[];
  }> {
    try {
      const customers = await RoadRepository.getOptimizedRoad();
      const coordinates = customers.map((customer) => [
        customer.coordinate_x,
        customer.coordinate_y,
      ]);
      const optimizedRoute = await this.calculateOptimizedRoute(coordinates);

      const orderedVisits = optimizedRoute.map((index) => customers[index]);

      return { status: 200, message: "Optimized Route", data: orderedVisits };
    } catch (error) {
      throw error;
    }
  }

  private static async calculateOptimizedRoute(
    coordinates: number[][]
  ): Promise<number[]> {
    const numCustomers = coordinates.length;
    const indicesCustomers: number[] = Array.from(
      { length: numCustomers },
      (_, i) => i
    );

    let bestRoute: number[] = [...indicesCustomers];
    let shortestDistance = await this.calculateTotalDistance(
      coordinates,
      bestRoute
    );

    await this.permute(indicesCustomers, async (permutation: number[]) => {
      const currentDistance = await this.calculateTotalDistance(
        coordinates,
        permutation
      );

      if (currentDistance < shortestDistance) {
        shortestDistance = currentDistance;
        bestRoute = [...permutation];
      }
    });

    return bestRoute;
  }

  private static async permute(
    arr: number[],
    callback: (arr: number[]) => Promise<void>
  ) {
    const len = arr.length;
    const c: number[] = Array(len).fill(0);
    let i = 1;

    while (i < len) {
      if (c[i] < i) {
        const swapIndex = i % 2 === 0 ? 0 : c[i];
        [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
        await callback([...arr]);
        c[i] += 1;
        i = 1;
      } else {
        c[i] = 0;
        i += 1;
      }
    }
  }

  private static async calculateTotalDistance(
    coordinates: number[][],
    route: number[]
  ): Promise<number> {
    let totalDistance = 0;

    for (let i = 0; i < route.length - 1; i++) {
      const currentCustomer = coordinates[route[i]];
      const nextCustomer = coordinates[route[i + 1]];

      totalDistance += await this.calculateDistance(
        currentCustomer,
        nextCustomer
      );
    }

    return totalDistance;
  }

  private static calculateDistance(point1: number[], point2: number[]): number {
    const deltaX = point2[0] - point1[0];
    const deltaY = point2[1] - point1[1];

    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  }
}
