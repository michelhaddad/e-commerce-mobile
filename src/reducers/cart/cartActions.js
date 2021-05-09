import { API_URL } from '../../utils/Config';
import { timeoutPromise } from '../../utils/Tools';
export const CART_LOADING = 'CART_LOADING';
export const CART_FAILURE = 'CART_FAILURE';
export const FETCH_CART = 'FETCH_CART';
export const ADD_CART = 'ADD_CART';
export const RESET_CART = 'RESET_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const DES_CART_QUANTITY = 'DES_CART_QUANTITY';

//Add Add to Cart
export const addToCart = (item) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_CART,
      cartItem: item,
    });
  };
};

//Remove from Cart
export const removeFromCart = (cartId, itemId) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      itemId,
    });
  };
};

//Decrease cart quantity
export const decCartQuantity = (cartId, itemId) => {
  return async (dispatch) => {
    dispatch({
      type: 'DES_CART_QUANTITY',
      cartItemId: itemId,
    });
  };
};

//Reset Cart
export const resetCart = () => {
  return async (dispatch) => {
    dispatch({
      type: 'RESET_CART',
    });
  };
};
