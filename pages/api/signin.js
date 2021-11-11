/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getCsrfToken, getProviders } from "next-auth/react";
import {getDB,createUser} from "../../lib/database";

export default async (req, res)=>{
  console.log("[[[=== SIGN IN ===]]]");

  //const csrfToken = await getCsrfToken({ req });
  const csrfToken = await getCsrfToken();
  console.log("csrfToken:",csrfToken);
  //const User = db.model('User');
  //const providers = await getProviders();
  //console.log("Providers", providers)

  if(req.method !== 'POST'){
    return res.status(405).json({message:'Method not allowed!'});
  }

  console.log("req.body");
  console.log(req.body);
  let userData = JSON.parse(req.body);

  let db = getDB();

  let node = db.get(userData.alias);
  if(userData.newUser){
    let data = await createUser({
      alias:userData.alias,
      passphrase:userData.passphrase
    })

    console.log("OUTPUT CREATE USER:", data)


  }


  /*
  //const user = await User.findOne({username: userData.alias}).then(function(user){
  const user = await User.findOne({username: userData.alias}).exec();
    console.log("user");
    console.log(user);
    if(userData.newUser){
      if(!user){
        console.log("[newUser] NOT FOUND, creating...")
        //create user
        let newUser = new User({username: userData.alias})
        newUser.setPassword(userData.passphrase);
        try{
          let saveUser = await newUser.save();
          console.log("save user");
          return res.json(saveUser.toAuthJSON());
        }catch(e){
          return res.json({error:"FAIL"});
        }
      }else{
        console.log("[newUser] Exist");
        return res.json({error:"EXIST"});
      }
    }else{
      if(!user){
        console.log("[login] NOT FOUND")
        return res.json({error:"NOTFOUND"});
        //create user
      }else{
        console.log("[login] Exist");
        if(user.validPassword(userData.passphrase)){
          //user.toAuthJSON();
          console.log("[login] password pass!");
          return res.json(user.toAuthJSON());
        }else{
          console.log("[login] password fail!");
          return res.json({error:"NOTFOUND"});
        }
      }
    }
  //});
  */

  //res.json({id: 1, name: 'J Smith', email: 'jsmith@example.com'});
  console.log("[[[=== UNKNOWN LOGIN FAIL ===]]]")
  return res.json({error:"NOTFOUND"});
};