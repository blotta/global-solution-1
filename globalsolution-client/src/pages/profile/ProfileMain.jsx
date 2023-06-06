import { Card, CardContent, Container, Divider, Grid, Typography } from "@mui/material"
import Header from "../../components/Header"
import OrderList from "../../components/OrderList"
import { useProfile } from "../../hooks/useProfile";
import AddressList from "../../components/AddressList";

export default function ProfileMain() {
  const {profile, loading, deleteAddress, deleteOrder} = useProfile();

  if (loading) {
    return (
      <Typography>Loading</Typography>
    )

  }
  return (
    <div>
      <Header />
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Card variant="outlined" sx={{marginY: 2}}>
            <CardContent>
              <Typography variant="h5" component="h5">
                Minhas Informações
              </Typography>
              <Typography variant="h6" component="p" mt={2}>
                Nome: {profile.name}
              </Typography>
              <Typography variant="h6" component="p" mt={2}>
                Email: {profile.email}
              </Typography>
            </CardContent>
          </Card>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Pedidos</Typography>
            {profile.orders != null && profile.orders.length > 0 && <OrderList orders={profile.orders} deleteOrder={deleteOrder} /> }
            {profile.orders == null || profile.orders.length == 0 && <Typography>Não há pedidos realizados</Typography> }
          </Grid>

          <Grid item xs={12} >
            <Typography variant="h6">Endereços</Typography>
            {profile.addresses != null && profile.addresses.length > 0 && <AddressList addresses={profile.addresses} deleteAddress={deleteAddress} /> }
            {profile.addresses == null || profile.addresses.length == 0 && <Typography>Não há endereços cadastrados</Typography> }
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}