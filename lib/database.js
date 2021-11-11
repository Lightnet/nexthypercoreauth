

// https://ajv.js.org/guide/managing-schemas.html
// https://reposhub.com/nodejs/database/hypercore-protocol-hypertrie.html
// https://blog.hyper.io/p2p-databases-hyperbee/
import Hypercore from 'hypercore';
import Hyperbee from 'hyperbee';
import Ajv from 'ajv';

import { nanoid16 } from './helper';

import schema_user from "./schema/user";


var urlDB = process.env.DATABASE_URL || './my-hyperbee';

var db;
var ajv;

if(!db){
  db = global.db;
}

if(!ajv){
  ajv = global.ajv;
}

async function init(){
  if(!db){
    console.log("init DB")
    let core = new Hypercore(urlDB);
    db = new Hyperbee(core, {
      keyEncoding: 'json',
      valueEncoding: 'json'
    });

    await db.ready();
    /*
    db.createReadStream()
      .on('data', entry => {
        //movies.push(entry.value)
        console.log("entry.value");
        //console.log(entry);
      })
      .on('end', ()=>{
        console.log("finish...")
      })
    */
    global.db = db;
    
    ajv = new Ajv({useDefaults: true});
    console.log(schema_user)
    ajv.addSchema(schema_user, "user");

    global.ajv = ajv;
  }else{
    console.log("REUSE DB");
  }
}
init();

export function getDB(){
  if(!db){
    init();
  }
  return db;
}

export async function createUser(args){
  if(!db){
    init();
  }

  if(!args){
    return null;
  }

  let alias = args.alias || 'guest';
  let passphrase = args.passphrase || 'guest';

  const User = db.sub('User');
  let bfound = false;
  let data;
  console.log("LOOP FOR USER ID")
  for await (const { key, value } of User.createReadStream()) {
    console.log(">>>>>>>>>")
    if(key){
      console.log(value);
      if(value.alias == alias){
        //need to create token

        
        bfound=true;
        break;
      }
    }
  }
  console.log("LOOP END")
  if(bfound){
    return 'EXIST';
  }else{
    console.log("CREATING USER")
    let userid = nanoid16();

    let validate = ajv.getSchema("user");
    //console.log(validate);
    let user={
      id:userid,
      alias: alias,
      passphrase: passphrase,
    }
    console.log(user);
    console.log(validate(user));
    if(validate(user)){
      console.log("VALID");
      console.log(user);
      User.put(userid, user)
      return 'CREATED'; 
    }else{
      return 'FAIL'; 
    }
  }
}