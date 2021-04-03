CREATE TABLE Users(
    user_id SERIAL PRIMARY KEY,
	username VARCHAR(30) NOT NULL, 
	password VARCHAR NOT NULL
);

CREATE TABLE Post(
	post_id SERIAL PRIMARY KEY,
	author INT references users(user_id),
	title VARCHAR(50) NOT NULL,
	content VARCHAR NOT NULL,
	vote INT NOT NULL,
	createDate TIMESTAMP DEFAULT NOW(),
	modifyDate TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Comment(
	comment_id SERIAL PRIMARY KEY,
	author INT references users(user_id),
	content VARCHAR NOT NULL,
	vote INT NOT NULL,
	createDate TIMESTAMP DEFAULT NOW(),
	modifyDate TIMESTAMP DEFAULT NOW()
);

CREATE TABLE PostComment(
	post_id INT references Post(post_id),
	comment_id INT references Comment(comment_id)
);