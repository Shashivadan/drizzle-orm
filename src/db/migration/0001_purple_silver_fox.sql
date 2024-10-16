CREATE TABLE IF NOT EXISTS "podfdfsdfsdfsdst" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"averageRating" real DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "podfdfsdfsdfsdst" ADD CONSTRAINT "podfdfsdfsdfsdst_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
