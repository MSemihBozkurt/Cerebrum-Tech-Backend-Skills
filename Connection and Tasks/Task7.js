const app = require('./Connection');

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Task7: API call that allows updating the information of a specific user.

rl.question("Enter UserID to update: ", function(userId) {
    // To check if the user exist or not
    app.query('SELECT * FROM User WHERE UserID = ?', [userId], (err, userResult) => {
        if (err) {
            console.error('Error checking user:', err);
            rl.close();
            app.end();
            return;
        }
  
        if (userResult.length === 0) {
            console.log(`User with ID ${userId} not found. Cannot update.`);
            rl.close();
            app.end();
            return;
        }
  
        // if the user exist, ask which information do you want to update
        // Also we can just change profession,email,password
  
        rl.question("What do you want to update? (profession/email/password): ", function(updateFields) {
            const fieldsToUpdate = updateFields.split('/');
            const updatedUser = {};
  
            const getUserInput = (index) => {
                if (index >= fieldsToUpdate.length) {
                    // user information update
                    app.query('UPDATE User SET ? WHERE UserID = ?', [updatedUser, userId], (err, result) => {
                        if (err) {
                            console.error('Error updating user:', err);
                            rl.close();
                            app.end();
                            return;
                        }
  
                        console.log(`User with ID ${userId} has been updated.`);
                        rl.close();
                        app.end(); 
                    });
                    return;
                }
  
                const field = fieldsToUpdate[index].trim();
                rl.question(`Enter new ${field}: `, function(value) {
                    updatedUser[field] = value;
                    getUserInput(index + 1);
                });
            };
  
            getUserInput(0);
        });
    });
  });