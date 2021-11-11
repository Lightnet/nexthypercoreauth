/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';

export default function TestDB({props}){

  const [data, setData] = useState('text');

  //once init
  useEffect(() => {
    console.log('init once');
  },[]);

  async function putDB(){
    let res = await fetch('api/database',{
      method:'POST'
      , body:JSON.stringify({action:'put'})
    });
    let data = await res.json();
    console.log(data);
  }

  async function getDB(){
    let res = await fetch('api/database',{
      method:'POST'
      , body:JSON.stringify({action:'get'})
    });
    let data = await res.json();
    console.log(data);
  }

  async function listDB(){
    let res = await fetch('api/database',{
      method:'POST'
      , body: JSON.stringify({action:'list'})
    });
    let data = await res.json();
    console.log(data);
  }

  return(<>
    <div>
      <label>Test DB {data}</label>
      <button onClick={putDB}> Put </button>
      <button onClick={getDB}> Get </button>
      <button onClick={listDB}> List </button>
    </div>
  </>)
}