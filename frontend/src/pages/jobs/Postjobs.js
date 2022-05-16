import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import {
  JOBS_CREATE_RESET,
  JOBS_UPDATE_RESET,
} from "../../constants/jobsconstants";
//

import Bar from "../../components/snackbar";
import { useDispatch, useSelector } from "react-redux";
import { createJobs, updateJob } from "../../redux/actions/jobsActions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f7f6f2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

export const PostJob = (props) => {
  console.log("edit jobs", props);
  const dispatch = useDispatch();
  const formData = new FormData();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const data = useSelector((state) => state.jobCreate);
  const { loading, success, job, error } = data;
  const update = useSelector((state) => state.jobUpdate);
  const { success: jobupdatesuccess, error: jobupdateerr } = update;

  const [namevalid, setnamevalid] = React.useState(true);
  const [taglinevalid, settaglinevalid] = React.useState(true);
  const [titlevalid, settitlevalid] = React.useState(true);
  const [categoryvalid, setcategoryvalid] = React.useState(true);
  const [linkvalid, setlinkvalid] = React.useState(true);
  const [imgvalid, setimgvalid] = React.useState(true);
  const [img, setimg] = React.useState("");
  const [logo, setlogo] = React.useState({});
  const [status, setstatus] = React.useState(false);
  const [jobdetail, setjobdetail] = React.useState({
    companyname: props.data?.companyname || "",
    companytagline: props.data?.companytagline || "",
    jobtitle: props.data?.jobtitle || "",
    category: props.data?.category || "",
    joblink: props.data?.joblink || "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: JOBS_CREATE_RESET });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setjobdetail({
      ...jobdetail,
      [name]: value,
    });
  };

  const onSelectLogo = (event) => {
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setimg(objectUrl);
    setimgvalid(true);
    setstatus(true);
    setlogo(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);

    const { companyname, companytagline, jobtitle, category, joblink } =
      jobdetail;
    if (
      companyname === "" ||
      companytagline === "" ||
      jobtitle === "" ||
      category === "" ||
      joblink === "" ||
      !imgvalid
    ) {
      if (companyname === "") return setnamevalid(false);
      if (companytagline === "") return settaglinevalid(false);
      if (jobtitle === "") return settitlevalid(false);
      if (category === "") return setcategoryvalid(false);
      if (joblink === "") return setlinkvalid(false);
    } else {
      formData.append("companyname", companyname);
      formData.append("companytagline", companytagline);
      formData.append("jobtitle", jobtitle);
      formData.append("category", category);
      formData.append("joblink", joblink);
      if (status) {
        formData.append("logo", logo);
      }
      !props.type && dispatch(createJobs(formData));
      props.type && dispatch(updateJob({ formData, id: props.data?._id }));
      !error &&
        setjobdetail({
          companyname: "",
          companytagline: "",
          jobtitle: "",
          category: "",
          joblink: "",
        });
    }
  };
  return (
    <div>
      <Button
        variant='outlined'
        color='warning'
        size='small'
        onClick={handleClickOpen}
        sx={{
          my: 2,
          color: "black",
          display: "block",
          alignSelf: "right",
        }}
      >
        {props.name || "POST JOB"}
      </Button>
      <Dialog
        sx={{
          backdropFilter: "blur(1px)",

          //other styles here
        }}
        PaperProps={{
          sx: {
            minHeight: "200",
            maxHeight: "90%",
            minWidth: "45%",
            maxWidth: "50%",
            backgroundColor: "#F0F0F0",
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title' align='center'>
          {props.type
            ? " 👋 Update Your Job"
            : " 👋  Tell us More About Your Job & Company"}
          {error && <Bar message={error} severity='warning' />}

          <Button onClick={handleClose}>
            <CloseIcon align='left'></CloseIcon>
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size='small'
                    color='warning'
                    id='companyname'
                    label='Company Name'
                    name='companyname'
                    value={jobdetail.companyname}
                    inputProps={{
                      maxLength: 70,
                    }}
                    autoComplete='given-name'
                    placeholder='Name of a Company*'
                    onChange={handleChange}
                    autoFocus
                    onBlur={(event) => {
                      event.currentTarget.value.trim() !== "" &&
                        setnamevalid(true);
                    }}
                    error={!namevalid}
                    helperText={
                      !namevalid && "Please Provide Name of a Company"
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    size='small'
                    color='warning'
                    id='companytagline'
                    label='Company Tagline'
                    name='companytagline'
                    value={jobdetail.companytagline}
                    inputProps={{
                      maxLength: 150,
                    }}
                    autoComplete='given-name'
                    onChange={handleChange}
                    placeholder='Concise and Descriptive Tagline For a Company'
                    onBlur={(event) => {
                      event.currentTarget.value.trim() !== "" &&
                        settaglinevalid(true);
                    }}
                    error={!taglinevalid}
                    helperText={!taglinevalid && "Please Provide Tagline"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size='small'
                    color='warning'
                    fullWidth
                    id='jobtitle'
                    label='Job Title'
                    name='jobtitle'
                    value={jobdetail.jobtitle}
                    onChange={handleChange}
                    placeholder='Short & Sweet Job Title'
                    onBlur={(event) => {
                      event.currentTarget.value.trim() !== "" &&
                        settitlevalid(true);
                    }}
                    error={!titlevalid}
                    helperText={!titlevalid && "Please Provide Job Title"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth size='small' color='warning'>
                    <InputLabel id='demo-simple-select-lab'>
                      Select Job Category*
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-lab'
                      id='category'
                      name='category'
                      label='Select Job Category'
                      onChange={handleChange}
                      value={jobdetail.category ?? ""}
                      onBlur={(event) => {
                        event.currentTarget.value !== "" &&
                          setcategoryvalid(true);
                      }}
                      error={!categoryvalid}
                      helperText={!categoryvalid && "Please Provide Tagline"}
                    >
                      <MenuItem value='Tech'>Tech</MenuItem>
                      <MenuItem value='Productivity'>Productivity</MenuItem>
                      <MenuItem value='Marketing'>Marketing</MenuItem>
                      <MenuItem value='Education'>Education</MenuItem>
                      <MenuItem value='Entertainment'>Entertainment</MenuItem>
                      <MenuItem value='Gaming'>Finance</MenuItem>
                      <MenuItem value='Development'>Development</MenuItem>
                      <MenuItem value='Photography'>Photography</MenuItem>
                      <MenuItem value='Design'>Design</MenuItem>
                      <MenuItem value='Design'>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size='small'
                    color='warning'
                    fullWidth
                    multiline
                    maxRows={2}
                    id='joblink'
                    label='Job Apply Link'
                    name='joblink'
                    value={jobdetail.joblink}
                    onChange={handleChange}
                    placeholder='Provide Link Apply For Job'
                    onBlur={(event) => {
                      event.currentTarget.value.trim() !== "" &&
                        setlinkvalid(true);
                    }}
                    error={!linkvalid}
                    helperText={!linkvalid && "Please Provide Link"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <label>Company Logo* </label>
                    {props.data && !img && (
                      <img
                        style={{
                          height: "60px",
                          width: "100px",
                        }}
                        src={`http://192.168.200.122:5000/${props.data?.logo} `}
                        alt='img'
                      />
                    )}
                    {img && (
                      <img
                        style={{
                          height: "60px",
                          width: "100px",
                        }}
                        src={`${img}`}
                        alt='img'
                      />
                    )}

                    <TextField
                      onChange={onSelectLogo}
                      color='primary'
                      inputProps={{ accept: "image/*" }}
                      type='file'
                      name='logo'
                      id='logo'
                      size='small'
                      color='warning'
                      error={!imgvalid}
                      helperText={
                        !imgvalid && "Please Provide Only Image Files"
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                POST
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
