const express = require("express");
const router = express.Router();

const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

router.get("/test-email", async (req, res) => {

  try {

    const response =
      await resend.emails.send({

        from:
          process.env.FROM_EMAIL,

        to:
          "roytanisha825@gmail.com",

        subject:
          "Himalayan Gold Test",

        html: `
          <h2>Email Working</h2>
          <p>This email was sent from your backend.</p>
        `
      });

    console.log(response);

    res.json(response);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

module.exports = router;