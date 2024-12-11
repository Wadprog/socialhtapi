module.exports = [
  {
    name: 'EML_VRF_KY',
    subject: 'Email Verification',
    body: 'Your email verification code is {emailVerificationKey}',
    required_fields: '{"fields": [ "{emailVerificationKey}"]}',
    // created_at: Date.now(),
    // updated_at: Date.now(),
  },
];
