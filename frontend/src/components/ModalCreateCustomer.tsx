import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  coordinate_x: number;
  coordinate_y: number;
}

yup.setLocale({
  mixed: {
    required: "Campo obrigatório",
    notType: "O campo ${path} deve ser do tipo número",
  },
  string: {
    length: "Deve ter exatamente ${length} caracteres",
    min: "Deve ter pelo menos ${min} caracteres",
    max: "Deve ter no máximo ${max} caracteres",
    email: "Deve ser um e-mail válido",
    url: "Deve ser uma URL válida",
    trim: "Não deve conter espaços no início ou no fim",
    lowercase: "Deve estar em minúsculas",
    uppercase: "Deve estar em maiúsculas",
  },
  number: {
    min: "Deve ser no mínimo ${min}",
    max: "Deve ser no máximo ${max}",
    lessThan: "Deve ser menor que ${less}",
    moreThan: "Deve ser maior que ${more}",
    positive: "Deve ser um número positivo",
    negative: "Deve ser um número negativo",
    integer: "Deve ser um número inteiro",
  },
});

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    coordinate_x: yup.number().positive().integer().required(),
    coordinate_y: yup.number().positive().integer().required(),
  })
  .required();

export const ModalCreateCustomer: React.FC = () => {
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
    minWidth: 400,
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      coordinate_x: 0,
      coordinate_y: 0,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/customers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status}: ${await response.text()}`
        );
      }

      await queryClient.invalidateQueries(["customers"]);
      reset();
      handleModalClose();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error submitting data:", error.message);
      }
    }
  };

  return (
    <>
      <Button onClick={handleIconClick} variant="contained">
        Adicionar Cliente
      </Button>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box sx={style}>
          <Typography mb="12px" textAlign="center">
            Cadastro de Clientes
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Box>
                  <TextField {...field} label="Nome" fullWidth required />
                  <Typography fontSize="10px" color="red">
                    {errors.name?.message}
                  </Typography>
                </Box>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Box>
                  <TextField {...field} label="Email" fullWidth required />
                  <Typography fontSize="10px" color="red">
                    {errors.email?.message}
                  </Typography>
                </Box>
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Box>
                  <TextField {...field} label="Telefone" fullWidth required />
                  <Typography fontSize="10px" color="red">
                    {errors.phone?.message}
                  </Typography>
                </Box>
              )}
            />
            <Controller
              name="coordinate_x"
              control={control}
              render={({ field }) => (
                <Box>
                  <TextField
                    {...field}
                    label="Coordenada X"
                    fullWidth
                    required
                  />
                  <Typography fontSize="10px" color="red">
                    {errors.coordinate_x?.message}
                  </Typography>
                </Box>
              )}
            />
            <Controller
              name="coordinate_y"
              control={control}
              render={({ field }) => (
                <Box>
                  <TextField
                    {...field}
                    label="Coordenada Y"
                    fullWidth
                    required
                  />
                  <Typography fontSize="10px" color="red">
                    {errors.coordinate_y?.message}
                  </Typography>
                </Box>
              )}
            />
            <Box width="100%" display="flex" justifyContent="center">
              <Button variant="contained" type="submit" sx={{ width: "120px" }}>
                Enviar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
