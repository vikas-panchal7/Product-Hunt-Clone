import {
  JOBS_CREATE_REQUEST,
  JOBS_CREATE_SUCCESS,
  JOBS_CREATE_FAIL,
  JOBS_CREATE_RESET,
  JOBS_LIST_FAIL,
  JOBS_LIST_REQUEST,
  JOBS_LIST_SUCCESS,
} from "../../constants/jobsconstants";

export const listJobs = (props) => async (dispatch) => {
  const limit = props?.limit;
  const skip = props?.skip;
  const sort = props?.sort;
  const search = props?.search;
  try {
    dispatch({ type: JOBS_LIST_REQUEST });
    const { data } = await baseService.post(
      `/jobs?limit=${limit || 4}&skip=${skip || 0}&sort=${sort || 1}`
    );
    dispatch({
      type: JOBS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOBS_LIST_FAIL,
      payload: error.response.data.error
        ? error.response.data.error
        : error.response.data,
    });
  }
};

export const createProduct = (formdata) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOBS_CREATE_REQUEST,
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
    const { data } = await baseService.post(`/jobs/create`, formdata, config);

    dispatch({
      type: JOBS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOBS_CREATE_FAIL,
      payload: error.response.data.error
        ? error.response.data.error
        : error.response.data,
    });
  }
};
