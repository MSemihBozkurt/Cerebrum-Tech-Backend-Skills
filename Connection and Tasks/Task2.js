const app = require('./Connection');

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Task2: API call that lists all the posts of a specific user

rl.question("Enter UserID to fetch posts: ", function(userId) {
    app.query('SELECT * FROM User WHERE UserID = ?', [userId], (err, userResult) => {
      if (err) {
        console.error('Error fetching user:', err);
        rl.close();
        app.end();
        return;
      }
  
      if (userResult.length === 0) {
        console.log(`User with ID ${userId} does not exist.`);
        rl.close();
        app.end();
        return;
      }
  
      app.query('SELECT * FROM Post WHERE UserID = ?', [userId], (err, postResult) => {
        if (err) {
          console.error('Error fetching posts:', err);
          rl.close();
          app.end();
          return;
        }
  
        if (postResult.length === 0) {
          console.log(`The user whose ID number is ${userId} has no posts.`);
        } else {
          console.log(`Posts of user ${userId}:`, postResult);
        }
  
        rl.close();
        app.end();
      });
    });
  });
  