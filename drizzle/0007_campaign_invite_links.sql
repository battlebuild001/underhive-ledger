CREATE TABLE `campaign_invite_admissions` (
	`campaign_id` text NOT NULL,
	`user_id` text NOT NULL,
	`grant_token` text NOT NULL,
	`joined_at` text NOT NULL,
	PRIMARY KEY(`campaign_id`, `user_id`),
	FOREIGN KEY (`campaign_id`) REFERENCES `shared_campaigns`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `campaign_invite_admissions_campaign` ON `campaign_invite_admissions` (`campaign_id`);--> statement-breakpoint
ALTER TABLE `campaign_enrollments` ADD `join_mode` text DEFAULT 'request' NOT NULL;