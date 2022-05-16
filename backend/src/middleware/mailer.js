const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");

sgMail.setApiKey(process.env.APISENDGRID);

const sendEmail = (email, id) => {
  const token = jwt.sign({ _id: id.toString() }, "nodejs");

  sgMail
    .send({
      to: "sagarramani878@gmail.com",
      bcc: "loverboy9724@gmail.com",
      from: "panchalvikas292000@gmail.com",
      subject: "Password Reset @ProductHunt",
      html: `
      <div align="center" width="150" style="background-color:orange;">
      <p >Someone (hopefully you) has requested a password reset for your ProductHunt account. Follow the link below to set a new password:</p>
      <br>
      <a href="http://localhost:3000/change/${token}">http://localhost:3000/change/${token}</a>
      <br>
      <p>If you don't wish to reset your password, disregard this email and no action will be taken.</p>
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
