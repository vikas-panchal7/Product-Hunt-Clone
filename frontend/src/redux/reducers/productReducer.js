import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_LIKE_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_COMMENT_REQUEST,
  PRODUCT_CREATE_COMMENT_SUCCESS,
  PRODUCT_CREATE_COMMENT_FAIL,
  PRODUCT_CREATE_COMMENT_RESET,
  PRODUCT_CREATE_LIKE_REQUEST,
  PRODUCT_CREATE_LIKE_SUCCESS,
  PRODUCT_CREATE_LIKE_FAIL,
  PRODUCT_GET_LIKE_SUCCESS,
  PRODUCT_GET_LIKE_REQUEST,
  PRODUCT_GET_LIKE_FAIL,
  PRODUCT_MY_REQUEST,
  PRODUCT_MY_SUCCESS,
  PRODUCT_MY_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_UPCOMING_FAIL,
  PRODUCT_UPCOMING_REQUEST,
  PRODUCT_UPCOMING_LIKE_SUCCESS,
  PRODUCT_UPCOMING_SUCCESS,
} from "../../constants/productconstants";

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: "Product Created  Successfully",
        product: action.payload,
      };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productListReducer = (
  state = { products: [], count: 0 },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.product,
        count: action.payload.count,
      };
    case PRODUCT_LIST_LIKE_SUCCESS:
      const product = [...state.products];
      const ff = product.filter((el) => {
        if (el._id === action.payload._id) {
          el.likes = [...action.payload.likes];
        }
        return el;
      });

      return {
        loading: false,
        products: ff,
        count: state.count,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { details: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, details: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_LIKE_REQUEST:
      return { loading: true };
    // case PRODUCT_CREATE_LIKE_SUCCESS:
    //   console.log("reducerrr", action.payload);
    //   return {
    //     loading: false,
    //     likes: action.payload,
    //   };
    case PRODUCT_CREATE_LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productGetLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_GET_LIKE_REQUEST:
      return { loading: true };
    case PRODUCT_GET_LIKE_SUCCESS:
      return {
        loading: false,
        likes: action.payload,
      };
    case PRODUCT_GET_LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: "Product Deleted SuccessFully" };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productCommentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_COMMENT_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_COMMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listmyproductsReducer = (
  state = { products: [], count: 0 },
  action
) => {
  switch (action.type) {
    case PRODUCT_MY_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_MY_SUCCESS:
      return {
        loading: false,
        products: action.payload.product,
        count: action.payload.count,
      };
    case PRODUCT_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const upcomingProductReducer = (
  state = { products: [], page: 1 },
  action
) => {
  switch (action.type) {
    case PRODUCT_UPCOMING_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_UPCOMING_SUCCESS:
      return {
        loading: false,
        products: action.payload.data,
        page: action.payload.page,
      };
    case PRODUCT_UPCOMING_LIKE_SUCCESS:
      const product = [...state.products];
      const ff = product.filter((el) => {
        if (el._id === action.payload._id) {
          el.likes = [...action.payload.likes];
        }
        return el;
      });

      return {
        loading: false,
        products: ff,
        page: state.page,
      };
    case PRODUCT_UPCOMING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
