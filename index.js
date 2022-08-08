const fs=require('fs');
const path=require('path');
const db=require('./data.json');
let data=[];
db.map((item,id)=>{
     let newData={
        id:id,
        firm:item.firm,
        city:item.city,
        state:item.state,
        no_of_funds:item.no_of_funds,
        check_size:item.check_size,
        no_of_investments:item.no_of_investments,
        no_of_exits:item.no_of_exits,
        website:item.website,
        crunchbase_url:item.crunchbase_url,
        linkedin_url:item.linkedin_url,
        
     }
     data.push(newData);


})

fs.writeFile(path.join(__dirname,'newData.json'),JSON.stringify(data),(err)=>{
    if(err) throw err;
    console.log('file created');
})