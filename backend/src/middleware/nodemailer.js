const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const SendEmail = (email, id) => {
  const token = jwt.sign({ _id: id.toString() }, process.env.TOKEN);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Pass,
    },
  });

  var mailOptiosans = {
    from: process.env.Email,
    to: email,
    subject: "Password Reset @ProductHunt",
    html: `
      <div align="center" width="150" style="background-color:orange;">
      <p >Someone (hopefully you) has requested a password reset for your ProductHunt account. Follow the link below to set a new password:</p>
      <br>
      <a href="http://localhost:3000/change/${token}">http://localhost:3000/change/${token}</a>
      <br>
      <p>If you don't wish to reset your password, disregard this email and no action will be taken.</p>
      </div>`,
  };
  transporter.sendMail(mailOptiosans, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: + info.response");
    }
  });
};

module.exports = SendEmail;
