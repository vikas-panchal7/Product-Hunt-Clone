import {
  JOBS_CREATE_REQUEST,
  JOBS_CREATE_SUCCESS,
  JOBS_CREATE_FAIL,
  JOBS_CREATE_RESET,
  JOBS_LIST_FAIL,
  JOBS_LIST_REQUEST,
  JOBS_LIST_SUCCESS,
  JOB_MY_FAIL,
  JOB_MY_REQUEST,
  JOB_MY_SUCCESS,
} from "../../constants/jobsconstants";
import baseService from "../../redux/service/baseService";

export const listJobs = (props) => async (dispatch) => {
  const limit = props?.limit;
  const skip = props?.skip;
  const sort = props?.sort;
  const search = props?.search?.filters;

  try {
    dispatch({ type: JOBS_LIST_REQUEST });
    // const { data } = await baseService.get(`/jobs`);
    const { data } = await baseService.post(
      `/jobs?limit=${limit || 4}&skip=${skip || 0}&sort=${sort || 1}`,
      search
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
export const listmyJobs = (props) => async (dispatch, getState) => {
  const limit = props?.limit;
  const skip = props?.skip;
  const sort = props?.sort;
  try {
    dispatch({ type: JOB_MY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await baseService.get(
      `/jobs/myjobs?limit=${limit || 4}&skip=${skip || 0}&sort=${sort || 1}`,
      config
    );

    dispatch({
      type: JOB_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_MY_FAIL,
      payload: error.response.data.error
        ? error.response.data.error
        : error.response.data,
    });
  }
};

export const createJobs = (formdata) => async (dispatch, getState) => {
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
