import {
  FETCH_PRODUCTS,
  PRODUCT_LOADING,
  PRODUCT_FAILURE,
  FETCH_COLLECTIONS,
  ADD_PRODUCT,
  ADD_PRODUCT_FAIL,
  START_ADD_PRODUCT,
} from './productActions';
import { FIRST_OPEN } from './checkFirstTimeActions';

const initialState = {
  products: [],
  collections: [],
  isFirstOpen: false,
  isLoading: false,
};
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.products,
        isLoading: false,
      };
    case FETCH_COLLECTIONS:
      return {
        ...state,
        collections: action.collections,
        isLoading: false,
      };
    case FIRST_OPEN: {
      return {
        ...state,
        isFirstOpen: true,
      };
    }
    case START_ADD_PRODUCT: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ADD_PRODUCT: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ADD_PRODUCT_FAIL: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
