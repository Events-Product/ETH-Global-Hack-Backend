
module.exports = async function(req,res)
{

    let {addresses, creatorAddress} = req.body;

    if(!addresses || !creatorAddress)
    {
        res.status(400).send({error: "Invalid Payload"})
    }

    if(addresses.length)
    {
        for(i=0; i<addresses.length; i++)
        {
            var checkWallet = await tableland.read(`SELECT * FROM ${process.env.MODEL_2} where address = "${addresses[i]}"`);
            if(checkWallet.rows.length)
            {
                
                let {columns, rows} = checkWallet;

                var row = rows[0]

                var dataEthMoment = {}

                for(z=0; z<columns.length; z++)
                {
                    dataEthMoment[columns[z].name] = row[z];
                }

                dataEthMoment.add = addresses[i]
                
                var add = dataEthMoment.add;
                var tempCount = dataEthMoment.count;
                var tempCreations = dataEthMoment.creations;
                var tempTagged = dataEthMoment.tagged;

                if(add == creatorAddress)
                {
                    
                    var updateWallet = await tableland.write(`Update ${process.env.MODEL_2} set count= ${tempCount+1},creations=${tempCreations+1},tagged=${tempTagged} where address = '${add}'`)
                
                }else{
                    
                   
                    var updateWallet = await tableland.write(`Update ${process.env.MODEL_2} set count= '${tempCount+1}',creations='${tempCreations}',tagged='${tempTagged+1}' where address = '${add}'`)

                }

            }else{

                if(addresses[i] == creatorAddress)
                {

                    var uploadWallet = await tableland.write(`Insert Into ${process.env.MODEL_2}(address,count,creations,tagged) values('${addresses[i]}',1,1,0)`)

                    
                }else{
                    var uploadWallet = await tableland.write(`Insert Into ${process.env.MODEL_2}(address,count,creations,tagged) values('${addresses[i]}',1,0,1)`)

                }

                
            }
    
        }

        var indexOfCreator = addresses.indexOf(creatorAddress);

        if (indexOfCreator > -1) {
            addresses.splice(indexOfCreator, 1);
        }

        var checkUser = await tableland.read(`SELECT * FROM ${process.env.MODEL_3} where creator = "${creatorAddress}"`);

        if(checkUser.rows.length)
        {

            var tempAddresses = checkUser.rows[0][2];
            var finalArray = tempAddresses.concat(addresses.filter((item) => tempAddresses.indexOf(item) < 0));
            
            var stringifyFinalArray = JSON.stringify(finalArray);

            var update = await tableland.write(`Update ${process.env.MODEL_3} set addresses= '${stringifyFinalArray}' where creator = '${creatorAddress}'`)

        }else{

            var dataStringify = JSON.stringify(addresses);

            var upload = await tableland.write(`Insert Into ${process.env.MODEL_3}(creator,addresses) values('${creatorAddress}','${dataStringify}')`)

        };

        res.send({message: "Success"});
        return;


    }else{
        res.status(400).send({error: "No data"})
    }

    

}

function matchEntriesETHMoment(data,add)
{
    

    finalDat.add = add

    return finalDat;

}

function matchEntriesUser(data)
{
    let {columns, rows} = data;

    var row = rows[0]

    var finalDat = {}

    for(i=0; i<columns.length; i++)
    {

        if(columns[i].name == "addresses")
        {

            finalDat[columns[i].name] = JSON.parse(row[i])
        }else{

        finalDat[columns[i].name] = row[i];
        }

    }

    return finalDat;

}
