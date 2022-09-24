var huntEvent = require("../models").huntEvent

module.exports = async function(req,res){

    let {id} = req.params;

    var page = await huntEvent.findAll({where:{uuid:id}});

    if(page.length)
    {
        data = page[0]
    }
    else{
        data = {
            message: "Id Not found"
        }
    }
     
    res.json(data)
    return;
}