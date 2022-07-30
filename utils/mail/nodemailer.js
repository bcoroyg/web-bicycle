import nodemailer from 'nodemailer';
import pug from 'pug';
import juice from 'juice';
import { convert } from 'html-to-text';
import { fileURLToPath } from 'url';
import config from '../../config/index.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const generateHTML = (file, options = {}) => {
    const html = pug.renderFile(`${__dirname}../../views/emails/${file}.pug`, options);
    return juice(html);
};

let mailConfig;
if (process.env.NODE_ENV === "production") {
    mailConfig = {
        host: config.mailHost,
        port: Number(config.mailPort),
        secure:true,
        auth: {
            user: config.mailUser,
            pass: config.mailPass,
        },
    };
} else {
    mailConfig = {
        host: config.mailHost,
        port: Number(config.mailPort),
        auth: {
            user: config.mailUser,
            pass: config.mailPass,
        },
    };
}

const transporter = nodemailer.createTransport(mailConfig)

const sendMail = async (options) => {
    //Utilizar template
    const html = generateHTML(options.file, options);
    const text = convert(html);
    const optionsMail = {
        from: `"Web Bicicletas" <${config.email}>`,
        to: options.user.email,
        subject: options.subject,
        text,
        html,
    };

    // send mail with defined transport object
    return await transporter.sendMail(optionsMail)
};

export default sendMail;