const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const userRouter = require("./routes/user");

const port = 4000 || process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter);

app.listen(port, () => console.log(`backend listening on port ${port}!`));
