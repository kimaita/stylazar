CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    bio VARCHAR,
    social_links JSONB,
    avatar_links JSONB,
    password VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    interests TEXT []
);
CREATE TABLE IF NOT EXISTS visitors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(15) UNIQUE NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS user_ips (
    user_id UUID REFERENCES users,
    visitor_id UUID REFERENCES visitors,
    PRIMARY KEY(user_id, visitor_id)
);
CREATE TYPE http_method AS ENUM('DELETE', 'GET', 'PATCH', 'POST', 'PUT');
CREATE TABLE IF NOT EXISTS session_activity (
    ip_address VARCHAR(15),
    requested_at TIMESTAMPTZ NOT NULL,
    route VARCHAR NOT NULL,
    method HTTP_METHOD NOT NULL,
    response_code INT,
    completed_at TIMESTAMPTZ,
    PRIMARY KEY (ip_address, requested_at)
);
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    mongo_id VARCHAR NOT NULL UNIQUE,
    title VARCHAR(128) NOT NULL,
    slug VARCHAR(256) UNIQUE NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(80),
    description VARCHAR(300),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS post_category (
    post_id UUID REFERENCES posts,
    category_id UUID REFERENCES categories
);
CREATE TABLE IF NOT EXISTS comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users,
    post_id UUID REFERENCES posts,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    body VARCHAR NOT NULL
);
CREATE TABLE IF NOT EXISTS post_reaction (
    post_id UUID REFERENCES posts,
    user_id UUID REFERENCES users,
    upvoted BOOLEAN DEFAULT TRUE,
    -- like vs dislike
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(post_id, user_id)
);