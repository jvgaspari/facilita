import { useQuery } from "react-query";
import { ICustomerDto, IResponseBase } from "./CustomerList";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";

const fetchOptimizedRoute = async (): Promise<
  IResponseBase<ICustomerDto[]>
> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/roads`);
  return response.json();
};

export const ModalList: React.FC = () => {
  const { data, isLoading, isError } = useQuery(["optimized"], () =>
    fetchOptimizedRoute()
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao buscar dados!</div>;
  }

  return (
    <>
      <Button onClick={handleIconClick} variant="outlined">
        Rota Otimizada
      </Button>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box sx={style}>
          <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Coordinate X</TableCell>
                  <TableCell>Coordinate Y</TableCell>
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
      </Modal>
    </>
  );
};
