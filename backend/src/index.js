const express = require("express");
const cors = require("cors");
const path = require("path");
require("./db/mongoose");

const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const jobRouter = require("./routes/job");

const port = process.env.PORT || 3000;
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(productRouter);
app.use(jobRouter);
app.get('/',(req,res)=>{
    res.send("welcome to backend");
})

app.listen(port, () => console.log(`backend listening on port http://localhost:${port}`));
