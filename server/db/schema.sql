DROP TABLE IF EXISTS users;
CREATE TABLE users (user_id SERIAL PRIMARY KEY, name varchar(255), password varchar(255), email varchar(255), CONSTRAINT unique_user_name UNIQUE name, CONSTRAINT unique_user_email UNIQUE email);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (post_id SERIAL PRIMARY KEY, author INT references users(user_id) ON UPDATE CASCADE ON DELETE CASCADE, created DATE, content TEXT);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (comment_id SERIAL PRIMARY KEY, author INT references users(user_id) ON UPDATE CASCADE ON DELETE CASCADE, post INT references posts(post_id) ON UPDATE CASCADE ON DELETE CASCADE, created DATE, content TEXT);

DROP TABLE IF EXISTS tags;
CREATE TABLE tags (tag_id SERIAL PRIMARY KEY, name varchar(255));

DROP TABLE IF EXISTS posts_tags;
CREATE TABLE posts_tags (posts_tags_id SERIAL PRIMARY KEY, post INT references posts(post_id) ON UPDATE CASCADE ON DELETE CASCADE, tag INT references tags(tag_id) ON UPDATE CASCADE ON DELETE CASCADE);