import { Container, Typography } from "@mui/material";
import Header from "../components/Header";
import { useOrders } from "../hooks/useOrders";
import OrderManagerList from "../components/OrderManagerList";


export default function OrderManagement() {
  const { orders, scheduleOrder, pickupOrder, deleteOrder } = useOrders();
  console.log(orders);

  return (
    <div>
      <Header />
      <Container maxWidth="md" sx={{ marginY: 3 }}>
        <Typography variant="h4">Pedidos</Typography>
        {orders != null && orders.length > 0 && <OrderManagerList orders={orders} scheduleOrder={scheduleOrder} pickupOrder={pickupOrder} deleteOrder={deleteOrder} />}
        {orders == null || orders.length == 0 && <Typography>Não há pedidos realizados</Typography>}
      </Container>
    </div>
  )
}