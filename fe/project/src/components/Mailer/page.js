import nodemailer from "nodemailer";
export function MailCheck() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ssaraa0627@gmail.com",
      pass: "ybsd sjzu eifn ptkq ",
    },
  });
  const Click = () => {
    const mailOptions = {
      from: "ssaraa0627@gmail.com",
      to: "hhishgee0203@gmail.com",
      subject: "Subject",
      text: "Email content",
      // html: "<b>Hello world?</b>",
    };
    console.log("Message sent: %s", info.messageId);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        // do something useful
      }
    });
    main().catch(console.error);
  };
  return <button onClick={Click}></button>;
}
