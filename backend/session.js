const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.session.name = "Yash Raj Mishra";
  req.session.phone_number = "9818877032";
  console.log(req.session.name, req.session.phone_number);
  res.send("Session values set"); // Send the response after setting the session values
});

router.get("/sessionValues", (req, res) => {
  if (!req.session.name || !req.session.phone_number) {
    res.send("Session values not set"); // Send a message if session values are not set
  } else {
    const message = `${req.session.name} and the phone number is => ${req.session.phone_number}`;
    console.log(message); // log the message
    res.send(message); // send the message as a response
  }
});

module.exports = router;
