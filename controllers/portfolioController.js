import nodemailer from "nodemailer";
import Transport from "nodemailer-brevo-transport";
import dotenv from "dotenv";

//dotenv config:
dotenv.config();

const transporter = nodemailer.createTransport(
  new Transport({ apiKey: process.env.API_BREVO })
);

export const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;
    //validation:
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    //email matter:
    transporter.sendMail({
      to: "jobeda8259@gmail.com",
      from: "jobeda8259@gmail.com",
      subject: "Regarding Mern Portfolio App",
      html: `
      <h5>Detail Information</h5>
      <ul>
      <li> <p>Name : ${name}</p> </li>
      <li> <p>Email : ${email}</p> </li>
      <li> <p>Message : ${msg}</p> </li>
      </ul>
      `,
    });

    return res.status(200).send({
      success: true,
      message: "Your message successfully sent",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email Api Error",
      error,
    });
  }
};
