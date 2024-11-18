const express = require('express');
const MongoClient = require('mongodb/lib/mongo_client');

const app = express()

app.use(express.json())
app.set('port', 3000)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
})

const Mongoclient = require('mongodb').MongoClient;

let db;
MongoClient.connect('mongodb+srv://Admin:admin@gettingstarted.quhps.mongodb.net/', (err, client) => {
    db = client.db('webstore')
});

app.get('/', (req, res, next) => {
    res.send('select a collection, e.g., /collection/messages')
})

app.param('collectionName', (req, res, next, collectionName) => {
        req.collection = db.collection(collectionName)
        return next()
    })

app.get('/collection/:collectionName', (req, res, next) => {
        req.collection.find({}).toArray((e, results) => {
            if (e) return next(e)
            res.send(results)
        })
})

//adding post
app.post('/collection/:collectionName',(req,res,next)=>{
    req.collection.insert(req.body,(e,results)=> {
        if (e) return next(e)
            res.send(results.ops)
    })
})

//update an object
app.put('/collection/:collectionName/:id',(req,res,next) =>{
    req.collection.updateOne 
    ({ _id: new ObjectID(req.params.id) },
    { $set: req.body },
    (e, results) => {
        if (e) return next(e)
            res.send(result.result.n===1) ? {msg:'sucess'} : {msg:'error'}
})
})
// delete an object
app.delete('/collection/:collectionName/:id',(req,res,next)=>{
    req.collection.deleteOne ( 
        {_id: new ObjectID(req.params.id) }, (e, results) => {
            if (e) return next(e)
                res.send((result.result.n === 1 )? 
            { msg: 'success' } : { msg:'error'})
    })
})

const port =process.env.PORT || 3000
app.listen(port)

app.listen(3000, () => {
    console.log('Express.js server running at localhost:3000');
})