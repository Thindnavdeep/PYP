const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { default: mongoose } = require('mongoose');
const CSE = require('../models/CSE.model');
const CIVIL = require('../models/CIVIL.model');
const ECE = require('../models/ECE.model');
const MECH = require('../models/MECH.model');

const session = require('express-session');
var cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
const router = require('../routes/fileupload');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
    session({
    secret: 'abcd44',
    resave: false,
    saveUninitialized: true,
}));

const users = [
    { username: 'dhoni', password: 'helicopter@1001' },
];

exports.uploads = async (req, res, next) => {
    const dep = await req.query.dept;
    if (!dep) {
        const dep = "cse";

        await CSE.find().then((result) => {
            res.render("upload", { data: result });

        }).catch((err) => {
            console.log(err);
        });
    }
    else {
        switch (dep) {
            case "cse":
                await CSE.find().then((result) => {
                    res.render("upload", { data: result });
                }).catch((err) => {
                    console.log(err);
                });
                break;
            case "mech":
                await MECH.find().then((result) => {
                    res.render("upload", { data: result });
                }).catch((err) => {
                    console.log(err);
                });
                break;

            case "civil":
                await CIVIL.find().then((result) => {
                    res.render("upload", { data: result });
                }).catch((err) => {
                    console.log(err);
                });
                break;

            case "ece":
                await ECE.find().then((result) => {
                    res.render("upload", { data: result });
                }).catch((err) => {
                    console.log(err);
                });
                break;

            default:
                res.render("upload", { data: "nodatafound" });

        }
    }
}

exports.ups = (req, res) => {
    console.log(req.body);
    console.log(req.files);

    return res.redirect('/upload');
}

exports.loginget = (req, res) => {
    res.render("login",{mes:"login"});
}

exports.loginpost = (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find((user) => user.username === username && user.password === password);
    // console.log(user);
    try {
        if (user)
        {
            req.session.user = user;
            res.redirect('/upload');
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.log("error occured",error);
    }

}
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}