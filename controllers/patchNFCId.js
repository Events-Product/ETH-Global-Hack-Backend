// var NfcCollection = require("../models").NfcCollection
module.exports = async function(req,res)
{

    let {id} = req.params;

    let {nftTypeId,title,wallet} = req.body;

    const output = await tableland.read(`SELECT * FROM NfcCollection_80001_2445 where nfcId = "${id}"`);

    try {

        if(output.rows.length)
        {

            sql = `UPDATE NfcCollection_80001_2445 SET nftTypeId= "test",title="test",wallet="test" where nfcId = "${id}"`;
            console.log(sql)

            const update = await tableland.write(`Update NfcCollection_80001_2445 set nftTypeId= '${nftTypeId}',title='${title}',wallet='${wallet}' where nfcId = "${id}"`)
            res.send({message: "Updated"})
            
        }else{
            res.send({error: "NFC Not Found"})
        }
        
    } catch (error) {
        console.log(error);
        res.send({error: "Something Went Wrong"})

    }

    
    
}