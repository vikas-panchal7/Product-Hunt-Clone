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
  JOBS_UPDATE_REQUEST,
  JOBS_UPDATE_RESET,
  JOBS_UPDATE_SUCCESS,
  JOBS_UPDATE_FAIL,
  JOBS_DELETE_FAIL,
  JOBS_DELETE_REQUEST,
  JOBS_DELETE_SUCCESS,
  JOBS_DELETE_RESET,
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

export const updateJob =
  ({ formData, id }) =>
  async (dispatch, getState) => {
    try {
      console.log(id);
      dispatch({
        type: JOBS_UPDATE_REQUEST,
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
        `/jobs/update/${id}`,
        formData,
        config
      );

      dispatch({
        type: JOBS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: JOBS_UPDATE_FAIL,
        payload: error.response.data.error
          ? error.response.data.error
          : error.response.data,
      });
    }
  };

export const deleteJob = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOBS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await baseService.delete(`/job/delete/${id}`, config);

    dispatch({
      type: JOBS_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: JOBS_DELETE_FAIL,
      payload: error.response.data.error
        ? error.response.data.error
        : error.response.data,
    });
  }
};
