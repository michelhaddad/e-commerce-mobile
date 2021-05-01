import { API_URL, NEW_API_URL } from '../../utils/Config';
import { timeoutPromise } from '../../utils/Tools';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const PRODUCT_LOADING = 'PRODUCT_LOADING';
export const PRODUCT_FAILURE = 'PRODUCT_FAILURE';

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: PRODUCT_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${NEW_API_URL}/products`, {
          method: 'GET',
        }),
      );
      if (!response.ok) {
        dispatch({
          type: PRODUCT_FAILURE,
        });
        throw new Error('Something went wrong while fetching the products');
      }
      const data = await response.json();
      dispatch({
        type: FETCH_PRODUCTS,
        products: data,
      });
    } catch (err) {
      throw err;
    }
  };
};
