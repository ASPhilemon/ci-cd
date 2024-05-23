const nodemailer = require('nodemailer');
const ejs = require('ejs')

function sendMail(
  {
    recipient,
    sender,
    subject,
    template,
    context
  }
)
{
  let emailBody;

  let transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "2d97f505634eaa761005456acaad2c1f"
    }
  });

  ejs.renderFile(template, context, (err, data)=> {
    if(err) throw Error(err.message)
    emailBody = data
  } )
  
  var mailOptions = {
    from:`<${sender}@growthspringers.com>`,
    to: recipient,
    subject: subject,
    html: emailBody,
    replyTo: 'philemonariko@gmail.com'
  };
  
  transporter.sendMail(mailOptions, function(err){
    if (err) throw Error(err.message)
  });
}

module.exports = {sendMail}