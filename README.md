# nexthypercoreauth

# Create by: Lightnet

# Status:
- test build
- prototype

# Packages:
- Hypercore ( Hypercore Protocol )
- hyperbee
- next  next.js
- react react.js
- ajv
- next-auth
- nanoid

# Information:
  To build simple database base and auth test. Note is just simple test.

  The server setup is next.js which used rest API and less config to set up CORS ( security for script, url and others contents for https)

  By using the hypercore protocol (https://hypercore-protocol.org/) to handle database, peer to peer and other things relate to data.

  Since the database does not have schema. There is package for it as it call Ajv. As it will handle the data format. Since it used key and value from hyperbee.

# links:
- https://ajv.js.org/guide/managing-schemas.html
- https://hypercore-protocol.org/
- https://nextjs.org/


```
HOST="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="mongodb://127.0.0.1/hcp"
SECRET="secret"
```