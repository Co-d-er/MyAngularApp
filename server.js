"use strict";
var express     = require('express'),
    bodyParser  = require('body-parser'),
    fs          = require('fs'),
    app         = express(),
    rooms       = JSON.parse(fs.readFileSync('data/rooms.json', 'utf-8')),
    states      = JSON.parse(fs.readFileSync('data/states.json', 'utf-8'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//The dist folder has our static resources (index.html, css, images)
app.use(express.static(__dirname + '/dist')); 

app.get('/api/rooms/page/:skip/:top', (req, res) => {
    const topVal = req.params.top,
          skipVal = req.params.skip,
          skip = (isNaN(skipVal)) ? 0 : +skipVal;  
    let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

    if (top > rooms.length) {
        top = skip + (rooms.length - skip);
    }

    console.log(`Skip: ${skip} Top: ${top}`);

    var pagedrooms = rooms.slice(skip, top);
    res.setHeader('X-InlineCount', rooms.length);
    res.json(pagedrooms);
});

app.get('/api/rooms', (req, res) => {
    res.json(rooms);
});

app.get('/api/rooms/:id', (req, res) => {
    let roomId = +req.params.id;
    let selectedroom = {};
    for (let room of rooms) {
        if (room.id === roomId) {
           selectedroom = room;
           break;
        }
    }  
    res.json(selectedroom);
});

app.post('/api/rooms', (req, res) => {
    let postedroom = req.body;
    let maxId = Math.max.apply(Math,rooms.map((cust) => cust.id));
    postedroom.id = ++maxId;
    postedroom.gender = (postedroom.id % 2 === 0) ? 'female' : 'male';
    rooms.push(postedroom);
    res.json(postedroom);
});

app.put('/api/rooms/:id', (req, res) => {
    let putroom = req.body;
    let id = +req.params.id;
    let status = false;

    //Ensure state name is in sync with state abbreviation 
    const filteredStates = states.filter((state) => state.abbreviation === putroom.state.abbreviation);
    if (filteredStates && filteredStates.length) {
        putroom.state.name = filteredStates[0].name;
        console.log('Updated putroom state to ' + putroom.state.name);
    }

    for (let i=0,len=rooms.length;i<len;i++) {
        if (rooms[i].id === id) {
            rooms[i] = putroom;
            status = true;
            break;
        }
    }
    res.json({ status: status });
});

app.delete('/api/rooms/:id', function(req, res) {
    let roomId = +req.params.id;
    for (let i=0,len=rooms.length;i<len;i++) {
        if (rooms[i].id === roomId) {
           rooms.splice(i,1);
           break;
        }
    }  
    res.json({ status: true });
});

app.get('/api/states', (req, res) => {
    res.json(states);
});

app.post('/api/auth/login', (req, res) => {
    res.json(true);
});

app.post('/api/auth/logout', (req, res) => {
    res.json(true);
});

// redirect all others to the index (HTML5 history)
app.all('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(4200);

console.log('Express listening on port 4200.');

//Open browser
var opn = require('opn');

opn('http://localhost:4200').then(() => {
    console.log('Browser closed.');
});


