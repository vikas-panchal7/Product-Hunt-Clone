const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");

sgMail.setApiKey(
  "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"
);

const sendEmail = (email, id) => {
  const token = jwt.sign({ _id: id.toString() }, "nodejs");

  sgMail
    .send({
      to: email,
      bcc: "loverboy9724@gmail.com",
      from: "panchalvikas292000@gmail.com",
      subject: "Password Reset @ProductHunt",
      html: `
      <div align="center" width="200">
      <p>Someone (hopefully you) has requested a password reset for your ProductHunt account. Follow the link below to set a new password:</p>
      <br>
      <a href="http://localhost:3000/change/${token}">http://localhost:3000/change/${token}</a>
      <br>
      <p>If you don't wish to reset your password, disregard this email and no action will be taken.</p>
      <p style="color:red">* Link is Valid For 5 Minitues* <p>
      </div>,`,
    })
    .then(
      () => {
        console.log("Email send Successfully");
      },
      (error) => {
        console.error(error);

        if (error.response) {
          console.log("in response error");
          console.error(error.response.body);
        }
      }
    );
};

module.exports = sendEmail;
