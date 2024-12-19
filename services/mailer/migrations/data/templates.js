module.exports = [
  {
    name: 'EML_VRF_KY',
    subject: 'Email Verification',
    body: 'Hi {firstName}, <p>Your email verification code is {emailVerificationKey}</p>',
    required_fields: '{"fields": [ "{emailVerificationKey}"]}',
  },
  {
    name: 'PSW_RST_KY',
    subject: 'Password Reset',
    body: 'Hi {firstName}, <p>Your Password reset code is {passwordResetKey}</p> and will expire in {time} minutes',
    required_fields: '{"fields": [ "{passwordResetKey}", "{time}"]}',
  },
  {
    name: 'EML_VRF',
    subject: 'Email verified',
    body: 'Hi {firstName}, <p> Thank you for verifying your email</p>',
    required_fields: '{"fields": [ "{firstName}"]}',
  },
  {
    name: 'PSW_CHNG',
    subject: 'Password Changed',
    body: 'Hi {firstName}, <p>Your password has been changed successfuly</p>',
    required_fields: '{"fields": [ "{firstName}"]}',
  },
];
