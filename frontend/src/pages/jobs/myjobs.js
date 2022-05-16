import React from "react";
import { BasicTable } from "../../components/basictable";
import Header from "../../components/header";
import Job from "../../components/Job";
import Paginate from "../../components/pagination";
import { PostJob } from "../index";
import Bar from "../../components/snackbar";
import {
  JOBS_CREATE_RESET,
  JOBS_UPDATE_RESET,
  JOBS_DELETE_RESET,
} from "../../constants/jobsconstants";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listmyJobs } from "../../redux/actions/jobsActions";

export const MyJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const jobslist = useSelector((state) => state.myjobsList);
  const { loading, jobs, error, count } = jobslist;
  const update = useSelector((state) => state.jobUpdate);
  const { success: jobupdatesuccess, error: jobupdateerr } = update;
  const create = useSelector((state) => state.jobCreate);
  const { success: jobcreatesuccess, error: jobCreateerr } = create;
  const jobdelete = useSelector((state) => state.jobDelete);
  const { success: jobdeletesuccess, error: jobdeleteerr } = jobdelete;

  const [sort, setsort] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [skip, setSkip] = React.useState(0);
  const [limit, setlimit] = React.useState(3);

  const { userInfo } = userLogin;
  React.useEffect(() => {
    dispatch({ type: JOBS_CREATE_RESET });
    dispatch({ type: JOBS_UPDATE_RESET });
    dispatch({ type: JOBS_DELETE_RESET });
    if (!userInfo) {
      navigate("/loggin");
    }
  }, [userInfo]);

  React.useEffect(() => {
    dispatch(listmyJobs({ limit, skip, sort }));
  }, [dispatch, limit, skip, sort, update, create, jobdelete]);
  const header = [
    "Company Name",
    "Tagline",
    "Job Title",
    "Job Category",
    "Apply Link",
    "View",
    "Edit",
    "Delete",
  ];
  const rows = ["name", "tagline", "title", "category", "link"];

  return (
    <div style={{ marginTop: 80 }}>
      <Header />

      {error && (
        <Bar
          message={error}
          severity='error'
          vertical='top'
          horizontal='right'
        />
      )}
      {jobCreateerr && <Bar message={jobCreateerr} severity='warning' />}
      {jobdeleteerr && <Bar message={jobdeleteerr} severity='warning' />}
      {jobupdateerr && <Bar message={jobupdateerr} severity='warning' />}
      {jobdeletesuccess && (
        <Bar message={"Job Deleted  Successfully "} severity='info' />
      )}
      {jobcreatesuccess && (
        <Bar message={"Job Created  Successfully "} severity='success' />
      )}
      {jobupdatesuccess && (
        <Bar message={"Job Updated  Successfully "} severity='info' />
      )}
      <div align='right'>
        <PostJob />
      </div>

      <BasicTable
        tableheader={header}
        tablerows={rows}
        data={jobs}
        type={"jobs"}
      />
      <Paginate
        limit={limit}
        count={count}
        page={page}
        getPage={(p) => {
          setPage(p.value);
          setlimit(p.limit);
          setSkip(p.skip);
        }}
      />
    </div>
  );
};
