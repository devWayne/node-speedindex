'use strict';

var cfg = require('../config').mail;
var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: cfg.auth
}));

var control = {};


function send(mailOptions){
    transporter.sendMail(mailOptions);
}

module.exports = {
    send:send
}


