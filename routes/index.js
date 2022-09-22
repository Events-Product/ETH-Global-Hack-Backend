var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");

router.post(
  "/getLazyMintSignature",
  auth,
  require("../controllers/getLazyMintSignature")
);

router.post(
  "/mintNfcCreation",
  auth,
  require("../controllers/mintNfcCreation")
);

router.get("/nfcId/:id", auth, require("../controllers/getNFCId"));
router.patch("/nfcId/:id", auth, require("../controllers/patchNFCId"));

router.post("/ethMoments", auth, require("../controllers/ethMoments.js"));

router.get("/getAddress/:address", auth, require("../controllers/getAddress"))
router.get("/getCreated/:address", auth, require("../controllers/getCreated"))
router.get("/getFriends/:address", auth, require("../controllers/getFriends"))

// router.get(
//   "/ethMomentsLeaderboard",
//   auth,
//   require("../controllers/ethMomentsLeaderboard.js")
// );




router.get("/getAccessToken", require("../controllers/apiAuth"));

module.exports = router;
