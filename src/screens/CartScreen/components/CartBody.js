import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
//Redux
import { useDispatch } from 'react-redux';
//Action
import { removeFromCart, addToCart, decCartQuantity } from '../../../reducers';
//Text
import CustomText from '../../../components/UI/CustomText';
//Colors
import Colors from '../../../utils/Colors';
import { CartItem } from './CartItem';
import Messages from '../../../messages/user';
//PropTypes check
import PropTypes from 'prop-types';

export const CartBody = ({ navigation, user, carts, isRefreshing }) => {
  const dispatch = useDispatch();
  const onRemove = (itemId) => {
    Alert.alert(
      'Remove product',
      'Do you really want to remove this product?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(removeFromCart(carts._id, itemId));
          },
        },
      ],
    );
  };
  return (
    <View style={styles.footer}>
      {Object.keys(user).length === 0 ? (
        <View style={styles.center}>
          <CustomText>{Messages['user.login.require']}</CustomText>
          <View style={styles.nextButton}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <CustomText style={{ color: '#fff' }}>Go to Login</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      ) : carts.items.length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 28, textAlign: 'center' }}>
            Nothing in your cart yet!
          </CustomText>
        </View>
      ) : (
        <View style={{ marginBottom: 80 }}>
          <FlatList
            data={carts.items}
            refreshing={isRefreshing}
            keyExtractor={(item) => item.item._id}
            renderItem={({ item }) => {
              return (
                <CartItem
                  item={item}
                  onRemove={() => onRemove(item.item._id)}
                  onAdd={() => {
                    dispatch(addToCart(item.item, user.token));
                  }}
                  onDes={() => {
                    dispatch(decCartQuantity(carts._id, item.item._id));
                  }}
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

CartBody.propTypes = {
  user: PropTypes.object.isRequired,
  carts: PropTypes.object.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
  },
  nextButton: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.lighter_green,
    borderRadius: 5,
    borderColor: Colors.lighter_green,
    marginTop: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
});
