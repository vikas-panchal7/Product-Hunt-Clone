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
  const limit = 4;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const jobslist = useSelector((state) => state.jobList);
  const { loading, jobs, error } = jobslist;
  const jobCreate = useSelector((state) => state.jobCreate);

  const [jobsarr, setjobarr] = React.useState([]);
  React.useEffect(() => {
    dispatch(listJobs({ limit }));
  }, [dispatch, jobCreate]);

  React.useEffect(() => {
    setjobarr(jobs);
  }, [jobslist]);

  const [sort, setsort] = React.useState(-1);

  const handleChange = (event) => {
    setsort(event.target.value);
    dispatch(listJobs({ sort }));
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
                    <MenuItem value={-1}>Featured</MenuItem>
                    <MenuItem value={1}>Newest</MenuItem>
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
              <Paginate limit={limit} type={"JOBLIST"} getJobData={()=>{
                console.log("job")
              }}/>
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
              <Divider textAlign='left'>
                <b>Job Filters</b>
              </Divider>
              <Filters
                onGetData={(val) => {
                  console.log(val);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
