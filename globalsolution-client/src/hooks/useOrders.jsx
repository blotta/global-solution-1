import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

export const useOrders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const {token} = useAuth();


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // const token = localStorage.getItem('token');
        const response = await axios.get('/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("fetchOrders", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchOrders();
  }, [refresh]);

  const refreshOrders = () => {
    setRefresh(prev => prev + 1);
  }

  const scheduleOrder = async (orderId) => {
    try {
      setLoading(true);
      const response = await axios.post(`/orders/${orderId}/schedule`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      refreshOrders();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  const pickupOrder = async (orderId) => {
    try {
      setLoading(true);
      const response = await axios.post(`/orders/${orderId}/pickup`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      refreshOrders();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }

  }

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refreshOrders();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };



  return {
    orders,
    loading,
    scheduleOrder,
    pickupOrder,
    deleteOrder,
  };
};

export default useOrders;
