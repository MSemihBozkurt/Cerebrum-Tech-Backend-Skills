const app = require('./Connection');

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Task6: API call that allows you to delete a specific post

rl.question("Enter PostID to delete: ", function(postId) {
    // To check if the post exist or not
    app.query('SELECT * FROM Post WHERE PostID = ?', [postId], (err, postResult) => {
        if (err) {
            console.error('Error checking post:', err);
            rl.close();
            app.end();
            return;
        }
  
        if (postResult.length === 0) {
            console.log(`Post with ID ${postId} not found. Cannot delete.`);
            rl.close();
            app.end();
            return;
        }
  
        // if the post exist delete it with API call
        app.query('DELETE FROM Post WHERE PostID = ?', [postId], (err, deleteResult) => {
            if (err) {
                console.error('Error deleting post:', err);
                rl.close();
                app.end();
                return;
            }
  
            console.log(`Post with ID ${postId} has been deleted.`);
  
            rl.close();
            app.end(); 
        });
    });
  });