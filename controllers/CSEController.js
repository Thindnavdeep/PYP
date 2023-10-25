const express = require('express');
const axios = require('axios');
const { default: mongoose } = require('mongoose');
const subject = require('../models/CSE.model');
const path = require('path');


// console.log(dirpath);
// const dept = require('../models/.model');
const fs = require('fs');

function insert() {
    const cse = new subject({
        Subjects: "Cloud Computing",
    });
    cse.save().then((result) => {
        console.log("data id saved :: " + result);
    }).catch((err) => {
        console.log(err);
    })
}
exports.CSE = (req, res) => {
    // insert();
    try {
        subject.find().then((result) => {
            res.render("subjects", { data: result, dep: "CSE", search: "searchcse", link: "searchcs" });
        }).catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error)
    } finally {

    }
}
// exports.opt = (req, res) => {
//     res.send("this is " + req.params['Operating_System'] + `<br><br><a href="${req.params['Operating_System']}/mst1">mst1</a>
//     <br><br><a href="${req.params['Operating_System']}/mst2">mst2</a><br><br><a href="${req.params['Operating_System']}/final">Final</a>`);

// }
exports.mst = (req, res) => {
    const dir = path.join(__dirname, `../public/docs/${req.params['Operating_System']}/${req.params['mst1']}`)
    //  const dir = `D:/Database-project/Get_paper/Get_Papers/public/docs/Operating System/mst1`;
    console.log(dir)
    // console.log(req.params['mst1'])

    try {
        fs.readdir(dir, 'utf-8', (err, files) => {
            var arr = [];
            
                files.forEach((item) => {
                    arr.push(item);
                })
            len = files.length;
            res.render('mst', { leng: len, arr, msts: req.params['mst1'], sub: req.params['Operating_System'], back: "CSE" });
        })
    } catch (error) {
        // console.log("Error occured", error);
        return res.redirect("error");
    }

}
exports.auto = (req, res) => {

    try {
        subject.find({}, { Subjects: 1 }).then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error)
    }
}
/*
exports.search = async (req, res,next) => {
    const searchdata = await req.query.searchinput;
    try {
        const found = await subject.find({ Subjects: searchdata });
        if (found) {
            const data = { Subjects: searchdata, age: 30 };
            const single = data.Subjects;
            // console.log("if cse");
            // console.log(data);
            res.render('subjects', { data: null, item: data, dep: "CSE", search: "searchcse",link:"searchcs" });
        }
        else{
            // console.log("else cse");
            res.render('subjects', { data: null, item: null, dep: "CSE", search: "searchcse", notfind:"Not Found",link:"searchcs" });
        }
        // res.send(data);

    } catch (error) {
        console.log(error);
        // return res.redirect('/dept/CSE');
    }

}
*/



exports.search = async (req, res, next) => {
    const searchdata = await req.query.searchinput;
    try {
        const found = await subject.findOne({ Subjects: searchdata });
        if (found) {
            const data = { Subjects: searchdata, age: 30 };
            const single = data.Subjects;

            // console.log(data);
            res.render('subjects', { data: null, item: data, dep: "CSE", search: "searchcse", link: "searchcs" });
        }
        else {
            res.render('subjects', { data: null, item: null, search: "searchcse", notfind: "Not Found", link: "searchcs" });
        }

        // res.send(data);

    } catch (error) {
        console.log(error);
        // return res.redirect('/dept/CSE');
    }

}