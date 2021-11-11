// https://ajv.js.org/guide/getting-started.html#parsing-and-serializing-json
// https://ajv.js.org/guide/modifying-data.html#assigning-defaults
//const Ajv = require("ajv/dist/jtd")
const Ajv = require("ajv")
const ajv = new Ajv({useDefaults: true}); // options can be passed, e.g. {allErrors: true}

const UserSchema = {
  //type: "string",
  properties: {
    id:{type:"string"},
    alias:{type:"string"},
    hash:{type:"string", default:""},
    token:{type:"string", default:""},
    date:{type:"string", default:""}
  },
  //optionalProperties: {
    //hash:{type:"string"}
  //}
  required: ["alias"],
  additionalProperties: true // validate call boolean
}

const validate = ajv.compile(UserSchema)

let user = {
  id:"test",
  alias: "test",
  test:"s"
}
console.log(user)

console.log(validate(user)) // true
console.log(user) // { "foo": 1, "bar": "baz" }


//const user = {
  //id:"test",
  //alias: "test"
//}
//const validate = ajv.compile(UserScheme);
//const serialize = ajv.compileSerializer(UserScheme)
//const user = {
  //id:"test",
  //alias: "test"
//}



/*
const userjson = `{
  "id":"test",
  "alias": "test"
  "hash": "test"
}`;
*/


//console.log(serialize(user))

//const parse = ajv.compileParser(UserScheme)

//const data = parse(userjson)
//console.log("data")
//console.log(data)


/*
const valid = validate(user);

if (!valid) console.log(validate.errors)

console.log("valid");
console.log(valid);

console.log("validate")
console.log(validate)
*/

/*
const schema = {
  type: "object",
  properties: {
    foo: {type: "integer"},
    bar: {type: "string"}
  },
  required: ["foo"],
  additionalProperties: false
}

const validate = ajv.compile(schema)

const data = {
  foo: 1,
  bar: "abc"
}

const valid = validate(data)
if (!valid) console.log(validate.errors)
console.log(data)
console.log(valid)
*/