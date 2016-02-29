# backyardbarber
The web application of Backyard Barber which lets users schedule/begin/end mowings, map out yards, and see the status of their mower.

<h2>To Install and Run</h2>
Clone repository and install dependencies:
```
npm install
bower install
```
To run:
Open database: `mongod`<br>
If you get an error with mongo only allowing one instance of each type, open mongo shell and drop indexes on everything except user table. eg:<br>
```
> db
database-name
> use database-name
switched to db database-name
> db.getCollectionNames()
[ "obstacles", "schedules", "users", "yards" ]
> db.obstacles.dropIndexes()
> db.schedules.dropIndexes()
> db.yards.dropIndexes()
```
Finally:
```
npm start
```

To use:
You must register a new user before you can log in.

<h2>Technologies Used</h2>
<a href="https://www.mongodb.org/">Mongo DB</a> --> Database<br>
<a href="http://expressjs.com/en/starter/installing.html">Express.js</a> --> Web Framework<br>
<a href="https://docs.angularjs.org/tutorial">Angular.js</a> --> Front-end Framework<br>
<a href="https://nodejs.org/en/docs/">Node.js</a> --> Back-end Platform<br>
<br>
<a href="http://mongoosejs.com/docs/index.html">Mongoose.js</a> --> Object Relational Mapping<br>
<a href="https://github.com/hokaccha/node-jwt-simple">JWT-Simple</a> --> Session Handling<br>
<a href="https://github.com/SeyZ/jsonapi-serializer">JSON-API Serializer</a> --> Serialization of Data<br>
<a href="https://github.com/davidwood/node-password-hash">Node Password Hash</a> --> Password Hashing<br>
<a href="http://socket.io/">Socket.io</a> --> Communication Between Application and Mower<br>
<a href="https://github.com/petkaantonov/bluebird">Bluebird</a> --> Promises<br>
<a href="https://www.npmjs.com/package/password-hash">Password-Hash</a> --> Password Hashing<br>

<h2>API</h2>
<h3>User</h3>
<h4>Register</h4>
URL: `/user/register`<br>
BODY:
```
{
  username: username,
  nickname: nickname,
  zipcode: zipcode,
  password: password
}
```

<h4>Login</h4>
URL: `/user/login`<br>
BODY:
```
{
  username: username,
  password: password
}
```

<h4>Logout</h4>
URL: `/user/logout`<br>
BODY: none<br>

<h3>Obstacles</h3>
<h4>Get</h4>
URL: `/obstacles`<br>
BODY: none
<br>

<h4>Post</h4>
URL: `/obstacles`<br>
BODY:
```
{
  name: name,
  description: description,
  length: length,
  width: width,
  units: units
}
```

<h4>Delete</h4>
URL: `/obstacles/:id`<br>
BODY: none
<br>

<h3>Yard</h3>
<h4>Get</h4>
URL: `/yard`<br>
BODY: none
<br>

<h4>Post</h4>
URL: `/yard`<br>
BODY:
```
{
  length: length,
  width: width,
  units: units,
  obstacles: obstacles
}
```

<h4>Delete</h4>
URL: `/yard/:id`<br>
BODY: none
<br>

<h3>Schedules</h3>
<h4>Get</h4>
URL: `/schedules`<br>
BODY: none
<br>

<h4>Post</h4>
URL: `/schedules`<br>
BODY:
```
{
  days: days,
  time: time
}
```

<h4>Delete</h4>
URL: `/schedules/:id`<br>
BODY: none
<br>

<h3>Forecast</h3>
<h4>Get</h4>
URL: `/forecast?longitude=longitude&latitude=latitude`<br>
BODY: none
<br>
