import { Request, Response} from 'express';
import nodemailer from 'nodemailer';
import otpSchemaModel from '../models/otp.model';
// Generate a random OTP
const generateOTP = () => {
  const otpLength = 6;
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < otpLength; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

// Send OTP via email
export const sendOtpByEmail = async (req: Request, res: Response) => {
  try {
    // Get the recipient's email address from the request body
    const { email } = req.body;

    // Check if the email exists in the database
    const existingOtpData = await otpSchemaModel.findOne({ email });

    let otp;
    if (existingOtpData) {
      // Update the existing OTP and set the verify field to false
      otp = generateOTP();
      await otpSchemaModel.updateOne({ email }, { otp, verify: false });
    } else {
      // Generate a new OTP and save it in the database
      otp = generateOTP();
      const otpData = {
        email: email,
        otp: otp,
        verify: false,
      };
      await otpSchemaModel.create(otpData);
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '2021mca27@cuk.ac.in',
        pass: 'rAvI890@',
      },
    });

    // Create the mail options
    const mailOptions = {
      from: '2021mca27@cuk.ac.in',
      to: email,
      subject: 'Verify your mail',
      text: `Your email verification otp is: ${otp}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return res.status(200).json({ message: 'OTP sent successfully ',email,otp });
  } catch (error) {
    console.log(error);
    // Return error response
    return res.status(500).json({ error: 'Failed to send OTP' });
  }
};
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    // Get the recipient's email address and OTP from the request body
    const { newEmail, newOtp } = req.body;
    const filter = { email: newEmail, otp: newOtp };
    console.log('---------',newEmail,'============',newOtp);

    // Check if the document exists
    const otp = await otpSchemaModel.findOne({ email: newEmail, otp: newOtp });

    if (!otp) {
      // Return error response
      return res.status(400).json('OTP not found');
    }

    // Create the update to set the verify value to true
    const update = {
      verify: true,
    };

    // Find the document and update the verify value
    await otpSchemaModel.findOneAndUpdate(filter, update);

    if (otp) {
      // Return success response
      return res.status(200).json('OTP verified');
    }
    } catch (error) {
    console.log(error);
    // Return error response
    return res.status(500).json({ error: 'Server Error' });
  }
};




// const generateOTP = () => {
//   const otpLength = 6;
//   const digits = '0123456789';
//   let otp = '';
//   for (let i = 0; i < otpLength; i++) {
//     otp += digits[Math.floor(Math.random() * 10)];
//   }
//   return otp;
// };
// // Send OTP via email
// export const sendOtpByEmail = async (req: Request, res: Response) => {
//   try {
//     // Get the recipient's email address from the request body
//     const { email } = req.body;

//     // Generate an OTP
//     const otp = generateOTP();

//     // Save OTP in the database
//     const otpData = {
//       email: email,
//       otp: otp
//     };
//     await otpSchemaModel.create(otpData);

//     // Configure nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: '2021mca27@cuk.ac.in',
//         pass: 'rAvI890@',
//       },
//     });

//     // Create the mail options
//     const mailOptions = {
//       from: '2021mca27@cuk.ac.in',
//       to: email,
//       subject: 'Your mail is verified',
//       text: `Now mail service is working ${otp}`,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);

//     // Return success response
//     return res.status(200).json({ message: 'OTP sent successfully' });
//   } catch (error) {
//     console.log(error);
//     // Return error response
//     return res.status(500).json({ error: 'Failed to send OTP' });
//   }
// };
