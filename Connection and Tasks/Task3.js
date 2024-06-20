const app = require('./Connection');

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Task3: API call that lists all the comments on a specific post.

rl.question("Enter PostID to fetch comments: ", function(postId) {

    app.query('SELECT * FROM Comment WHERE PostID = ?', [postId], (err, result, fields) => {
        if (err) {
            console.error('Error fetching comments:', err);
            return;
        }
  
        if (result.length === 0) {
            console.log(`The post with ID number ${postId} has no comments.`);
        } else {
            console.log(`Comments on post ${postId}:`, result);
        }
  
        rl.close();
        app.end(); 
    });
  });
  