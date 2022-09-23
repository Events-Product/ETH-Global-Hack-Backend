require("hardhat");
const buyLazyMint = require("../utils/contractFunctions/buyLazyMint");
const mintNfts = require("../utils/contractFunctions/mintNfts");

const mintMoments = async (req, res, next) => {
  try {
    var { walletAddresses, nftTypeId, params } = req.body;
    console.log(nftTypeId);
    let response = {};

    // one buy lazy mint to nfc creator wallet i.e. creator
    await buyLazyMint(nftTypeId, params);
    response.mintedToCreator = true;

    for (let i = 0; i < walletAddresses.length; i++) {
      var toAddress = walletAddresses[i];
      console.log("to: ", toAddress);
      await mintNfts(nftTypeId, toAddress); // have to add ethcc as category // added
    }
    response.mintedToAllOthers = true;

    res.status(201).json({ response });
  } catch (error) {
    // throw error;
    return res.status(404).json({ message: "Could not mint the moment" });
  }
};

module.exports = mintMoments;
