var Hunt = require("../models").Hunt
var huntEvent = require("../models").huntEvent

module.exports = async function(req,res){

    let {eventId,ticketId} = req.params;

    var event = await huntEvent.findAll({where:{uuid:eventId}});

    if(!event.length)
    {
        res.send({error: "No Event Found"});
        return;
    }

    var parts = {data:0}

    for(i=0; i<event[0].data.length-1; i++)
    {
        parts["part"+(i+1)] = false;
    }

    var post = await Hunt.create({
        eventUUID:eventId,
        ticketId:ticketId,
        data:parts
    })

   
    res.json({message: "Success"});
    return;
}