import React, { useState } from 'react';
import Header from "../../components/Header"
import { Box, Button, Container, FormControl, TextField, Typography } from '@mui/material';
import useProfile from '../../hooks/useProfile';
import { useNavigate } from 'react-router-dom';

export default function ProfileAddress() {
  const navigate = useNavigate();

  const {addAddress, loading} = useProfile();

  const [addressData, setAddressData] = useState({
    street: '',
    number: '',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    zipcode: '04783-100',
  });

  const handleChange = (e) => {
    setAddressData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addAddress(addressData);
    if (success) navigate("/");
  };

  return (
    <div>
      <Header />

      <Container maxWidth="sm" sx={{marginTop: 3}}>
        <Typography variant='h5'>Novo endereço</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >


          <TextField
            name="street"
            label="Rua"
            value={addressData.street}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="number"
            label="Número"
            value={addressData.number}
            onChange={handleChange}
            type="number"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="city"
            label="Cidade"
            value={addressData.city}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="state"
            label="Estado"
            value={addressData.state}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="country"
            label="País"
            value={addressData.country}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="zipcode"
            label="CEP"
            value={addressData.zipcode}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            Enviar
          </Button>
        </Box>
      </Container>
    </div>
  )
}
