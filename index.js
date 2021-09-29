const http = require('http');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

var db, collection;
client.connect()
    .then(() => {
        console.log('Database connected successfully');
        db = client.db('Task1');
        collection = db.collection('users');
    })
    .catch(err => console.log('Cannot connect to database. Error: ', err));


const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    let hashed_password = await bcrypt.hash(password, salt);
    console.log(hashed_password);
    return hashed_password;
}

http.createServer(async (req, res) => {
    const url = req.url;
    if(url == '/register')
    {
        let username, password;
        try {
            const buffers = [];
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            const data = Buffer.concat(buffers).toString();
            username = JSON.parse(data).username;
            password = JSON.parse(data).password;
            const docs = await collection.find({"username": username}).toArray();
            let flag = 0;
            docs.forEach(item => {
                if(item.username === username && !flag)
                {
                    console.log('Username already exists');
                    res.write('Username already exists');
                    res.end();
                    flag++;
                }
            });
            if(!flag)
            { 
                let hashed_password = await encryptPassword(password);
                await collection.insertOne({"username": username,"password": hashed_password});
                res.write('Registered successfully');
                res.end(); 
            }           
        } catch (err) {
            res.write('User registration failed');
            console.log(err);
        }
    }
    else if(url == '/login')
    {
        let username, password;
        try {
            const buffers = [];
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            const data = Buffer.concat(buffers).toString();
            username = JSON.parse(data).username;
            password = JSON.parse(data).password;
            const docs = await collection.find({"username": username}).toArray();
            let flag = 0;
            docs.forEach(user => {
                if(user.username === username && !flag)
                {
                    if(bcrypt.compare(password, user.password))
                    {
                        flag++;
                        res.write('User logged in successfully');
                        res.end();
                    }
                }
            });
            if(!flag)
            {
                res.write('Invalid username or password. Please try again!');
                res.end(); 
            }           
        } catch (err) {
            res.write('User login failed');
            res.end();
            console.log(err);
        }
    }
}).listen(3000);
