import { z } from "zod"
import { isSupplierCapabilityCategory } from "@/lib/supplier/categories"

export const supplierCapabilityInputSchema = z.object({
  category: z.string().refine(isSupplierCapabilityCategory, "Select a valid product category."),
  variety: z.string().optional(),
  grade: z.string().optional(),
  originCountryCode: z.string().optional(),
  capacityDescription: z.string().optional(),
  season: z.string().optional(),
  leadTimeDays: z.number().int().nonnegative().optional(),
})

export const supplierCertificationInputSchema = z.object({
  certificationType: z.string().min(1, "Enter a certification type."),
  issuer: z.string().optional(),
  referenceNumber: z.string().optional(),
  issuedOn: z.string().optional(),
  expiresOn: z.string().optional(),
})

export const supplierApplicationSchema = z.object({
  legalName: z.string().min(1, "Enter your organisation's legal name."),
  registrationNumber: z.string().optional(),
  taxIdentifier: z.string().optional(),
  countryCode: z
    .string()
    .length(2, "Use a two-letter country code.")
    .transform((value) => value.toUpperCase()),
  contactName: z.string().min(1, "Enter a primary contact name."),
  contactEmail: z.string().email("Enter a valid contact email."),
  contactRole: z.string().min(1, "Enter the contact's role."),
  contactPhone: z.string().optional(),
  capabilities: z
    .array(supplierCapabilityInputSchema)
    .min(1, "Declare at least one product you can supply."),
  certifications: z.array(supplierCertificationInputSchema).default([]),
})

export type SupplierApplicationInput = z.infer<typeof supplierApplicationSchema>
