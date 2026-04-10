const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingsModel");
const Bus = require("../models/busModel");
const sendRegistrationEmail = require('../nodemailer/emailService');
const User = require('../models/usersModel');

// book a seat
router.post("/book-seat", authMiddleware, async (req, res) => {
  try {
    console.log(req.body);
    const newBooking = new Booking({
      ...req.body,
      ...req.user,
      user: req.body.userId,
    });
    
    const user = await User.findById(req.body.userId);
    const busName = await Bus.findById(req.body.bus);
    console.log(busName);
    await newBooking.save();
    const bus = await Bus.findById(req.body.bus);
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];
    await bus.save();
   
    
    // Send registration email
    await sendRegistrationEmail(user.email, user.name, bus.name,busName.number,busName.seatsBooked,
      busName.from,busName.to,busName.journeyDate,busName.arrival,busName.departure);
    res.status(200).send({
      message: "Booking successful",
      data: newBooking,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Booking failed",
      data: error,
      success: false,
    });
  }
});

// make payment (dummy implementation without Stripe)
router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    // Perform any dummy logic you want for payment
    // For example, you can directly mark the booking as paid here

    res.status(200).send({
      message: "Payment successful (dummy)",
      data: {
        transactionId: "dummyTransactionId",
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Payment failed",
      data: error,
      success: false,
    });
  }
});

// get bookings by user id
router.post("/get-bookings-by-user-id", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("bus")
      .populate("user");
    res.status(200).send({
      message: "Bookings fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Bookings fetch failed",
      data: error,
      success: false,
    });
  }
});

// get all bookings
router.post("/get-all-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("bus").populate("user");
    res.status(200).send({
      message: "Bookings fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Bookings fetch failed",
      data: error,
      success: false,
    });
  }
});

module.exports = router;
