<p>This repository has 2 API one for Login and another for register</p>
<p>Used database: MongoDB</p>
<p>Used packages(or libraries): bcrypt- for hashing password, mongodb- for connecting to the database</p>
<p>Databse Name: Task1</p>
<p>Collection Name: users</p>
<ul>
    <li>
        <h3>1.Login API</h3>
        <p>API Endpoint: '/login'</p>
        <p>This API accepts a JSON object consisting username and password. Using the username provided , it searches for the username in database documents. If a documents matches the query, it compares the encrypted password in the database and the password provided using a node.js package named bcrypt. If the password matches, login is successful</p>
    </li>
    <li>
        <h3>2.Register API</h3>
        <p>API Endpoint: '/register'</p>
        <p>This API accepts a JSON object consisting username and password. First, it checks if the already the username exists in the database or not. Then if not registered, it inserts a document to the database collection with the username and the hashed password. Password hashing is done by bcrypt package which uses Blowfish algorithm</p>
    </li>
</ul>