//const HyperspaceClient = require('@hyperspace/client');
const { Client: HyperspaceClient } = require('hyperspace')

async function main(){
  const client = new HyperspaceClient() // connect to the Hyperspace server

  const corestore = client.corestore() // make a corestore
  console.log(corestore);

  //const feed = corestore.get(someHypercoreKey) // make a hypercore
  //await feed.get(42) // get some data from the hypercore


  const feed = corestore.get() // make a hypercore
  console.log(feed);

}

main();