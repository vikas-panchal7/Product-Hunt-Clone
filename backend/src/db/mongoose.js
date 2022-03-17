const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/producthunt";
mongoose.connect(
  "mongodb+srv://vikaspanchal:12345@cluster0.jjtmp.mongodb.net/ProductHuntMaster?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
