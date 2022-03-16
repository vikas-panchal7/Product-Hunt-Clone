const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
app.use(cors());
app.get("/signup", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`backend listening on port ${port}!`));
