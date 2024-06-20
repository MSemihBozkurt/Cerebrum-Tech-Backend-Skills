USE blogplatform;

-- Creating User Table
CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    MiddleName VARCHAR(100) DEFAULT NULL,
    Surname VARCHAR(100) NOT NULL,
    Gender ENUM('Male', 'Female') DEFAULT NULL,
    Profession VARCHAR(100),
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Creating Post Table
CREATE TABLE Post (
    PostID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    UserID INT NOT NULL,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

-- Creating Comment Table
CREATE TABLE Comment (
    CommentID INT AUTO_INCREMENT PRIMARY KEY,
    Content TEXT NOT NULL,
    PostID INT NOT NULL,
    UserID INT NOT NULL,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Post(PostID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

-- I will insert some data to check my API calls

INSERT INTO User (FirstName, MiddleName, Surname, Gender, Profession, Email, Password)
VALUES 
('Ali', 'Can', 'Yılmaz', 'Male', 'Software Engineer', 'ali.yilmaz@example.com', 'password123'),
('Ayşe', NULL, 'Kara', 'Female', 'Data Scientist', 'ayse.kara@example.com', 'password123'),
('Mehmet', 'Ali', 'Öztürk', 'Male', 'Product Manager', 'mehmet.ozturk@example.com', 'password123'),
('Fatma', 'Nazan', 'Şahin', 'Female', 'UX Designer', 'fatma.sahin@example.com', 'password123'),
('Ahmet', NULL, 'Demir', 'Male', 'DevOps Engineer', 'ahmet.demir@example.com', 'password123');

INSERT INTO Post (Title, Description, UserID)
VALUES 
('My First Post', 'This is the description of my first post.', 1),
('Data Science Tips', 'Some useful tips for data science.', 2),
('Product Management 101', 'An introduction to product management.', 3),
('UX Design Principles', 'Core principles of UX design.', 4),
('DevOps Best Practices', 'Best practices for DevOps engineers.', 5);

INSERT INTO Comment (Content, PostID, UserID)
VALUES 
('Great post! Thanks for sharing.', 1, 2),
('Very informative. I learned a lot.', 2, 3),
('Interesting read!', 3, 4),
('Thanks for the tips!', 4, 5),
('Very helpful. Keep it up!', 5, 1),
('I have a question about this topic.', 1, 3),
('Could you elaborate more on this?', 2, 4),
('Nice work!', 3, 5),
('Helpful insights.', 4, 1),
('I agree with your points.', 5, 2);
