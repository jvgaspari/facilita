// src/components/CustomerList.tsx
import React from "react";
import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

export interface ICustomerDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  coordinate_x: number;
  coordinate_y: number;
}

export type IResponseBase<T> = {
  status: number;
  message: string;
  data: T;
};

const fetchCustomers = async (
  search: string
): Promise<IResponseBase<ICustomerDto[]>> => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/customers?search=${search}`
  );
  return response.json();
};

const CustomerList: React.FC<{ search: string }> = ({ search }) => {
  const { data, isLoading, isError } = useQuery(["customers", search], () =>
    fetchCustomers(search)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Box width="100%">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Coordenada X</TableCell>
              <TableCell>Coordenada Y</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((customer: ICustomerDto) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.coordinate_x}</TableCell>
                <TableCell>{customer.coordinate_y}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerList;
