const app = require('./Connection');

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Task1: API call which lists all users in database

app.query('SELECT * FROM User', (err, result, fields) => {
    if (err) {
        console.error('Error fetching users:', err);
        rl.close();
        app.end();
        return;
    }
    console.log('Users:', result);
  
    rl.close();
    app.end();
  });