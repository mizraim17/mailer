const nodemailer = require ('nodemailer');
const hbs = require ('hbs');
const fs = require ('fs');

const transporter = nodemailer.createTransport({
   service:"Gmail",
    auth:{
        user:  process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const generateHtml=(filename,option={}) => {
    const html = hbs.compile(fs.readFileSync((__dirname, `./views/mail/${filename}.hbs`),"utf8"));
    return html(option);
};

exports.send=(options)=>{
    const html = generateHtml(options.filename, options);
    const mailOption={
      from: "El mero mero <noreply@mizraim.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        html
    };
  return transporter.sendMail(mailOption);
};