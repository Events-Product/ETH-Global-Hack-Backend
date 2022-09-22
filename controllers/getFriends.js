var friendList = require("../models").friendList;

module.exports = async function(req,res)
{

    let {address} = req.params;


    var find = await friendList.findAll({where:{wallet:address}});

    if(find.length)
    {
        res.send({data: find[0]})
    }else{
        res.send({error: "Not Found"})
    }
    
}
