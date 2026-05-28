CREATE TYPE "public"."document_type" AS ENUM('cpf');--> statement-breakpoint
CREATE TYPE "public"."sex" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TABLE "athletes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"birth_date" date NOT NULL,
	"sex" "sex" NOT NULL,
	"document_type" "document_type" NOT NULL,
	"document_value" varchar(30) NOT NULL,
	"photo_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "athletes_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "athletes_document_type_document_value_unique" UNIQUE("document_type","document_value")
);
--> statement-breakpoint
ALTER TABLE "athletes" ADD CONSTRAINT "athletes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;