CREATE TABLE `campaign_deletions` (
	`campaign_id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`delete_token` text NOT NULL,
	`deleted_at` text NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `campaign_deletions_owner` ON `campaign_deletions` (`owner_id`);
