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

router.post("/mintMoments", auth, require("../controllers/mintMoments"));

router.get("/nfcId/:id", auth, require("../controllers/getNFCId"));
router.patch("/nfcId/:id", auth, require("../controllers/patchNFCId"));

router.post("/ethMoments", auth, require("../controllers/ethMoments.js"));

router.get("/getAddress/:address", auth, require("../controllers/getAddress"));
router.get("/getCreated/:address", auth, require("../controllers/getCreated"));
router.get("/getFriends/:address", auth, require("../controllers/getFriends"));

router.get("/getEvent/:id", auth, require("../controllers/getEventScavanger"));
router.get("/hunt/:eventId/:ticketId", auth, require("../controllers/getHunt"));
router.post("/hunt/:eventId/:ticketId", auth, require("../controllers/postHunt"));
router.patch("/hunt/:eventId/:ticketId", auth, require("../controllers/updateHunt"));

router.get("/leaderboardCount", auth, require("../controllers/getLeaderBoardCount"));
router.get("/leaderboardCreation", auth, require("../controllers/getLeaderBoardCreation"));
router.get("/leaderboardTagged", auth, require("../controllers/getLeaderBoardTagged"));

// router.get(
//   "/ethMomentsLeaderboard",
//   auth,
//   require("../controllers/ethMomentsLeaderboard.js")
// );

router.get("/getAccessToken", require("../controllers/apiAuth"));

module.exports = router;
