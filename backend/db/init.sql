CREATE TABLE IF NOT EXISTS users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    bio VARCHAR,
    social_links JSONB,
    picture_url VARCHAR,
    password VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    interests TEXT []
);
CREATE TABLE IF NOT EXISTS visitors (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(15) UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS user_ips (
    user_id uuid REFERENCES users,
    visitor_id uuid REFERENCES visitors,
    PRIMARY KEY(user_id, visitor_id)
);
CREATE TABLE IF NOT EXISTS sessions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    visitor_id uuid REFERENCES visitors,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    destroyed_at TIMESTAMPTZ
);
CREATE TYPE http_method AS ENUM('DELETE', 'GET', 'POST', 'PUT');
CREATE TABLE IF NOT EXISTS session_activity (
    session_id uuid REFERENCES sessions(id),
    performed_at TIMESTAMPTZ NOT NULL,
    route VARCHAR NOT NULL,
    method HTTP_METHOD NOT NULL,
    PRIMARY KEY (session_id, performed_at)
);