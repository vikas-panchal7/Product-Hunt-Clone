import {
  JOBS_CREATE_REQUEST,
  JOBS_CREATE_SUCCESS,
  JOBS_CREATE_FAIL,
  JOBS_CREATE_RESET,
  JOBS_LIST_FAIL,
  JOBS_LIST_REQUEST,
  JOBS_LIST_SUCCESS,
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
        jobs: action.payload,
        count: action.payload.count,
      };
    case JOBS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
