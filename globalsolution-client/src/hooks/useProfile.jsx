import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const {token} = useAuth();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const token = localStorage.getItem('token');
        const response = await axios.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error(error);
        if (error.response == 401) {
          
        }
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchProfile();
  }, [refresh]);

  const addAddress = async (addressData) => {
    try {
      setLoading(true);
      // const token = localStorage.getItem('token');
      const response = await axios.post('/profile/address', addressData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const newAddress = response.data;
      setProfile((prevProfile) => ({
        ...prevProfile,
        addresses: [...prevProfile.addresses, newAddress],
      }));
      return newAddress;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      // const token = localStorage.getItem('token');
      const response = await axios.delete(`/profile/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const deletedAddress = response.data;
      setProfile((prevProfile) => ({
        ...prevProfile,
        addresses: prevProfile.addresses.filter(
          (address) => address.id !== addressId
        ),
      }));
      return deletedAddress;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const addOrder = async (orderData) => {
    try {
      setLoading(true);
      // const token = localStorage.getItem('token');
      const response = await axios.post('/profile/order', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const newOrder = response.data;
      setProfile((prevProfile) => ({
        ...prevProfile,
        orders: [...prevProfile.orders, newOrder],
      }));
      return newOrder;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      // const token = localStorage.getItem('token');
      await axios.delete(`/profile/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRefresh(prev => prev + 1);
      // setProfile((prevProfile) => ({
      //   ...prevProfile,
      //   orders: prevProfile.orders.filter((order) => order.id !== orderId),
      // }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    profile,
    loading,
    addAddress,
    deleteAddress,
    addOrder,
    deleteOrder,
  };
};

export default useProfile;
