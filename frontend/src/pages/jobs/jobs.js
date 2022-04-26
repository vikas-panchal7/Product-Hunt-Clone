import * as React from "react";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useDispatch, useSelector } from "react-redux";

import { PostJob } from "../index";
import Header from "../../components/header";
import Job from "../../components/Job";
import Paginate from "../../components/pagination";
import { listJobs } from "../../redux/actions/jobsActions";
import Filters from "../../components/filter";

export const Jobs = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const jobslist = useSelector((state) => state.jobList);
  const { loading, jobs, error, count } = jobslist;
  const jobCreate = useSelector((state) => state.jobCreate);
  const [sort, setsort] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [skip, setSkip] = React.useState(0);
  const [search, setSearch] = React.useState({ filter: [] });
  const [limit, setlimit] = React.useState(2);
  const [jobsarr, setjobarr] = React.useState([]);

  React.useEffect(() => {
    dispatch(listJobs({ limit, skip, sort, search }));
  }, [dispatch, jobCreate, limit, skip, sort, search]);

  React.useEffect(() => {
    setjobarr(jobs);
  }, [jobslist]);

  const handleChange = (event) => {
    setSkip(0);
    setPage(1);
    setlimit(4);
    setsort(event.target.value);
  };

  return (
    <div>
      <Header />
      <div style={{ marginTop: 80 }}>
        <Grid>
          <Grid container spacing={2}>
            <Grid item xs={7} borderRadius={"10px"} bgcolor='#fcfaf2'>
              <Box
                sx={{ minWidth: 80 }}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <Divider textAlign='right'>
                  <p>
                    <b>Your Dream Job Could be here 👇</b>
                  </p>
                </Divider>

                <FormControl variant='standard' size='small'>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={sort}
                    defaultValue={sort}
                    onChange={handleChange}
                    disableUnderline
                  >
                    <MenuItem value={1}>Featured</MenuItem>
                    <MenuItem value={-1}>Newest</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {loading && <CircularProgress />}
              {jobsarr?.map((jobs, index) => (
                <Job
                  key={jobs._id + index}
                  title={jobs.jobtitle}
                  tagline={jobs.companytagline}
                  company={jobs.companyname}
                  logo={jobs.logo}
                  link={jobs.joblink}
                />
              ))}
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
            </Grid>

            <Grid item xs={5}>
              <Box
                sx={{ minWidth: 80 }}
                display={"flex"}
                flexDirection={"row"}
                justifyContent='right'
              >
                {userInfo && <PostJob />}
              </Box>
              <Divider textAlign='center'>
                <b>Job Filters</b>
              </Divider>
              <Filters
                onGetData={(val) => {
                  setPage(1);
                  setlimit(2);
                  setSkip(0);
                  setSearch({ filters: val });
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
