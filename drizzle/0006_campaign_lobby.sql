CREATE TABLE `campaign_lobby_operations` (
	`room_id` text NOT NULL,
	`actor_id` text NOT NULL,
	`operation_key` text NOT NULL,
	`payload_hash` text NOT NULL,
	`created_at` text NOT NULL,
	PRIMARY KEY(`room_id`, `actor_id`, `operation_key`),
	FOREIGN KEY (`room_id`) REFERENCES `campaign_lobby_rooms`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `campaign_lobby_presence` (
	`room_id` text NOT NULL,
	`user_id` text NOT NULL,
	`last_seen_at` text NOT NULL,
	PRIMARY KEY(`room_id`, `user_id`),
	FOREIGN KEY (`room_id`) REFERENCES `campaign_lobby_rooms`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `campaign_lobby_rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`campaign_id` text NOT NULL,
	`host_id` text NOT NULL,
	`guest_id` text NOT NULL,
	`operation_key` text NOT NULL,
	`request_hash` text NOT NULL,
	`pair_key` text NOT NULL,
	`status` text NOT NULL,
	`state` text NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL,
	`mutation_token` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`campaign_id`) REFERENCES `shared_campaigns`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`host_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`guest_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `campaign_lobby_create_key` ON `campaign_lobby_rooms` (`campaign_id`,`host_id`,`operation_key`);--> statement-breakpoint
CREATE INDEX `campaign_lobby_campaign_time` ON `campaign_lobby_rooms` (`campaign_id`,`updated_at`);--> statement-breakpoint
CREATE TABLE `campaign_lobby_seats` (
	`campaign_id` text NOT NULL,
	`user_id` text NOT NULL,
	`room_id` text NOT NULL,
	PRIMARY KEY(`campaign_id`, `user_id`),
	FOREIGN KEY (`room_id`) REFERENCES `campaign_lobby_rooms`(`id`) ON UPDATE no action ON DELETE cascade
);
