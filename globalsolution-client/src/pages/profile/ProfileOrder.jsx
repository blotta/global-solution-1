import React, { useState } from 'react';
import Header from "../../components/Header"
import useProfile from '../../hooks/useProfile';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

export default function ProfileOrder() {
  const navigate = useNavigate();
  const { profile, addOrder, loading } = useProfile();

  const [orderData, setOrderData] = useState({
    addressId: '',
    type: '',
    scheduledDate: '',
  });

  const handleChange = (e) => {
    setOrderData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addOrder(orderData);
    if (result != null) navigate("/");
  };

  const minimumDate = () => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  if (loading) {
    return (
      <p>loading</p>
    )
  }


  return (
    <div>
      <Header />
      <Container maxWidth="sm" sx={{ marginTop: 3 }}>
        <Typography variant='h5'>Novo Pedido</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >


          <FormControl fullWidth margin="normal">
            <InputLabel>Endereço</InputLabel>
            <Select
              name="addressId"
              value={orderData.addressId}
              onChange={handleChange}
              required
            >
              {profile.addresses.map((address) => (
                <MenuItem key={address.id} value={address.id}>
                  {address.street} {address.number}, {address.city} - {address.state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo</InputLabel>
            <Select
              name="type"
              value={orderData.type}
              onChange={handleChange}
              required
            >
              <MenuItem value="consumable">Consumível</MenuItem>
              <MenuItem value="recyclable">Reciclável</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin='normal'>

            <TextField
              name="scheduledDate"
              label="Data Para Coleta"
              type="date"
              value={orderData.scheduledDate}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              InputProps={{
                inputProps: {
                min: minimumDate()
                }
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>


        </Box>
      </Container>
    </div>
  )
}
