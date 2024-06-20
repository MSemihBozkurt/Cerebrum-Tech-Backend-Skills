const app = require('./Connection');

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Task5: API call that allows you to add comments to a specific post.

rl.question("Enter PostID to add a comment: ", function(postId) {
    // To check if the post exist or not
    app.query('SELECT * FROM Post WHERE PostID = ?', [postId], (err, postResult) => {
        if (err) {
            console.error('Error checking post:', err);
            rl.close();
            app.end();
            return;
        }
  
        if (postResult.length === 0) {
            console.log(`Post with ID ${postId} not found. Cannot add comment.`);
            rl.close();
            app.end();
            return;
        }
  
        // İf the post exist, take UserID who is commenting
        rl.question("Enter UserID who is commenting: ", function(userId) {
            // To check the commenting people is exist or not 
            app.query('SELECT * FROM User WHERE UserID = ?', [userId], (err, userResult) => {
                if (err) {
                    console.error('Error checking user:', err);
                    rl.close();
                    app.end();
                    return;
                }
  
                if (userResult.length === 0) {
                    console.log(`User with ID ${userId} not found. Cannot add comment.`);
                    rl.close();
                    app.end();
                    return;
                }
  
                rl.question("Enter comment content: ", function(content) {
                    const newComment = {
                        postID: postId,
                        userID: userId,
                        content: content,
                        created_at: new Date()
                    };
  
                    // API call to add comment to a specific post
                    app.query('INSERT INTO Comment SET ?', newComment, (err, result) => {
                        if (err) {
                            console.error('Error adding comment:', err);
                            return;
                        }
  
                        console.log(`New comment added to post ${postId} by user ${userId}.`);
  
                        rl.close();
                        app.end(); 
                    });
                });
            });
        });
    });
  });