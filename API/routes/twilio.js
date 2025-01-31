const express = require('express');
const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;
const router = express.Router();

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID; //Account SID
const twilioApiKey = process.env.TWILIO_API_KEY; //API Key SID
const twilioApiSecret = process.env.TWILIO_API_SECRET; //API Key Secret

// Used specifically for creating Voice tokens
const twimlAppSid = process.env.TWIML_APP_SID; //TwiML App SID
const identity = 'user'

// Generate Twilio access token
router.get('/token', (req, res) => {
  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: twimlAppSid,
    incomingAllow: true
  });

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: identity }
  );
  token.addGrant(voiceGrant);

  res.status(200).json({ token: token.toJwt() });
});

module.exports = router;