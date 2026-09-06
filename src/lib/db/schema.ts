import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

/**
 * Full lifecycle from the supplier registration architecture, not a
 * boolean. Only draft -> submitted is exercised by this increment (see
 * src/lib/supplier/lifecycle.ts); the rest exists so a future staff
 * qualification surface has a schema to work against without a migration.
 */
export const supplierStatusEnum = pgEnum("supplier_status", [
  "draft",
  "submitted",
  "under_review",
  "more_information_required",
  "sample_required",
  "qualification",
  "approved",
  "rejected",
  "active",
  "suspended",
  "offboarded",
])

/** Shared by capabilities and certifications: declared != verified. */
export const verificationStatusEnum = pgEnum("verification_status", [
  "declared",
  "verified",
  "rejected",
])

export const supplierOrganisations = pgTable("supplier_organisations", {
  id: uuid("id").primaryKey().defaultRandom(),
  /**
   * The Medusa customer who applied — the shared identity across buyer and
   * supplier relationships (see docs/adr/0006). One application per
   * customer in this increment; multi-user organisation membership is
   * future scope, tracked via supplierContacts in the meantime.
   */
  medusaCustomerId: text("medusa_customer_id").notNull().unique(),
  legalName: text("legal_name").notNull(),
  registrationNumber: text("registration_number"),
  taxIdentifier: text("tax_identifier"),
  /** ISO 3166-1 alpha-2. */
  countryCode: text("country_code").notNull(),
  status: supplierStatusEnum("status").notNull().default("draft"),
  /**
   * Reserved for reconciliation once Control Plane implements a canonical
   * Organisation/Mapping model (it does not yet — see docs/adr/0006).
   * Never populated by this increment's code.
   */
  canonicalOrganisationId: text("canonical_organisation_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }),
})

export const supplierContacts = pgTable("supplier_contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  supplierOrganisationId: uuid("supplier_organisation_id")
    .notNull()
    .references(() => supplierOrganisations.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const supplierCapabilities = pgTable("supplier_capabilities", {
  id: uuid("id").primaryKey().defaultRandom(),
  supplierOrganisationId: uuid("supplier_organisation_id")
    .notNull()
    .references(() => supplierOrganisations.id, { onDelete: "cascade" }),
  /** Key from src/lib/supplier/categories.ts — extensible without a migration. */
  productCategory: text("product_category").notNull(),
  variety: text("variety"),
  grade: text("grade"),
  /** ISO 3166-1 alpha-2. */
  originCountryCode: text("origin_country_code"),
  capacityDescription: text("capacity_description"),
  season: text("season"),
  leadTimeDays: integer("lead_time_days"),
  verificationStatus: verificationStatusEnum("verification_status").notNull().default("declared"),
  declaredAt: timestamp("declared_at", { withTimezone: true }).notNull().defaultNow(),
  verifiedAt: timestamp("verified_at", { withTimezone: true }),
  verifiedBy: text("verified_by"),
})

export const supplierCertifications = pgTable("supplier_certifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  supplierOrganisationId: uuid("supplier_organisation_id")
    .notNull()
    .references(() => supplierOrganisations.id, { onDelete: "cascade" }),
  certificationType: text("certification_type").notNull(),
  issuer: text("issuer"),
  referenceNumber: text("reference_number"),
  issuedOn: text("issued_on"),
  expiresOn: text("expires_on"),
  verificationStatus: verificationStatusEnum("verification_status").notNull().default("declared"),
  declaredAt: timestamp("declared_at", { withTimezone: true }).notNull().defaultNow(),
  verifiedAt: timestamp("verified_at", { withTimezone: true }),
  verifiedBy: text("verified_by"),
})

/** Auditable history of every status change — see docs/adr/0006. */
export const supplierStatusEvents = pgTable("supplier_status_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  supplierOrganisationId: uuid("supplier_organisation_id")
    .notNull()
    .references(() => supplierOrganisations.id, { onDelete: "cascade" }),
  fromStatus: supplierStatusEnum("from_status"),
  toStatus: supplierStatusEnum("to_status").notNull(),
  /** e.g. "customer:cus_123" or "system" — never a bare name with no origin. */
  actor: text("actor").notNull(),
  reason: text("reason"),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull().defaultNow(),
})
