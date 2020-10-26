const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lmoae.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(cors());
app.use(bodyParser.json())

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const classCollection = client.db("powerXGym").collection("classes");
    const trainingCollection = client.db("powerXGym").collection("training");
    const featureCollection = client.db("powerXGym").collection("features");

    app.post('/addClasses', (req, res) => {
        const classes = req.body;
        classCollection.insertMany(classes)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    })

    app.post('/addTraining', (req, res) => {
        const trainings = req.body;
        trainingCollection.insertMany(trainings)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    })

    app.post('/addFeatures', (req, res) => {
        const features = req.body;
        featureCollection.insertMany(features)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    })

    app.get('/classes', (req, res) => {
        classCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    app.get('/trainings', (req, res) => {
        trainingCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    app.get('/features', (req, res) => {
        featureCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
});


app.listen(5000)