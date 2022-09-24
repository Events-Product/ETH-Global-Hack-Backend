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

    var hunt = await Hunt.findAll({where:{eventUUID:eventId,ticketId: ticketId}});

    if(hunt.length)
    { 
        var updateData = hunt[0].data;

        for(i=0; i<event[0].data.length-1; i++)
        {

            if(req.body["part"+(i+1)])
            {
                updateData["part"+(i+1)] = req.body["part"+(i+1)]
            }
                
        }
        
        var update = await Hunt.update({data:updateData},{where:{eventUUID:eventId,ticketId: ticketId}});

        var huntInfo = await Hunt.findAll({where:{eventUUID:eventId,ticketId: ticketId}});

        var count = 0;

        for(i=0; i<event[0].data.length-1; i++)
        {

            if(huntInfo[0].data["part"+(i+1)])
            {
               count++;
            }
                
        }

        updateData = huntInfo[0].data;

        updateData.data = count;

        var update = await Hunt.update({data:updateData},{where:{eventUUID:eventId,ticketId: ticketId}});

        if(update)
        {
            data = {
                message: "Updated"
            }

        }else{
            data = {
                message: "Something Went Wrong"
            }
        }

    }
    else{
        data = {
            message: "TicketId Not found"
        }
    }
     
    res.json(data)
    return;
}