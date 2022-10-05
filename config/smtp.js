const nodemailer = require('nodemailer')
const env = require('../env')

const mailConfig = {
    pool: true,
    host: env.mail.host,
    port: env.mail.port,
    secure: env.mail.tls ? false : true,
    auth: {
        user: env.mail.user,
        pass: env.mail.pass
    },
    tls: {
        rejectUnauthorized: false
    }
}

const transporter = () => nodemailer.createTransport(mailConfig);

module.exports = transporter