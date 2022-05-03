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

export const jobsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case JOBS_CREATE_REQUEST:
      return { loading: true };
    case JOBS_CREATE_SUCCESS:
      return { loading: false, success: true, job: action.payload };
    case JOBS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case JOBS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const jobsListReducer = (state = { jobs: [], count: 0 }, action) => {
  switch (action.type) {
    case JOBS_LIST_REQUEST:
      return { loading: true, jobs: [] };
    case JOBS_LIST_SUCCESS:
      return {
        loading: false,
        jobs: action.payload.jobs,
        count: action.payload.count,
      };
    case JOBS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listmyjobsReducer = (state = { jobs: [], count: 0 }, action) => {
  switch (action.type) {
    case JOB_MY_REQUEST:
      return { loading: true, jobs: [] };
    case JOB_MY_SUCCESS:
      return {
        loading: false,
        jobs: action.payload.jobs,
        count: action.payload.count,
      };
    case JOB_MY_FAIL:
      console.log("action", action.payload);
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const jobUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case JOBS_UPDATE_REQUEST:
      return { loading: true };
    case JOBS_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case JOBS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case JOBS_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const jobDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case JOBS_DELETE_REQUEST:
      return { loading: true };
    case JOBS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case JOBS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case JOBS_DELETE_RESET:
      return {};

    default:
      return state;
  }
};
