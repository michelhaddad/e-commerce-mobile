import React, { useState, useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, StyleSheet, ScrollView } from 'react-native';
//Address
import Address from './components/Address';
//Redux
import { useSelector } from 'react-redux';
//Steps
import Colors from '../../utils/Colors';
import { Header, SummaryOrder, TotalButton, UserForm } from './components';
import Loader from '../../components/Loaders/Loader';

export const PreOrderScreen = (props) => {
  const unmounted = useRef(false);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const carts = useSelector((state) => state.cart.cartItems);
  const { cartItems, total, cartId } = props.route.params;
  const [error, setError] = useState('');

  //Shipping info
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      const interval = setInterval(() => {
        setLoading(false);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isFocused]);

  const getReceiver = (
    firstName,
    lastName,
    phoneNumber,
    addressLine1,
    city,
    district,
  ) => {
    setFirstName(firstName);
    setlastName(lastName);
    setPhoneNumber(phoneNumber);
    setAddressLine1(addressLine1);
    setCity(city);
    setDistrict(district);
  };
  const checkValidation = (error) => {
    setError(error);
  };
  let orderItems = [];
  cartItems.map((item) => {
    orderItems.push({ item: item.item._id, quantity: item.quantity });
  });

  const toPayment = async () => {
    try {
      if (error === undefined) {
        props.navigation.navigate('Payment', {
          screen: 'PaymentScreen',
          params: {
            orderItems,
            firstName,
            lastName,
            phoneNumber,
            addressLine1,
            city,
            district,
            total,
            cartId,
            carts,
            cartItems,
          },
        });
      } else {
        alert('Please fill all your info');
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    if (carts.items.length === 0) {
      props.navigation.goBack();
    }
  }, [carts.items]);
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ScrollView>
            <UserForm
              getReceiver={getReceiver}
              checkValidation={checkValidation}
            />
            <SummaryOrder cartItems={cartItems} total={total} />
          </ScrollView>
          <TotalButton toPayment={toPayment} />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
});
