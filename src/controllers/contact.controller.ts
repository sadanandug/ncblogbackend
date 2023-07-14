import Contact from "../models/contact.model";
import resposnes from "../utils/responses";
import { Request, Response } from "express";
import * as mail from "nodemailer";

export const doubt = async (req: Request, res: Response) => {
  console.log(req.body)
  let transporter = mail.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS
    }
  })

  transporter.verify((err, success) => {
    if (err) {
      console.log(err);
    }
  })
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: req.body.email,
    subject: "Greeting From Next Campus",
    html: `
      <body>
     <div
      style="
        border-bottom: 4px solid #00a5e4;
        border-top: 4px solid #00a5e4;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
      "
    >
      <div
        style="
          width: 10%;
          margin: auto auto;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 10px;
        "
      >
        <img src="../public/next_campus_logo.jpeg" style="margin-left: auto; margin-right: auto" />
        <img
          src="../public/next_campus_text.jpeg"
          style="margin-left: auto; margin-right: auto"
        />
      </div>
    </div>
    <div
      style="
        border-bottom: 4px solid #00a5e4;
        font-family: 'Courier New', Courier, monospace;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        padding: 20px 20px;
      "
    >
      <div style="width: 70%; margin: auto auto; text-align: center">
        THANK YOU SO MUCH FOR SHOWING YOUR INTEREST IN NEXTCAMPUS! WE WILL GET
        BACK TO YOU SOON. - THE NextCampus TEAM
      </div>
    </div>
      </body>
      `
  }
  transporter.sendMail(mailOptions).then(res1 => {
    console.log("mail sent" + res1)
    const newContact = new Contact(req.body);
    newContact.save()
      .then(() => {
        return resposnes.successfullyCreatedResponse(res, "Query is added..")
      })
      .catch((error) => {
        console.log(error);
        return resposnes.serverErrorResponse(res);
      });

  })
    .catch((error) => {
      console.log(error)
      return resposnes.serverErrorResponse(res);
    })
};

