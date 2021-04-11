
CREATE TABLE Users(
    user_id SERIAL PRIMARY KEY,
	username VARCHAR(30) UNIQUE NOT NULL, 
	password VARCHAR NOT NULL
);

CREATE TABLE Post(
	post_id SERIAL PRIMARY KEY,
	user_id INT references users(user_id) NOT NULL,
	title VARCHAR(50) NOT NULL,
	content VARCHAR NOT NULL,
	createDate TIMESTAMP DEFAULT NOW(),
	modifyDate TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Comment(
	comment_id SERIAL PRIMARY KEY,
	user_id INT references users(user_id) NOT NULL,
	content VARCHAR NOT NULL,
	createDate TIMESTAMP DEFAULT NOW(),
	modifyDate TIMESTAMP DEFAULT NOW()
);

CREATE TABLE PostComment(
	post_id INT references Post(post_id),
	comment_id INT references Comment(comment_id)
);

CREATE TABLE API(
	API_id SERIAL PRIMARY KEY,
	method VARCHAR NOT NULL,
	endpoint VARCHAR NOT NULL,
	request INT NOT NULL
);