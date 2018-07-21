const config = require('../config')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(config.sendgridKey)

exports.send = (to, subject, text, body) => {
    console.log(sgMail)
    sgMail.send({
        to: to,
        from: 'natan@nsdev.com',
        subject: subject,
        text: text,
        html: body
    })
}