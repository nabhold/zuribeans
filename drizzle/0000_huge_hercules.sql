CREATE TYPE "public"."supplier_status" AS ENUM('draft', 'submitted', 'under_review', 'more_information_required', 'sample_required', 'qualification', 'approved', 'rejected', 'active', 'suspended', 'offboarded');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('declared', 'verified', 'rejected');--> statement-breakpoint
CREATE TABLE "supplier_capabilities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"supplier_organisation_id" uuid NOT NULL,
	"product_category" text NOT NULL,
	"variety" text,
	"grade" text,
	"origin_country_code" text,
	"capacity_description" text,
	"season" text,
	"lead_time_days" integer,
	"verification_status" "verification_status" DEFAULT 'declared' NOT NULL,
	"declared_at" timestamp with time zone DEFAULT now() NOT NULL,
	"verified_at" timestamp with time zone,
	"verified_by" text
);
--> statement-breakpoint
CREATE TABLE "supplier_certifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"supplier_organisation_id" uuid NOT NULL,
	"certification_type" text NOT NULL,
	"issuer" text,
	"reference_number" text,
	"issued_on" text,
	"expires_on" text,
	"verification_status" "verification_status" DEFAULT 'declared' NOT NULL,
	"declared_at" timestamp with time zone DEFAULT now() NOT NULL,
	"verified_at" timestamp with time zone,
	"verified_by" text
);
--> statement-breakpoint
CREATE TABLE "supplier_contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"supplier_organisation_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" text NOT NULL,
	"phone" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "supplier_organisations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"medusa_customer_id" text NOT NULL,
	"legal_name" text NOT NULL,
	"registration_number" text,
	"tax_identifier" text,
	"country_code" text NOT NULL,
	"status" "supplier_status" DEFAULT 'draft' NOT NULL,
	"canonical_organisation_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"submitted_at" timestamp with time zone,
	CONSTRAINT "supplier_organisations_medusa_customer_id_unique" UNIQUE("medusa_customer_id")
);
--> statement-breakpoint
CREATE TABLE "supplier_status_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"supplier_organisation_id" uuid NOT NULL,
	"from_status" "supplier_status",
	"to_status" "supplier_status" NOT NULL,
	"actor" text NOT NULL,
	"reason" text,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "supplier_capabilities" ADD CONSTRAINT "supplier_capabilities_supplier_organisation_id_supplier_organisations_id_fk" FOREIGN KEY ("supplier_organisation_id") REFERENCES "public"."supplier_organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplier_certifications" ADD CONSTRAINT "supplier_certifications_supplier_organisation_id_supplier_organisations_id_fk" FOREIGN KEY ("supplier_organisation_id") REFERENCES "public"."supplier_organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplier_contacts" ADD CONSTRAINT "supplier_contacts_supplier_organisation_id_supplier_organisations_id_fk" FOREIGN KEY ("supplier_organisation_id") REFERENCES "public"."supplier_organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplier_status_events" ADD CONSTRAINT "supplier_status_events_supplier_organisation_id_supplier_organisations_id_fk" FOREIGN KEY ("supplier_organisation_id") REFERENCES "public"."supplier_organisations"("id") ON DELETE cascade ON UPDATE no action;