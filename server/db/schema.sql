DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name varchar(255) CONSTRAINT user_name_unique UNIQUE,
  password varchar(255),
  email varchar(255) CONSTRAINT user_email_unique UNIQUE
);

DROP TABLE IF EXISTS posts CASCADE;
CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  author INT references users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
  created DATE,
  title varchar(255),
  content TEXT,
  likes INT DEFAULT 0
);

DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY, 
  author INT references users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
  post INT references posts(post_id) ON UPDATE CASCADE ON DELETE CASCADE,
  parent INT references comments(comment_id) DEFAULT NULL,
  created DATE,
  content TEXT
);

DROP TABLE IF EXISTS tags CASCADE;
CREATE TABLE tags (
  tag_id SERIAL PRIMARY KEY,
  name varchar(255)
);

DROP TABLE IF EXISTS posts_tags CASCADE;
CREATE TABLE posts_tags (
  posts_tags_id SERIAL PRIMARY KEY,
  post INT references posts(post_id) ON UPDATE CASCADE ON DELETE CASCADE,
  tag INT references tags(tag_id) ON UPDATE CASCADE ON DELETE CASCADE
);