import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_LIKE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_COMMENT_REQUEST,
  PRODUCT_CREATE_COMMENT_SUCCESS,
  PRODUCT_CREATE_COMMENT_FAIL,
  PRODUCT_CREATE_LIKE_REQUEST,
  PRODUCT_CREATE_LIKE_SUCCESS,
  PRODUCT_CREATE_LIKE_FAIL,
  PRODUCT_GET_LIKE_SUCCESS,
  PRODUCT_GET_LIKE_REQUEST,
  PRODUCT_GET_LIKE_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_MY_REQUEST,
  PRODUCT_MY_SUCCESS,
  PRODUCT_MY_FAIL,
  PRODUCT_UPCOMING_FAIL,
  PRODUCT_UPCOMING_REQUEST,
  PRODUCT_UPCOMING_SUCCESS,
  PRODUCT_UPCOMING_LIKE_SUCCESS,
} from "../../constants/productconstants";
import baseService from "../service/baseService";

export const listProducts = (props) => async (dispatch) => {
  const limit = props?.limit;
  const skip = props?.skip;
  const sort = props?.sort;
  const search = props?.search;
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await baseService.post(
      `/products?limit=${limit || 4}&skip=${skip || 0}&sort=${sort || 1}`
    );
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response.data.error
        ? error.response.data.error
        : error.response.data,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await baseService.post(`/products/details/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.error
        ? error.response.data.error
        : error.response.data,
    });
  }
};

export const createProductLike =
  ({ id, type }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_LIKE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await baseService.post(
        `/product/like/${id}`,
        {},
        config
      );
      if (type === "list") {
        dispatch({
          type: PRODUCT_LIST_LIKE_SUCCESS,
          payload: data.product,
        });
      }
      if (type === "upcoming") {
        dispatch({
          type: PRODUCT_UPCOMING_LIKE_SUCCESS,
          payload: data.product,
        });
      }
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_LIKE_FAIL,
        payload: error.response.data
          ? error.response.data.error
          : error.response.data,
      });
    }
  };

export const getProductLike = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_GET_LIKE_REQUEST,
    });
    const { data } = await baseService.post(`/product/getlike/${id}`);
    dispatch({
      type: PRODUCT_GET_LIKE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_GET_LIKE_FAIL,
      payload: error.response.data.error
        ? error.response.data.error
        : error.response.data,
    });
  }
};

export const createProduct = (formdata) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await baseService.post(
      `/product/create`,
      formdata,
      config
    );

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response.data.error
        ? error.response.data.error
        : error.response.data,
    });
  }
};
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await baseService.delete(`/product/delete/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response.data.error
        ? error.response.data.error
        : error.response.data,
    });
  }
};

export const updateProduct =
  ({ formData, id }) =>
  async (dispatch, getState) => {
    try {
      console.log(id);
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await baseService.put(
        `/products/update/${id}`,
        formData,
        config
      );

      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: error.response.data.error
          ? error.response.data.error
          : error.response.data,
      });
    }
  };

export const createProductComment =
  ({ id, comment, commentid }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_COMMENT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await baseService.post(
        `/product/comment/${id}`,
        { comment, commentid },
        config
      );
      dispatch({
        type: PRODUCT_CREATE_COMMENT_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: PRODUCT_CREATE_COMMENT_FAIL,
        payload: error.response.data
          ? error.response.data.error
          : error.response.data,
      });
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await baseService.get(`/api/products/top`);

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload: error.response.data.error
        ? error.response.data.error
        : error.response.data,
    });
  }
};

export const listmyProducts = (props) => async (dispatch, getState) => {
  const limit = props?.limit;
  const skip = props?.skip;
  const sort = props?.sort;
  try {
    dispatch({ type: PRODUCT_MY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await baseService.get(
      `/products/myproducts?limit=${limit || 4}&skip=${skip || 0}&sort=${
        sort || 1
      }`,
      config
    );

    dispatch({
      type: PRODUCT_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_MY_FAIL,
      payload: error.response.data.error
        ? error.response.data.error
        : error.response.data,
    });
  }
};

export const upcomingProducts = (props) => async (dispatch) => {
  const limit = props?.limit;
  const skip = props?.skip;
  const sort = props?.sort;
  const page = props?.pages;
  try {
    dispatch({ type: PRODUCT_UPCOMING_REQUEST });

    const { data } = await baseService.post(
      `/products/upcomings?limit=${limit || 5}&skip=${skip || 0}&sort=${
        sort || 1
      }`
    );

    dispatch({
      type: PRODUCT_UPCOMING_SUCCESS,
      payload: { data, page },
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPCOMING_FAIL,
      payload: error.response.data.error
        ? error.response.data.error
        : error.response.data,
    });
  }
};
