CREATE TABLE `campaign_enrollments` (
	`campaign_id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`enabled` integer DEFAULT 0 NOT NULL,
	`max_players` integer DEFAULT 12 NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`campaign_id`) REFERENCES `shared_campaigns`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `campaign_enrollments_code` ON `campaign_enrollments` (`code`);--> statement-breakpoint
CREATE TABLE `campaign_join_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`campaign_id` text NOT NULL,
	`user_id` text NOT NULL,
	`gang_id` text NOT NULL,
	`gang_name` text NOT NULL,
	`gang_snapshot` text NOT NULL,
	`source_revision` integer NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`status` text NOT NULL,
	`decision_token` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`campaign_id`) REFERENCES `shared_campaigns`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `campaign_join_requests_user` ON `campaign_join_requests` (`campaign_id`,`user_id`);--> statement-breakpoint
CREATE INDEX `campaign_join_requests_campaign` ON `campaign_join_requests` (`campaign_id`,`status`);