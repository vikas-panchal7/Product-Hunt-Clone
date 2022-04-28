import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { Avatar } from "@mui/material";
import { borderLeft, Box } from "@mui/system";
import { Button } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createProductComment } from "../redux/actions/productActions";
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export const Comments = (props) => {
  let ns = [];
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [commentvalid, setcommentvalid] = React.useState(true);
  const [comment, setcomment] = React.useState("");
  const textInput = React.useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [commentlist, setcommentlist] = React.useState([]);

  React.useEffect(() => {
    setcommentlist(props.comments);
  }, [props]);

  const handleClick = (event) => {
    const comment = document.getElementById(event.currentTarget.value).value;
    const commentid = event.currentTarget.value;
    if (comment === "") {
      document.getElementById(event.currentTarget.value).placeholder =
        "Please Enter Valid comment!";
    } else {
      dispatch(createProductComment({ id: props.id, comment, commentid }));
      document.getElementById(event.currentTarget.value).value = "";
    }
  };
  const handleComment = (event) => {
    event.preventDefault();
    if (!userInfo) {
      navigate("/loggin");
    }
    if (comment !== "" && userInfo) {
      dispatch(createProductComment({ id: props.id, comment }));
      setcomment("");
    } else {
      setcommentvalid(false);
    }
  };

  return (
    <div style={{ padding: 14 }} className='App'>
      <h1>Comments</h1>
      <Box
        component='form'
        onSubmit={handleComment}
        sx={{
          display: "flex",
          flexDirection: "row",
          border: "1px solid grey",
          padding: "10px",
        }}
      >
        <TextField
          fullWidth
          color='warning'
          size='small'
          defaultValue=''
          value={comment}
          placeholder='What Do Yo Think About This Product'
          InputProps={{ style: { fontSize: 13 } }}
          error={!commentvalid}
          helperText={!commentvalid && "Please Provide Valid Comment"}
          onChange={(event) => {
            event.currentTarget.value.trim() !== "" && setcommentvalid(true);
            setcomment(event.currentTarget.value);
          }}
        />
        &nbsp;&nbsp;
        <Button variant='outlined' size='small' type='submit' color='warning'>
          Send
        </Button>
      </Box>
      <Paper style={{ padding: "40px 20px" }}>
        {commentlist?.map((item) => (
          <Grid
            key={item._id}
            container
            wrap='nowrap'
            spacing={2}
            sx={{ flexDirection: "column", borderLeft: "1px solid grey" }}
          >
            <Grid item>
              <Avatar
                alt={item?.name}
                src={`http://192.168.200.122:5000/${
                  item?.user.avtar || "uploads/avt1650979607692A861.png"
                } `}
                style={{
                  border: "2px solid  #DC5425",
                  alignSelf: "center",
                }}
              />
            </Grid>
            <Grid justifyContent='left' item xs zeroMinWidth>
              <h6 style={{ margin: 0, textAlign: "left" }}>
                {item?.user.firstName} &nbsp;{item?.user.lastName}
              </h6>
              <p style={{ margin: 5, textAlign: "left" }}>{item?.comment}</p>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "10px",
                }}
              >
                <TextField
                  color='warning'
                  ref={textInput}
                  id={item?._id}
                  size='small'
                  defaultValue=''
                  placeholder='Reply'
                  InputProps={{ style: { fontSize: 12 } }}
                />
                &nbsp;&nbsp;
                <Button
                  value={item?._id}
                  variant='text'
                  size='small'
                  type='submit'
                  color='warning'
                  onClick={handleClick}
                >
                  Reply
                </Button>
              </Box>
              {item?.reply?.map((rep) => (
                <Grid
                  justifyContent='left'
                  item
                  xs
                  zeroMinWidth
                  sx={{
                    paddingLeft: 5,
                    borderLeft: "1px solid #DC5425",
                  }}
                >
                  <Grid item>
                    <Avatar
                      alt={rep?.name}
                      src={`http://192.168.200.122:5000/${
                        rep?.user.avtar || "uploads/avt1650979607692A861.png"
                      } `}
                      style={{
                        border: "2px solid  #DC5425",
                        alignSelf: "center",
                      }}
                    />
                  </Grid>
                  <h6 style={{ margin: 0, textAlign: "left" }}>
                    {rep?.user.firstName}&nbsp;{rep?.user.lastName}
                  </h6>
                  <p style={{ textAlign: "left" }}>{rep?.comment}</p>
                </Grid>
              ))}
            </Grid>

            <Divider />
          </Grid>
        ))}
      </Paper>
    </div>
  );
};
