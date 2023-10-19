const express = require('express');
const axios=require('axios');
const { default: mongoose } = require('mongoose');
const subject = require('../models/ECE.model');
const fs = require('fs');
const path = require('path');

function insert()
{
    const ECE = new subject({
        Subjects:"Electronic Devices",
    });
    ECE.save().then((result)=>{
        console.log("data id saved :: " + result);
    }).catch((err)=>{
        console.log(err);
    })
}
exports.ECE = (req,res)=>{
    // insert();
    subject.find().then((result)=>{
        res.render("subjects",{data:result,dep:"ECE",search:'searchece',link:"searchec"});
    }).catch((err)=>{
        console.log(err);
    })
    
}

exports.mst = (req, res) => {
    const dir=path.join(__dirname,`../public/docs/${req.params['Operating_System']}/${req.params['mst1']}`)
    // const dirpath = `D:/Database-project/Get_paper/Get_Papers/public/docs/${req.params['Operating_System']}/${req.params['mst1']}`;
    console.log(dir)
    
    try {
        fs.readdir(dir, 'utf-8', (err, files) => {
            var arr = [];
            files.forEach((item) => {
                arr.push(item);
            })
            len = files.length;
            res.render('mst', { leng: len, arr, msts: req.params['mst1'], sub: req.params['Operating_System'],back:"ECE" });
        })
    } catch (error) {
        // console.log("Error occured", error);
        return res.redirect("error");
    }

}

exports.auto=(req,res)=>{
    
    subject.find({},{Subjects:1}).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    }) 
}


exports.search = async (req, res) => {
    const searchdata = await req.query.searchinput;
    try {
        const found = await subject.findOne({ Subjects: searchdata });
        if (found) {
            const data = { Subjects: searchdata, age: 30 };
            const single = data.Subjects;

            // console.log(data);
            res.render('subjects', { data: null, item: data, dep: "ECE", search: "searchece",link:"searchec" });
        }
        else{
            res.render('subjects', { data: null, item: null, dep: "ECE", search: "searchece", notfind:"Not Result Found",link:"searchec"});
        }

        // res.send(data);

    } catch (error) {
        console.log(error);
        // return res.redirect('/dept/CSE');
    }

}