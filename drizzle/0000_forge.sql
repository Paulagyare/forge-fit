CREATE TABLE profiles (user_id TEXT PRIMARY KEY NOT NULL, display_name TEXT NOT NULL DEFAULT 'Athlete', bio TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL);
--> statement-breakpoint
CREATE TABLE user_state (user_id TEXT PRIMARY KEY NOT NULL, data TEXT NOT NULL, updated_at TEXT NOT NULL);
--> statement-breakpoint
CREATE TABLE posts (id TEXT PRIMARY KEY NOT NULL, user_id TEXT NOT NULL, kind TEXT NOT NULL, body TEXT NOT NULL, video_url TEXT NOT NULL DEFAULT '', routine TEXT, created_at TEXT NOT NULL);
--> statement-breakpoint
CREATE INDEX posts_created ON posts(created_at);
--> statement-breakpoint
CREATE TABLE reactions (post_id TEXT NOT NULL, user_id TEXT NOT NULL, PRIMARY KEY(post_id,user_id));
--> statement-breakpoint
CREATE TABLE comments (id TEXT PRIMARY KEY NOT NULL, post_id TEXT NOT NULL, user_id TEXT NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL);
--> statement-breakpoint
CREATE TABLE reports (id TEXT PRIMARY KEY NOT NULL, post_id TEXT NOT NULL, user_id TEXT NOT NULL, reason TEXT NOT NULL, created_at TEXT NOT NULL);
--> statement-breakpoint
CREATE TABLE blocks (user_id TEXT NOT NULL, blocked_id TEXT NOT NULL, PRIMARY KEY(user_id,blocked_id));
