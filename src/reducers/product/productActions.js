import { API_URL, NEW_API_URL } from '../../utils/Config';
import { timeoutPromise } from '../../utils/Tools';
import { AUTH_FAILURE, AUTH_LOADING, UPLOAD_PROFILEPIC } from '../auth';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const PRODUCT_LOADING = 'PRODUCT_LOADING';
export const PRODUCT_FAILURE = 'PRODUCT_FAILURE';
export const FETCH_COLLECTIONS = 'FETCH_COLLECTIONS';
export const START_ADD_PRODUCT = 'START_ADD_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_FAIL = 'ADD_PRODUCT_FAIL';

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

export const AddProduct = (productInfo, imageUri, filename) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;

    dispatch({
      type: START_ADD_PRODUCT,
    });
    try {
      let addProductResponse = await timeoutPromise(
        fetch(`${NEW_API_URL}/products`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
          },
          method: 'POST',
          body: JSON.stringify(productInfo),
        }),
      );
      if (!addProductResponse.ok) {
        const errorResData = await addProductResponse.json();
        dispatch({
          type: ADD_PRODUCT_FAIL,
        });
        throw new Error(errorResData.err);
      }
      addProductResponse = await addProductResponse.json();
      const productId = addProductResponse._id;

      let formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: filename,
        type: 'image/jpeg',
      });
      let addImageResponse = await timeoutPromise(
        fetch(`${NEW_API_URL}/products/${productId}/image`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + user.token,
          },
          method: 'POST',
          body: formData,
        }),
      );
      if (!addImageResponse.ok) {
        const errorResData = await addImageResponse.json();
        dispatch({
          type: ADD_PRODUCT_FAIL,
        });
        throw new Error(errorResData.err);
      }
      dispatch({
        type: ADD_PRODUCT,
      });
    } catch (err) {
      throw err;
    }
  };
};
