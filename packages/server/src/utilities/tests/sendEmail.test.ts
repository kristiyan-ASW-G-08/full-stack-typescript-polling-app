import nodemailer from 'nodemailer';
import sendEmail from '@utilities/sendEmail';
import MailOptions from '@customTypes/MailOptions';

const sendMailMock = jest.fn();
jest.mock('nodemailer');
(nodemailer.createTransport as jest.Mock).mockReturnValue({
  sendMail: sendMailMock,
});

describe('sendEmail', (): void => {
  const mailOptions: MailOptions = {
    from: 'testTest@.test',
    to: 'testTest@.test',
    subject: 'Mock',
    html: `MockHtml`,
  };
  it('should call createTransport and sendMail', (): void => {
    expect.assertions(3);

    sendEmail(mailOptions);

    expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith(mailOptions);
  });
});
