const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const port = process.env.PORT || 5500

const app = express();
app.use(cors());
app.use(bodyParser.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zpujg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const AllCategoryDaoDataCollection = client.db("DAO_EXPO").collection("AllCategoryDaoData");
  const SearchUserProfileData = client.db("DAO_EXPO").collection("SearchUserProfileData");
  
  console.log("db connected")

  // AllCategoryDaoData api
  app.post('/addAllCategoryDao', (req, res) => {
    const AllCategoryDaoData = req.body;
    AllCategoryDaoDataCollection.insertMany(AllCategoryDaoData)
    .then(result => {
      res.send(result.insertedCount);
    })
  })

  app.get('/allCategoryDao', (req, res) => {
    const category = req.query.category;
    const query = {category: category };
    AllCategoryDaoDataCollection.find(query)
    .toArray((err, allCategoryDao) => {
      res.send(allCategoryDao)
    })
  })

  app.get('/searchAllCategoryDaoByName', (req, res) => {
    const search = req.query.search;

    AllCategoryDaoDataCollection.find({
      Name: { $regex: search, $options: "i" }
    })
    .toArray((err, searchAllCategoryDaoByName) => {
      res.send(searchAllCategoryDaoByName)
    })
  })


  // SearchUserProfileData api
  app.post('/userProfileData', (req, res) => {
    const userProfileData = req.body;
    SearchUserProfileData.insertMany(userProfileData)
    .then(result => {
      res.send(result.insertedCount);
    })
  })

  app.get('/userProfiles',(req, res) => {
    SearchUserProfileData.find()
    .toArray((err, userProfiles) => {
      res.send(userProfiles)
    })
  })

  // app.get('/userProfile', (req, res) => {
  //   const name = req.query.name;
  //   const query = {name: name };
  //   SearchUserProfileData.find(query)
  //   .toArray((err, userProfile) => {
  //     res.send(userProfile)
  //   })
  // })

  app.get('/userProfiles/:id', (req, res) => {
    const id = ObjectId(req.params.id);
    SearchUserProfileData.find(id)
    .toArray((err, userProfiles)=> {
      res.send(userProfiles)
    })
  })

  app.get('/userProfile', (req, res) => {
    const search = req.query.search;

    SearchUserProfileData.find({
      name: { $regex: search, $options: "i" }
    })
    .toArray((err, userProfile) => {
      res.send(userProfile)
    })
  })
  
})


app.get('/', (req, res) => {
  res.send('Hello DAO')
})

app.listen(port)