const express = require('express');
const axios = require('axios');
const { default: mongoose } = require('mongoose');
const dept = require('../models/department.model');
const CSEsubject = require('../models/CSE.model');
const CIVILsubject = require('../models/CIVIL.model');
const MECHsubject = require('../models/MECH.model');
const ECEsubject = require('../models/ECE.model');


function insert() {
    const DEPT = new dept({
        Deptname: "CSE"
    });
    DEPT.save().then((result) => {
        console.log("data id saved :: " + result);
    }).catch((err) => {
        console.log(err);
    })
}

exports.Deptlist = (req, res) => {

    // insert();
    dept.find().then((result) => {
        res.render("department", { title: result });
    }).catch((err) => {
        console.log(err);
    })
}

exports.whole = async (req, res) => {
    try {
        const results1 = await CSEsubject.find().lean().exec();
        const results2 = await CIVILsubject.find().lean().exec();

        const mergedata = [...results1, ...results2];

        res.json(mergedata);

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
