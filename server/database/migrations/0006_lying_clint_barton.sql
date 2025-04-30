ALTER TABLE `messages` ADD `author_id` integer REFERENCES users(id);--> statement-breakpoint
ALTER TABLE `messages` ADD `board_id` integer REFERENCES boards(id);--> statement-breakpoint
ALTER TABLE `boards` ADD `author_id` integer REFERENCES users(id);