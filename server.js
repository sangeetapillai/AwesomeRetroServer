'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const app = express()
app.use(bodyParser.json());
process.env.NODE_ENV = 'production';
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST');
    next();
});

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

app.post('/save', (req, res) => {
    let retroId = req.query.retroId
    console.log('Received request');
    console.log(req);
    fs.writeFile(retroId+'_json.json', JSON.stringify(req.body), (err) => {
        if (err) console.log(err);
        console.log('File written to JSON.json');
        res.send('File written to JSON.json')
    })
});

app.post('/create', (req, res) => {
    console.log('Received request');
    console.log(req);
    const retroId = create_UUID();
    const response = {'retroId':retroId}
    fs.writeFile(retroId+'_json.json', JSON.stringify(req.body), (err) => {
        if (err) console.log(err);
        console.log('File written to'+ retroId+'_json.json');
        res.send(response)
    })
});

app.get('/get', (req, res) => {
    let retroId = req.query.retroId
    console.log(req);
    console.log(req);
    fs.readFile(retroId+'_json.json', (err,data) => {
        if (err)  console.log(err);
        console.log('File read JSON.json');
        res.send(data)
    })
});

app.listen(3000, ()=>{
    console.log('Listening on port 3000. Post a file to http://localhost:3000 to save to /JSON.json');
});
