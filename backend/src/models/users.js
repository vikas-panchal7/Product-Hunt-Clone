const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is Invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, "Enter Min 8 character passowrd"],
    },
  },
  {
    timestamps: true,
  }
);
//for hiding some details

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.lastName;
  delete userObject.createdAt;
  delete userObject.updatedAt;

  return userObject;
};

// for generating auth token
userSchema.methods.generateAuthtoken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "nodejs");
  return token;
};

// for login credentails check
userSchema.statics.findByCredentails = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Incorrect Email or Password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect Email or Password");
  }
  return user;
};

// hashing password before save to database
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
