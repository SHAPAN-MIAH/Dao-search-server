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
  const CultureCommunityDAO = client.db("DAO_EXPO").collection("CultureCommunityDAO");
  const DeFiPartnershipDAO = client.db("DAO_EXPO").collection("DeFiPartnershipDAO");
  const DeFiProtocolDAO = client.db("DAO_EXPO").collection("DeFiProtocolDAO");
  const EducationResearchDAO = client.db("DAO_EXPO").collection("EducationResearchDAO");
  const GameSportsDAO = client.db("DAO_EXPO").collection("GameSportsDAO");
  const InvestmentDAO = client.db("DAO_EXPO").collection("InvestmentDAO");
  const LegalDAO = client.db("DAO_EXPO").collection("LegalDAO");
  const NFTSArtDAO = client.db("DAO_EXPO").collection("NFTSArtDAO");
  const SocialGoodDAO = client.db("DAO_EXPO").collection("SocialGoodDAO");
  const ToolSoftwaresDAO = client.db("DAO_EXPO").collection("ToolSoftwaresDAO");
  const UtilityDAO = client.db("DAO_EXPO").collection("UtilityDAO");
  const NoCategoryDAO = client.db("DAO_EXPO").collection("NoCategoryDAO");
  
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
    const Name = req.query.Name;
    const query = {Name: Name };
    AllCategoryDaoDataCollection.find(query)
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

  app.get('/userProfile', (req, res) => {
    const name = req.query.name;
    // const address = req.query.address;
    const query = {name: name };
    SearchUserProfileData.find(query)
    .toArray((err, userProfile) => {
      res.send(userProfile)
    })

    // const { q } = req.query;
    // console.log(q)
    // const keys = ["name", "address", "Member of DAO", "website_link"];
    // SearchUserProfileData.find((item) => keys.some((key) => item[key].toLowerCase().includes(q)))
    // .toArray((err, userProfile) => {
    // res.send(userProfile)
    // })
  })

  app.get('/userProfiles/:id', (req, res) => {
    const id = ObjectId(req.params.id);
    SearchUserProfileData.find(id)
    .toArray((err, userProfiles)=> {
      res.send(userProfiles)
    })
  })
  


  // CultureCommunityDAO api
  app.post('/cultureCommunityDAOdata', (req, res) => {
    const newCultureCommunityDAOdata = req.body;
    CultureCommunityDAO.insertMany(newCultureCommunityDAOdata)
    .then(result => {
      res.send(result.insertedCount);
    })
  })

  app.get('/cultureCommunityDAO', (req, res) => {
    CultureCommunityDAO.find()
    .toArray((err, cultureCommunityDAO) => {
        res.send(cultureCommunityDAO)
    })
  })

  app.get('/cultureCommunityDAOquery', (req, res) => {
    const Name = req.query.Name;
    const query = {Name: Name };
    CultureCommunityDAO.find(query)
    .toArray((err, cultureCommunityDAOquery) => {
      res.send(cultureCommunityDAOquery)
    })
  })


  // DeFiPartnershipDAO api
  app.post('/deFiPartnershipDAO', (req, res) => {
    const newDeFiPartnershipDAOdata = req.body;
    DeFiPartnershipDAO.insertMany(newDeFiPartnershipDAOdata)
    .then(result => {
      res.send(result.insertedCount);
    })
  })


  app.get('/DeFiPartnershipDao', (req, res) => {
    DeFiPartnershipDAO.find()
    .toArray((err, DeFiPartnershipDao) => {
        res.send(DeFiPartnershipDao)
    })
  })

  app.get('/DeFiPartnershipDaoQuery', (req, res) => {
    const Name = req.query.Name;
    const query = {Name: Name };
    DeFiPartnershipDAO.find(query)
    .toArray((err, DeFiPartnershipDaoQuery) => {
      res.send(DeFiPartnershipDaoQuery)
    })
  })


  // DeFiProtocolDAO api
  app.post('/deFiProtocolDAO', (req, res) => {
    const newDeFiProtocolDAOdata = req.body;
    DeFiProtocolDAO.insertMany(newDeFiProtocolDAOdata)
    .then(result => {
      res.send(result.insertedCount);
    })
  })

  app.get('/DeFiProtocolDAO', (req, res) => {
    DeFiProtocolDAO.find()
    .toArray((err, DeFiProtocolDAO) => {
        res.send(DeFiProtocolDAO)
    })
  })

  app.get('/DeFiProtocolDAOQuery', (req, res) => {
    const Name = req.query.Name;
    const query = {Name: Name };
    DeFiProtocolDAO.find(query)
    .toArray((err, DeFiProtocolDAOQuery) => {
      res.send(DeFiProtocolDAOQuery)
    })
  })


  // EducationResearchDAO api
  app.post('/educationResearchDAO', (req, res) => {
    const newEducationResearchDAO = req.body;
    EducationResearchDAO.insertMany(newEducationResearchDAO)
    .then(result => {
      res.send(result.insertedCount);
    })
  })

  app.get('/EducationResearchDAO', (req, res) => {
    EducationResearchDAO.find()
    .toArray((err, EducationResearchDAO) => {
        res.send(EducationResearchDAO)
    })
  })

  app.get('/EducationResearchDAOQuery', (req, res) => {
    const Name = req.query.Name;
    const query = {Name: Name };
    EducationResearchDAO.find(query)
    .toArray((err, EducationResearchDAOQuery) => {
      res.send(EducationResearchDAOQuery)
    })
  })


  // GameSportsDAO api
  app.post('/gameSportsDAO', (req, res) => {
    const newGameSportsDAO = req.body;
    GameSportsDAO.insertMany(newGameSportsDAO)
    .then(result => {
      res.send(result.insertedCount);
    })
  })

  app.get('/GameSportsDAO', (req, res) => {
    GameSportsDAO.find()
    .toArray((err, GameSportsDAO) => {
        res.send(GameSportsDAO)
    })
  })

  app.get('/GameSportsDAOQuery', (req, res) => {
    const Name = req.query.Name;
    const query = {Name: Name };
    GameSportsDAO.find(query)
    .toArray((err, GameSportsDAOQuery) => {
      res.send(GameSportsDAOQuery)
    })
  })


  // InvestmentDAO api
  app.post('/investmentDAO', (req, res) => {
    const newInvestmentDAO = req.body;
    InvestmentDAO.insertMany(newInvestmentDAO)
    .then(result => {
      res.send(result.insertedCount);
    })
  })

  app.get('/InvestmentDAO', (req, res) => {
    InvestmentDAO.find()
    .toArray((err, InvestmentDAO) => {
        res.send(InvestmentDAO)
    })
  })

  app.get('/InvestmentDAOQuery', (req, res) => {
    const Name = req.query.Name;
    const query = {Name: Name };
    InvestmentDAO.find(query)
    .toArray((err, InvestmentDAOQuery) => {
      res.send(InvestmentDAOQuery)
    })
  })



  // LegalDAO api
  app.post('/legalDAO', (req, res) => {
    const newLegalDAO = req.body;
    LegalDAO.insertMany(newLegalDAO)
    .then(result => {
      res.send(result.insertedCount);
    })
  })

  app.get('/LegalDAO', (req, res) => {
    LegalDAO.find()
    .toArray((err, LegalDAO) => {
        res.send(LegalDAO)
    })
  })

  app.get('/LegalDAOQuery', (req, res) => {
    const Name = req.query.Name;
    const query = {Name: Name };
    LegalDAO.find(query)
    .toArray((err, LegalDAOQuery) => {
      res.send(LegalDAOQuery)
    })
  })


  // NFTSArtDAO api
  app.post('/NFTSArtDAO', (req, res) => {
    const newNFTSArtDAO = req.body;
    NFTSArtDAO.insertMany(newNFTSArtDAO)
    .then(result => {
      res.send(result.insertedCount);
    })
  })

  app.get('/nFTSArtDAO', (req, res) => {
    NFTSArtDAO.find()
    .toArray((err, NFTSArtDAO) => {
        res.send(NFTSArtDAO)
    })
  })

  app.get('/nFTSArtDAOQuery', (req, res) => {
    const Name = req.query.Name;
    const query = {Name: Name };
    NFTSArtDAO.find(query)
    .toArray((err, nFTSArtDAOQuery) => {
      res.send(nFTSArtDAOQuery)
    })
  })


  // SocialGoodDAO api
  app.post('/SocialGoodDAO', (req, res) => {
    const newSocialGoodDAO = req.body;
    SocialGoodDAO.insertMany(newSocialGoodDAO)
    .then(result => {
      res.send(result.insertedCount);
    })
  })

  app.get('/socialGoodDAO', (req, res) => {
    SocialGoodDAO.find()
    .toArray((err, SocialGoodDAO) => {
        res.send(SocialGoodDAO)
    })
  })

  app.get('/socialGoodDAOQuery', (req, res) => {
    const Name = req.query.Name;
    const query = {Name: Name };
    SocialGoodDAO.find(query)
    .toArray((err, socialGoodDAOQuery) => {
      res.send(socialGoodDAOQuery)
    })
  })


  // ToolSoftwaresDAO api
  app.post('/ToolSoftwaresDAO', (req, res) => {
    const newToolSoftwaresDAO = req.body;
    ToolSoftwaresDAO.insertMany(newToolSoftwaresDAO)
    .then(result => {
      res.send(result.insertedCount);
    })
  })

  app.get('/toolSoftwaresDAO', (req, res) => {
    ToolSoftwaresDAO.find()
    .toArray((err, toolSoftwaresDAO) => {
        res.send(toolSoftwaresDAO)
    })
  })

  app.get('/toolSoftwaresDAOQuery', (req, res) => {
    const Name = req.query.Name;
    const query = {Name: Name };
    ToolSoftwaresDAO.find(query)
    .toArray((err, toolSoftwaresDAOQuery) => {
      res.send(toolSoftwaresDAOQuery)
    })
  })

  // UtilityDAO api
  app.post('/UtilityDAO', (req, res) => {
    const newUtilityDAO = req.body;
    UtilityDAO.insertMany(newUtilityDAO)
    .then(result => {
      res.send(result.insertedCount);
    })
  })

  app.get('/utilityDAO', (req, res) => {
    UtilityDAO.find()
    .toArray((err, utilityDAO) => {
        res.send(utilityDAO)
    })
  })

  app.get('/utilityDAOQuery', (req, res) => {
    const Name = req.query.Name;
    const query = {Name: Name };
    UtilityDAO.find(query)
    .toArray((err, utilityDAOQuery) => {
      res.send(utilityDAOQuery)
    })
  })


  // noCategoryDAO api
  app.post('/noCategoryDAO', (req, res) => {
    const newNoCategoryDAO = req.body;
    NoCategoryDAO.insertMany(newNoCategoryDAO)
    .then(result => {
      res.send(result.insertedCount);
    })
  })

  app.get('/noCategoryDAOQuery', (req, res) => {
    const Name = req.query.Name;
    const query = {Name: Name };
    NoCategoryDAO.find(query)
    .toArray((err, noCategoryDAOQuery) => {
      res.send(noCategoryDAOQuery)
    })
  })


})


app.get('/', (req, res) => {
  res.send('Hello DAO')
})

app.listen(port)