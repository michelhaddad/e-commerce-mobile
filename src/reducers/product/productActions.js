import { API_URL, NEW_API_URL } from '../../utils/Config';
import { timeoutPromise } from '../../utils/Tools';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const PRODUCT_LOADING = 'PRODUCT_LOADING';
export const PRODUCT_FAILURE = 'PRODUCT_FAILURE';
export const FETCH_COLLECTIONS = 'FETCH_COLLECTIONS';

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: PRODUCT_LOADING,
    });
    try {
      const productsResponse = await timeoutPromise(
        fetch(`${NEW_API_URL}/products`, {
          method: 'GET',
        }),
      );
      const collectionsResponse = await timeoutPromise(
        fetch(`${NEW_API_URL}/collections`, {
          method: 'GET',
        }),
      );
      if (!productsResponse.ok || !collectionsResponse.ok) {
        dispatch({
          type: PRODUCT_FAILURE,
        });
        throw new Error('Something went wrong while fetching the products');
      }
      const products = await productsResponse.json();
      const collections = await collectionsResponse.json();
      dispatch({
        type: FETCH_PRODUCTS,
        products,
      });
      dispatch({
        type: FETCH_COLLECTIONS,
        collections,
      });
    } catch (err) {
      throw err;
    }
  };
};
