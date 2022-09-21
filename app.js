'use strict'

global.fetch = require('node-fetch')

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
var cors = require("cors");
dotenv.config();
const fileUpload = require("express-fileupload");
const ethers = require("ethers");
const tbl = require("@tableland/sdk");

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

var whitelist = [
  "http://localhost:3000",
];

var corsOpts = {};

if (process.env.mode == "testing") {
  corsOpts = {
    origin: "*",

    methods: ["GET", "POST", "PATCH"],

    allowedHeaders: ["Content-Type", "validate"],
  };
} else {
  corsOpts = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
        // callback(null, true);
      }
    },

    methods: ["GET", "POST", "PATCH"],

    allowedHeaders: ["Content-Type", "validate"],
  };
}

const corsOpts2 = {
  origin: "*",

  methods: ["GET", "POST", "PATCH"],

  allowedHeaders: ["Content-Type", "validate"],
};

app.use("/", cors(corsOpts2), indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const privateKey = process.env.TABLE_WALLET;
const wallet = new ethers.Wallet(privateKey);
const provider = new ethers.providers.AlchemyProvider("maticmum", process.env.TABLE_ALCHEMY);
const signer = wallet.connect(provider);

async function connectTable(){
  global.tableland = await tbl.connect({ signer, network: "testnet", chain: "polygon-mumbai" });
}

connectTable();

// async function checkModel(){
//   tableland = await tbl.connect({ signer, network: "testnet", chain: "polygon-mumbai" });
//   const tables = await tableland.list();
//   console.log(tables)
//   try {
//     const createNfcCollection = await tableland.create(
//       `id integer not null, nfcId text, maxEditions integer,nftTypeId text,title text,wallet text, primary key (id)`, // Table schema definition
//       {
//         prefix: `NfcCollection` // Optional `prefix` used to define a human-readable string
//       }
//     );
//     console.log(createNfcCollection);
//     const createNfcCollection = await tableland.create(
//       `id integer not null, address text, count integer,creations integer,tagged integer, primary key (id)`, // Table schema definition
//       {
//         prefix: `EthMoment` // Optional `prefix` used to define a human-readable string
//       }
//     );
//     console.log(createNfcCollection);
//       const createNfcCollection = await tableland.create(
//       `id integer not null, creator text, addresses text, primary key (id)`, // Table schema definition
//       {
//         prefix: `user` // Optional `prefix` used to define a human-readable string
//       }
//     );
//     console.log(createNfcCollection);
//   } catch (error) {
//     console.log(error);
//   }


// }

// checkModel();

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
