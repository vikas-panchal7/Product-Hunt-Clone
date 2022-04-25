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
//import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

//
import { useDispatch, useSelector } from "react-redux";

//
import Bar from "../../components/snackbar";
import { createJobs } from "../../redux/actions/jobsActions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f7f6f2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

export const PostJob = () => {
  const dispatch = useDispatch();
  const formData = new FormData();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const data = useSelector((state) => state.jobCreate);
  const { loading, success, job, error } = data;
  const [jobdetail, setjobdetail] = React.useState({
    companyname: "",
    companytagline: "",
    jobtitle: "",
    category: "",
    joblink: "",
  });
  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setjobdetail({
      ...jobdetail,
      [name]: value,
    });
  };

  const onSelectLogo = (event) => {
    formData.append("logo", event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { companyname, companytagline, jobtitle, category, joblink } =
      jobdetail;
    if (
      companyname === "" ||
      companytagline === "" ||
      jobtitle === "" ||
      category === "" ||
      joblink === ""
    ) {
      console.log("Please provide all data");
    } else {
      formData.append("companyname", companyname);
      formData.append("companytagline", companytagline);
      formData.append("jobtitle", jobtitle);
      formData.append("category", category);
      formData.append("joblink", joblink);
      dispatch(createJobs(formData));

      if (!error) {
        setjobdetail({
          companyname: "",
          companytagline: "",
          jobtitle: "",
          category: "",
          joblink: "",
        });
        setOpen(false);
      }
    }
  };
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        sx={{
          my: 2,
          color: "black",
          display: "block",
          alignSelf: "right",
        }}
      >
        POST JOB
      </Button>
      <Dialog
        sx={{
          backdropFilter: "blur(1px)",

          //other styles here
        }}
        PaperProps={{
          sx: {
            minHeight: "90%",
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
          {"👋  Tell us More About Your Job & Company"}
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
                    required
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
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    size='small'
                    color='warning'
                    fullWidth
                    id='jobtitle'
                    label='Job Title'
                    name='jobtitle'
                    value={jobdetail.jobtitle}
                    onChange={handleChange}
                    placeholder='Short & Sweet Job Title'
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
                    required
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <label>Company Logo* </label>
                    <TextField
                      onChange={onSelectLogo}
                      color='primary'
                      accept='image/*'
                      type='file'
                      name='logo'
                      id='logo'
                      size='small'
                      color='warning'
                      required
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
