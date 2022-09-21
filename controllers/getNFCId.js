
module.exports = async function(req,res)
{

    let {id} = req.params;

    try {
        
        const output = await tableland.read(`SELECT * FROM NfcCollection_80001_2445 where nfcId = "${id}"`);

        if(output.rows.length)
        {
            res.send({data: matchEntries(output)})
        }else{
            res.send({error: "NFC Not Found"})
        }

    } catch (error) {
        res.send({error: "Something Went Wrong"})

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
