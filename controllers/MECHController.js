const express = require('express');
const axios = require('axios');
const { default: mongoose } = require('mongoose');
const subject = require('../models/MECH.model');
const fs = require('fs');
const path = require('path');

function insert() {
    const MECH = new subject({
        Subjects: "Web Technology",
    });
    MECH.save().then((result) => {
        console.log("data id saved :: " + result);
    }).catch((err) => {
        console.log(err);
    })
}
exports.MECH = (req, res) => {
    // insert();
    subject.find().then((result) => {
        res.render("subjects", { data: result, dep: "MECH", search: 'searchmech',link:"searchme" });
    }).catch((err) => {
        console.log(err);
    })

}

exports.mst = (req, res) => {
    const dir=path.join(__dirname,`../public/docs/${req.params['subject']}/${req.params['paper']}`)

    
    // const dir=path.join(__dirname,`../public/docs/${req.params['subject']}/${req.params['paper']}`)

    // const dirpath = `D:/Database-project/Get_paper/Get_Papers/public/docs/${req.params['Operating_System']}/${req.params['mst1']}`;
    // console.log(dir)

    try {
        fs.readdir(dir, 'utf-8', (err, files) => {
            var arr = [];
            files.forEach((item) => {
                arr.push(item);
            })
            len = files.length;
            res.render('mst', { leng: len, arr, msts: req.params['paper'], sub: req.params['subject'] ,back:"MECH"});
        })
        // res.send(dir);
    } catch (error) {
        // console.log("Error occured", error);
        return res.redirect("error");

    }
    // res.send("its working")

}

exports.auto = (req, res) => {

    subject.find({}, { Subjects: 1 }).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

exports.search = async (req, res) => {
    try {
        const searchdata = await req.query.searchinput;
        const found = await subject.findOne({ Subjects: searchdata });
        if (found) {
            const data = { Subjects: searchdata, age: 30 };
            const single = data.Subjects;
            // console.log(data);
            console.log("if Mecahnical");
            res.render('subjects', { data: null, item: data, dep: "MECH", search: "searchmech",link:"searchme" });

        }
        else {
            console.log("else Mecahnical");
            res.render('subjects', { data: null, item: null, dep: "MECH", search: null, notfind: "Not Result Found",link:"searchme" });
            
        }
   // res.send(data);
    } catch (error) {
        console.log(error);
        // return res.redirect('/dept/CSE');
    }

}