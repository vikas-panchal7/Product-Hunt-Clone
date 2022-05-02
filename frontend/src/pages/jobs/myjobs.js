import React from "react";
import { BasicTable } from "../../components/basictable";
import Header from "../../components/header";
import Job from "../../components/Job";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paginate from "../../components/pagination";
import { PostJob } from "../index";
import { listmyJobs } from "../../redux/actions/jobsActions";

export const MyJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const jobslist = useSelector((state) => state.myjobsList);
  const { loading, jobs, error, count } = jobslist;
  const [sort, setsort] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [skip, setSkip] = React.useState(0);
  const [limit, setlimit] = React.useState(5);

  const { userInfo } = userLogin;
  React.useEffect(() => {
    if (!userInfo) {
      navigate("/loggin");
    }
  }, [userInfo]);

  React.useEffect(() => {
    dispatch(listmyJobs({ limit, skip, sort }));
  }, [dispatch, limit, skip, sort]);
  const header = [
    "Name",
    "Tagline",
    "Title",
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
      <div align='right'>
        <PostJob />
      </div>
      <BasicTable tableheader={header} tablerows={rows} data={jobs} />
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
