const express = require('express');
const axios=require('axios');
const { default: mongoose } = require('mongoose');
const subject = require('../models/CIVIL.model');
const fs = require('fs');
const path = require('path');

function insert()
{
    const civil = new subject({
        Subjects:"Transportation Engg",
    });
    civil.save().then((result)=>{
        console.log("data id saved :: " + result);
    }).catch((err)=>{
        console.log(err);
    })
}
exports.CIVIL = (req,res)=>{
    // insert();
    subject.find().then((result)=>{
        res.render("subjects",{data:result,dep:"CIVIL",search:"searchcivil",link:"searchci"});
    }).catch((err)=>{
        console.log(err); 
    })
    
}

exports.mst = (req, res) => {
    const dir=path.join(__dirname,`../public/docs/${req.params['Operating_System']}/${req.params['mst1']}`)
    // const dirpath = `D:/Database-project/Get_paper/Get_Papers/public/docs/${req.params['Operating_System']}/${req.params['mst1']}`;
    // console.log(dir);
    try {
        fs.readdir(dir, 'utf-8', (err, files) => {
            var arr = [];
            files.forEach((item) => {
                arr.push(item);
            })
            len = files.length;
            res.render('mst', { leng: len, arr, msts: req.params['mst1'], sub: req.params['Operating_System'],back:"CIVIL" });
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

exports.search = async (req, res,next) => {
    const searchdata = await req.query.searchinput;
    try {
        const found = await subject.findOne({ Subjects: searchdata });
        if (found) {
            const data = { Subjects: searchdata, age: 30 };
            const single = data.Subjects;

            // console.log(data);
            res.render('subjects', { data: null, item: data, dep: "CIVIL", search: "searchcivil" ,link:"searchci"});
        }
        else{
            res.render('subjects', { data: null, item: null, search: "searchcivil", notfind:"Not Found" ,link:"searchci"});
        }
    
        // res.send(data);

    } catch (error) {
        console.log(error);
        // return res.redirect('/dept/CSE');
    }

}