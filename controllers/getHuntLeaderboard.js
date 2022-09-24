var Hunt = require("../models").Hunt;

module.exports = async function (req, res) {
  var hunt0 = await Hunt.findAll({
    order: [["updatedAt", "ASC"]],
    where: { data: 9 },
  });
  var hunt1 = await Hunt.findAll({
    order: [["updatedAt", "ASC"]],
    where: { data: 8 },
  });
  var hunt2 = await Hunt.findAll({
    order: [["updatedAt", "ASC"]],
    where: { data: 7 },
  });
  var hunt3 = await Hunt.findAll({
    order: [["updatedAt", "ASC"]],
    where: { eventUUID:eventId,data:{data: 6} },
  });
  var hunt4 = await Hunt.findAll({
    order: [["updatedAt", "ASC"]],
    where: { data: 5 },
  });
  var hunt5 = await Hunt.findAll({
    order: [["updatedAt", "ASC"]],
    where: { data: 4 },
  });
  var hunt6 = await Hunt.findAll({
    order: [["updatedAt", "ASC"]],
    where: { data: 3 },
  });
  var hunt7 = await Hunt.findAll({
    order: [["updatedAt", "ASC"]],
    where: { data: 2 },
  });
  var hunt8 = await Hunt.findAll({
    order: [["updatedAt", "ASC"]],
    where: { data: 1 },
  });

  var arr = [
    ...hunt0,
    ...hunt1,
    ...hunt2,
    ...hunt3,
    ...hunt4,
    ...hunt5,
    ...hunt6,
    ...hunt7,
    ...hunt8,
  ];

  var data = {
    rank: {},
    data: arr,
  };

  if (arr.length) {
    for (i = 0; i < arr.length; i++) {
      data.rank[arr[i].ticketId] = i;
    }
  }

  res.send(data);
};
