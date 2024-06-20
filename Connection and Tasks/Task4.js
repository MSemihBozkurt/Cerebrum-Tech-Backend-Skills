const app = require('./Connection');

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Task4: API call that allows us to add a new post to a specific user

rl.question("Enter UserID to add a new post: ", function(userId) {
  
    // Let's check whether the user exists or not
    app.query('SELECT * FROM User WHERE UserID = ?', [userId], (err, userResult) => {
        if (err) {
            console.error('Error checking user:', err);
            rl.close();
            app.end();
            return;
        }
  
        if (userResult.length === 0) {
            console.log(`User with ID ${userId} not found. Cannot add post.`);
            rl.close();
            app.end();
            return;
        }
  
        // If the user exist, let's get the information of the post that we will add
        rl.question("Enter post title: ", function(title) {
            rl.question("Enter post description: ", function(description) {
                const newPost = {
                    userID: userId,
                    title: title,
                    description: description,
                    created_at: new Date()
                };
  
                // Adding a new post to a specific user with an API call
                app.query('INSERT INTO Post SET ?', newPost, (err, result) => {
                    if (err) {
                        console.error('Error adding post:', err);
                        return;
                    }
  
                    console.log(`New post added for user ${userId}.`);
  
                    rl.close();
                    app.end(); 
                });
            });
        });
    });
  });