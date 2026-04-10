const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.MAIL_PASSWORD, 
  },
});

const sendRegistrationEmail = async (to, userName,busName,busNumber,seatNumber,from,destination,journeyDate,arrivalTime,departureTime) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: 'Welcome to BookmyBus',
    text: `Hello ${userName},\n\nThank you for registering at BookmyBus. We are excited to have you on board.\n\nBest regards,\nThe BookmyBus Team\n Your Bus name is  ${busName}.\n Bus Number :- ${busNumber}\n Your selected seat number is ${seatNumber},\nBus starts from :- ${from},\n Your destination :- ${destination},\n JourneyDate :- ${journeyDate},\n arrival Time :- ${arrivalTime},\n departure Time :- ${departureTime}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Registration email sent successfully');
  } catch (error) {
    console.error('Error sending registration email:', error);
  }
};

module.exports  = sendRegistrationEmail ;
