// import config from 'config';
import SendGridMessenger from './SendGridMessenger.mailer';

// const emailConfig = config.get('EmailerConfiguration');


export const messenger = new SendGridMessenger(
  "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",
  "wvaval@webvitals.org"
);

