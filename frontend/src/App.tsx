// src/App.tsx
import React, { useState } from "react";
import CustomerList from "./components/CustomerList";
import { QueryClient, QueryClientProvider } from "react-query";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { ModalList } from "./components/ModalList";
import { ModalCreateCustomer } from "./components/ModalCreateCustomer";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setSearch(searchTerm);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          width="100%"
          padding="24px"
          gap={8}
        >
          <Typography>Sistema de Gerenciamento de Clientes</Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box display="flex" gap={2} alignItems="center">
              <TextField
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Procure um termo"
                size="small"
                fullWidth
              />
              <Button onClick={handleSearch} variant="contained">
                Pesquisar
              </Button>
            </Box>
            <Box display="flex" gap={2} alignItems="center">
              <ModalList />
              <ModalCreateCustomer />
            </Box>
          </Box>
          <CustomerList search={search} />
        </Box>
      </Container>
    </QueryClientProvider>
  );
};

export default App;
