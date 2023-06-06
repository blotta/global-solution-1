import React, { useState } from 'react';
// import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container } from '@mui/material';
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
                  {address.street}, {address.city}, {address.country}
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
          <TextField
            name="scheduledDate"
            label="Data Para Buscar"
            type="date"
            value={orderData.scheduledDate}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Order
          </Button>


        </Box>
      </Container>
    </div>
  )
}


const AddOrderForm = ({ addresses, onAddOrder }) => {

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Address</InputLabel>
        <Select
          name="addressId"
          value={orderData.addressId}
          onChange={handleChange}
          required
        >
          {addresses.map((address) => (
            <MenuItem key={address.id} value={address.id}>
              {address.street}, {address.city}, {address.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Type</InputLabel>
        <Select
          name="type"
          value={orderData.type}
          onChange={handleChange}
          required
        >
          <MenuItem value="type1">Type 1</MenuItem>
          <MenuItem value="type2">Type 2</MenuItem>
          <MenuItem value="type3">Type 3</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="scheduledDate"
        label="Scheduled Date"
        type="date"
        value={orderData.scheduledDate}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Order
      </Button>
    </form>
  );
};
