module.exports = async function(req,res)
{

    var find = await tableland.read(`SELECT * FROM ${process.env.MODEL_2}`);

    if(find.rows.length)
    {

        var data = matchEntries(find);

        data.sort(function(a, b) {
            return parseFloat(b.count) - parseFloat(a.count);
        });

        res.send({data: data});
    }else{
        res.send({error: "Not Found"})
    }
    
}

function matchEntries(data)
{
    let {columns, rows} = data;
    console.log(rows);
    var finalDat = []

    for(j=0; j<rows.length; j++)
    {
        finalDat[finalDat.length] = {}
        for(i=0; i<columns.length; i++)
        {
            
            finalDat[finalDat.length-1][columns[i].name] = rows[j][i];
        }
    }


    return finalDat;

}
