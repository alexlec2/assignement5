const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const knexConfig = require('./db/knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV])
app.use(bodyParser.json());

const cors = require("cors");

app.options("*", cors({ origin: 'http://localhost:8080', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:8080", optionsSuccessStatus: 200 }));


app.get('/data', (req, res)=>{
    console.log("zjcnsldk")
    knex.select('*')
        .table('data')
        .innerJoin(
            'datalikes',
            'data.id_data',
            '=',
            'likesdata.id_data'
        )
        .orderBy('id_data', 'asc')
        .then((data) => {
            console.log(data)
            return res.json(data);
        })
        .catch((err) => {
            console.error(err);
            return res.json({success: false, message: 'An error occurred, please try again later.'});
        })
})

app.get('/showData', (req, res)=>{
    knex('data')
        .select({
            id_data: 'id_data',
            color: 'color',
            countLikes: 'countlikes',
            countDislikes: 'countdislikes'
        })
        .orderBy('id_data', 'asc')
        .then((users) => {
            return res.json(users);
        })
        .catch((err) => {
            console.error(err);
            return res.json({success: false, message: 'An error occurred, please try again later.'});
        })
})

app.get('/showTableLikes', (req, res)=>{
    knex('likesdata')
        .select({
            id: 'id',
            id_data: 'id_data',
            type: 'type',
            date: 'actionnedat'
        })
        .orderBy('actionnedat', 'desc')
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => {
            console.error(err);
            return res.json({success: false, message: 'An error occurred, please try again later.'});
        })
})

app.post('/addLikes', (req, res)=>{
    let id_data = req.body.id_data;
    id_data++;
    const type = req.body.type;
    let timestamp = new Date(Date.now()).toISOString();

    knex('likesdata')
        .insert({
            id_data,
            type,
            actionnedat: timestamp,
        })
        .then((data) => {
            let columnIncrement = "countdislikes"
            if(type === "likes"){
                columnIncrement = "countlikes"
            }
            knex('data')
                .where('id_data', '=', id_data)
                .increment(columnIncrement, 1)
                .then((data)=>{
                    return res.json(data);
                })
        })
        .catch((err) => {
            console.error(err);
            return res.json({success: false, message: 'An error occurred, please try again later.'});
        })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});