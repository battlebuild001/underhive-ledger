CREATE TABLE `gang_alliance_operations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`gang_id` text NOT NULL,
	`operation_key` text NOT NULL,
	`payload_hash` text NOT NULL,
	`action` text NOT NULL,
	`alliance_id` text NOT NULL,
	`receipt` text NOT NULL,
	`used_by` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `gang_alliance_operation_key` ON `gang_alliance_operations` (`user_id`,`gang_id`,`operation_key`);--> statement-breakpoint
CREATE INDEX `gang_alliance_history` ON `gang_alliance_operations` (`user_id`,`gang_id`,`created_at`);