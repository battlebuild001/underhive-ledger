CREATE TABLE `campaign_automation_operations` (
 `id` text PRIMARY KEY NOT NULL,
 `campaign_id` text NOT NULL,
 `operation_key` text NOT NULL,
 `actor_id` text NOT NULL,
 `label` text NOT NULL,
 `payload_hash` text NOT NULL,
 `changes` text NOT NULL,
 `source_revisions` text NOT NULL,
 `campaign_revision` integer,
 `cycle` integer,
 `created_at` text NOT NULL,
 `reversed_at` text,
 `reversed_by` text,
 `reverse_revisions` text,
 FOREIGN KEY (`actor_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `campaign_automation_operation_key` ON `campaign_automation_operations` (`campaign_id`,`operation_key`);
--> statement-breakpoint
CREATE INDEX `campaign_automation_campaign_time` ON `campaign_automation_operations` (`campaign_id`,`created_at`);
--> statement-breakpoint
CREATE TABLE `campaign_automation_assertions` (
 `token` text PRIMARY KEY NOT NULL,
 `valid` integer NOT NULL CONSTRAINT `automation_guard_valid` CHECK (`valid` = 1)
);
