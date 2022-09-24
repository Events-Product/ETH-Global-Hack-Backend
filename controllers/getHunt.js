var Hunt = require("../models").Hunt;

module.exports = async function (req, res) {
  let { ticketId,eventId} = req.params;

  var hunt = await Hunt.findAll({ where: { ticketId: ticketId,eventUUID:eventId } });

  if (hunt.length) {
    data = {
      data: hunt[0],
    };
  } else {
    data = {
      message: "TicketId Not found",
    };
  }

  res.json(data);
  return;
};
