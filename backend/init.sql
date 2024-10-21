CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    bio VARCHAR,
    social_links JSONB,
    picture_url VARCHAR,
    password VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    interests TEXT []
);
CREATE TABLE IF NOT EXISTS visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(15) UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS user_ips (
    user_id UUID REFERENCES users,
    visit_id UUID REFERENCES visits,
    PRIMARY KEY(user_id, visitor_id)
);
CREATE TABLE IF NOT EXISTS sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    visit_id UUID REFERENCES visits,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    destroyed_at TIMESTAMPTZ
);
CREATE TYPE http_method AS ENUM('DELETE', 'GET', 'POST', 'PUT');
CREATE TABLE IF NOT EXISTS session_activity (
    session_id UUID REFERENCES sessions(id),
    performed_at TIMESTAMPTZ NOT NULL,
    route VARCHAR NOT NULL,
    method HTTP_METHOD NOT NULL,
    PRIMARY KEY (session_id, performed_at)
);
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    mongo_id VARCHAR NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    display_excerpt VARCHAR(300),
    is_public BOOLEAN DEFAULT TRUE,
    is_published BOOLEAN DEFAULT TRUE
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
    body VARCHAR NOT NULL
);