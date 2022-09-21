module.exports = async function(req,res)
{

    let {address} = req.params;


    var find = await tableland.read(`SELECT * FROM ${process.env.MODEL_2} where address = "${address}"`);

    if(find.rows.length)
    {
        res.send({data: matchEntries(find)})
    }else{
        res.send({error: "Not Found"})
    }
    
}

function matchEntries(data)
{
    let {columns, rows} = data;

    var row = rows[0]

    var finalDat = {}

    for(i=0; i<columns.length; i++)
    {
        finalDat[columns[i].name] = row[i];
    }

    return finalDat;

}
