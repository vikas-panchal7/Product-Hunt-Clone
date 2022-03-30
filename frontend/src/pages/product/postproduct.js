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
import { createProduct } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f7f6f2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));
const Postproduct = () => {
  const formData = new FormData();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [productdetail, setproductdetail] = React.useState({
    name: "",
    tagline: "",
    description: "",
    type: "",
    category: "",
    videourl: "",
    img1: "",
    img2: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setproductdetail({
      ...productdetail,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, tagline, description, type, category, videourl, img1, img2 } =
      productdetail;
    if (
      name === "" ||
      tagline === "" ||
      description === "" ||
      type === "" ||
      category === "" ||
      videourl === "" ||
      img1 === "" ||
      img2 === ""
    ) {
      console.log("Please provide all data");
    } else {
      formData.append("name", name);
      formData.append("tagline", tagline);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("category", category);
      formData.append("videourl", videourl);
      formData.append("img1", img1);
      formData.append("img2", img2);
      console.log("cs", productdetail);
      dispatch(createProduct(formData));
      console.log("fhdfv", formData);
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
        POST PRODUCT
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
        //fullWidth={true}
        //maxWidth={"md"}
        //fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title' align='center'>
          {"👋  Tell us More About Your Product"}
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
                    id='name'
                    label='Product Name'
                    name='name'
                    value={productdetail.name}
                    autoComplete='given-name'
                    placeholder='Name of a Product'
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    size='small'
                    color='warning'
                    id='tagline'
                    label='Tagline'
                    name='tagline'
                    value={productdetail.tagline}
                    autoComplete='given-name'
                    onChange={handleChange}
                    placeholder='Concise and Descriptive Tagline For a Product'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    size='small'
                    color='warning'
                    fullWidth
                    multiline
                    maxRows={3}
                    id='description'
                    label='Description'
                    name='description'
                    value={productdetail.description}
                    onChange={handleChange}
                    placeholder='Impressive Description For a Product'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size='small' color='warning'>
                    <InputLabel id='demo-simple-select-label'>
                      Select Product Type
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='producttype'
                      name='type'
                      label='Select Product Type'
                      onChange={handleChange}
                      value={productdetail.type ?? ""}
                    >
                      <MenuItem value={"Launched"}>Launched</MenuItem>
                      <MenuItem value={"Upcoming"}>Upcoming</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size='small' color='warning'>
                    <InputLabel id='demo-simple-select-lab'>
                      Select Product Category
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-lab'
                      id='productcategory'
                      name='category'
                      label='Select Product Category'
                      onChange={handleChange}
                      value={productdetail.category ?? ""}
                    >
                      <MenuItem value='Tech'>Tech</MenuItem>
                      <MenuItem value='Productivity'>Productivity</MenuItem>
                      <MenuItem value='Marketing'>Marketing</MenuItem>
                      <MenuItem value='Education'>Education</MenuItem>
                      <MenuItem value='Entertainment'>Entertainment</MenuItem>
                      <MenuItem value='Gaming'>Finance</MenuItem>
                      <MenuItem value='Development'>Development</MenuItem>
                      <MenuItem value='Photography'>Photography</MenuItem>
                      <MenuItem value='Dating'>Dating</MenuItem>
                      <MenuItem value='Design'>Design</MenuItem>
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
                    id='videourl'
                    label='Url'
                    name='videourl'
                    value={productdetail.videourl}
                    onChange={handleChange}
                    placeholder='Provide Video Url For Product'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size='small' color='warning'>
                    <label>Select Img</label>
                    <input
                      onChange={handleChange}
                      color='primary'
                      accept='image/*'
                      type='file'
                      name='img1'
                      id='img1'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size='small' color='warning'>
                    <label>Select Img</label>
                    <input
                      onChange={handleChange}
                      color='primary'
                      accept='image/*'
                      type='file'
                      name='img2'
                      id='img2'
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

export default Postproduct;
