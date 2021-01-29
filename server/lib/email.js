var nodemailer = require("nodemailer");

module.exports = function (credentials) {
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    secureConnection: true, // 使用SSL方式（安全方式，防止被竊取信息）
    auth: {
      user: credentials.gmail.user,
      pass: credentials.gmail.pass,
    },
    tls: {
      // 不得檢查服務器所發送的憑證
      rejectUnauthorized: false,
    },
  });
  return {
    send: function (from, to, sub, body) {
      transporter.sendMail(
        {
          from: from,
          to: to,
          subject: sub,
          html: body,
        },
        function (err) {
          if (err) {
            console.log("Unable to send email: " + err);
          }
        }
      );
    },
  };
};
