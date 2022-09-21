// var NfcCollection = require("../models").NfcCollection
module.exports = async function(req,res)
{

    let {id} = req.params;

    let {nftTypeId,title,wallet} = req.body;

    const output = await tableland.read(`SELECT * FROM ${process.env.MODEL_1} where nfcId = "${id}"`);

    try {

        if(output.rows.length)
        {
            const update = await tableland.write(`Update ${process.env.MODEL_1} set nftTypeId= '${nftTypeId}',title='${title}',wallet='${wallet}' where nfcId = "${id}"`)
            res.send({message: "Updated"})
            
        }else{
            res.send({error: "NFC Not Found"})
        }
        
    } catch (error) {
        console.log(error);
        res.send({error: "Something Went Wrong"})

    }

    
    
}