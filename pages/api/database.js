
// notes:
// https://hypercore-protocol.org/guides/walkthroughs/p2p-indexing-with-hyperbee/

// A sub-database will append a prefix to every key it inserts.
// This prefix ensure that the sub acts as a separate "namespace" inside the parent db.
//const sub1 = db.sub('sub1')
//const sub2 = db.sub('sub2')

//await sub1.put('a', 'b')
//await sub2.put('c', 'd')


// https://hypercore-protocol.org/guides/modules/hyperbee/

// import { getCsrfToken, getProviders } from "next-auth/react";
import {getDB} from "../../lib/database";

export default async (req, res)=>{

  let data = JSON.parse(req.body);
  console.log(data);

  let db = getDB();
  if(data.action=='put'){
    await db.put('a', 'b');
    await db.put('c', 'd');
    await db.put('q', 'd');
  }

  if(data.action=='get'){
    let node = await db.get('a')
    console.log(node);
  }
  let text ='';
  if(data.action=='list'){
    try{
      /*
      for await (const { key, value } of db.createReadStream()) {
        console.log(`${key} -> ${value}`)
      }
      */
      //const rs = db.createReadStream({ gt: 'a', lt: 'z' }) // anything >a and <d
      const rs = db.createReadStream() // anything >a and <d
      //console.log(rs);
      
      for await (const { key, value } of rs) {
        if(key){
          text=key;
          console.log(`${key} -> ${value}`)
        }
      }
      
    }catch(e){
      console.log("ERROR???");
      console.log(e);
    }
  }
  console.log(text);

  
  /*
  db.createReadStream()
  .on('data', entry => {
    //movies.push(entry.value)
    console.log("entry.value");
    //console.log(entry);
  })
  .on('end', ()=>{
    console.log("finish...")
  });
  */
  

  console.log("[[[=== UNKNOWN LOGIN FAIL ===]]]")
  return res.json({error:"NOTFOUND"});
};

