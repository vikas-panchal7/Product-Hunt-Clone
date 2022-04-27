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
import { createProduct } from "../../redux/actions/productActions";
import Bar from "../../components/snackbar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f7f6f2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

export const Postproduct = () => {
  const dispatch = useDispatch();
  const formData = new FormData();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const data = useSelector((state) => state.productCreate);
  const { loading, success, product, error } = data;

  const [namevalid, setnamevalid] = React.useState(true);
  const [taglinevalid, settaglinevalid] = React.useState(true);
  const [descriptionvalid, setdescriptionvalid] = React.useState(true);
  const [typevalid, settypevalid] = React.useState(true);
  const [categoryvalid, setcategoryvalid] = React.useState(true);
  const [videourlvalid, setvideourlvalid] = React.useState(true);
  const [img1valid, setimg1valid] = React.useState(true);
  const [imgvalid, setimgvalid] = React.useState(true);

  const [productdetail, setproductdetail] = React.useState({
    name: "",
    tagline: "",
    description: "",
    type: "",
    category: "",
    videourl: "",
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
    setproductdetail({
      ...productdetail,
      [name]: value,
    });
  };

  const onSelectImage = (event) => {
    if (event.target.files[0].type.match(/\/(jpe?g|png|gif|bmp)$/i)) {
      setimg1valid(true);
      formData.append("img1", event.target.files[0]);
    } else {
      setimg1valid(false);
    }
  };
  const onSelectGif = (event) => {
    if (event.target.files[0].type.match(/\/(jpe?g|png|gif|bmp)$/i)) {
      setimgvalid(true);
      formData.append("img", event.target.files[0]);
    } else {
      setimgvalid(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, tagline, description, type, category, videourl } =
      productdetail;
    if (
      name === "" ||
      tagline === "" ||
      description === "" ||
      type === "" ||
      category === "" ||
      videourl === "" ||
      !imgvalid ||
      !img1valid
    ) {
      if (name === "") return setnamevalid(false);
      if (tagline === "") return settaglinevalid(false);
      if (description === "") return setdescriptionvalid(false);
      if (type === "") return settypevalid(false);
      if (category === "") return setcategoryvalid(false);
      if (videourl === "") return setvideourlvalid(false);
    } else {
      formData.append("name", name);
      formData.append("tagline", tagline);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("category", category);
      formData.append("videourl", videourl);
      dispatch(createProduct(formData));
      if (!error) {
        setproductdetail({
          name: "",
          tagline: "",
          description: "",
          type: "",
          category: "",
          videourl: "",
        });
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
          {error && <Bar message={error} severity='warning' />}
          {success && (
            <Bar
              message={"Product Created  Successfully "}
              severity='success'
            />
          )}
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
                    id='name'
                    label='Product Name'
                    name='name'
                    value={productdetail.name}
                    inputProps={{
                      maxLength: 70,
                    }}
                    autoComplete='given-name'
                    placeholder='Name of a Product'
                    onChange={handleChange}
                    autoFocus
                    onBlur={(event) => {
                      event.currentTarget.value.trim() !== "" &&
                        setnamevalid(true);
                    }}
                    error={!namevalid}
                    helperText={!namevalid && "Please Provide ProductName"}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size='small'
                    color='warning'
                    id='tagline'
                    label='Tagline'
                    name='tagline'
                    value={productdetail.tagline}
                    inputProps={{
                      maxLength: 100,
                    }}
                    autoComplete='given-name'
                    onChange={handleChange}
                    placeholder='Concise and Descriptive Tagline For a Product'
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
                    multiline
                    maxRows={3}
                    inputProps={{
                      maxLength: 300,
                    }}
                    id='description'
                    label='Description'
                    name='description'
                    value={productdetail.description}
                    onChange={handleChange}
                    placeholder='Impressive Description For a Product'
                    onBlur={(event) => {
                      event.currentTarget.value.trim() !== "" &&
                        setdescriptionvalid(true);
                    }}
                    error={!descriptionvalid}
                    helperText={
                      !descriptionvalid && "Please Provide Description"
                    }
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
                      onBlur={(event) => {
                        event.currentTarget.value !== "" && settypevalid(true);
                      }}
                      error={!typevalid}
                      helperText={!typevalid && "Please Select Product Type"}
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
                      onBlur={(event) => {
                        event.currentTarget.value !== "" &&
                          setcategoryvalid(true);
                      }}
                      error={!categoryvalid}
                      helperText={
                        !categoryvalid && "Please Select Product Category"
                      }
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
                    size='small'
                    color='warning'
                    fullWidth
                    multiline
                    maxRows={2}
                    id='videourl'
                    label='URL'
                    name='videourl'
                    value={productdetail.videourl}
                    onChange={handleChange}
                    placeholder='Provide Video Url For Product'
                    onBlur={(event) => {
                      event.currentTarget.value.trim() !== "" &&
                        setvideourlvalid(true);
                    }}
                    error={!videourlvalid}
                    helperText={
                      !videourlvalid && "Please Provide Video Url For Product"
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <label>Product Gif/Img</label>
                    <TextField
                      required
                      /* inputProps={{ accept: "image/*" }} */
                      onChange={onSelectGif}
                      color='primary'
                      type='file'
                      name='img'
                      id='img'
                      size='small'
                      color='warning'
                      error={!imgvalid}
                      helperText={
                        !imgvalid && "Please Provide Only Image Files"
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <label>Products Img</label>
                    <TextField
                      required
                      onChange={onSelectImage}
                      color='primary'
                      accept='image/png, image/jpeg'
                      type='file'
                      name='img1'
                      id='img1'
                      size='small'
                      color='warning'
                      error={!img1valid}
                      helperText={
                        !img1valid && "Please Provide Only Image Files"
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
