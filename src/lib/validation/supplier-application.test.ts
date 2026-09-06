import { describe, expect, it } from "vitest"
import { supplierApplicationSchema } from "./supplier-application"

const validInput = {
  legalName: "Okafor Roasters Ltd",
  registrationNumber: "UG-12345",
  taxIdentifier: "TIN-9876",
  countryCode: "ug",
  contactName: "Amara Okafor",
  contactEmail: "amara@okafor-roasters.example",
  contactRole: "Sales",
  contactPhone: "+256700000000",
  capabilities: [
    {
      category: "coffee",
      variety: "Arabica",
      grade: "AA",
      originCountryCode: "UG",
      capacityDescription: "50 tonnes/year",
      season: "October-February",
      leadTimeDays: 30,
    },
  ],
  certifications: [{ certificationType: "Organic", issuer: "EU", referenceNumber: "ORG-1" }],
}

describe("supplierApplicationSchema", () => {
  it("accepts a complete, valid application", () => {
    const result = supplierApplicationSchema.safeParse(validInput)
    expect(result.success).toBe(true)
  })

  it("uppercases the country code", () => {
    const result = supplierApplicationSchema.safeParse(validInput)
    expect(result.success && result.data.countryCode).toBe("UG")
  })

  it("requires at least one capability", () => {
    const result = supplierApplicationSchema.safeParse({ ...validInput, capabilities: [] })
    expect(result.success).toBe(false)
  })

  it("rejects an unknown product category", () => {
    const result = supplierApplicationSchema.safeParse({
      ...validInput,
      capabilities: [{ ...validInput.capabilities[0], category: "not-a-category" }],
    })
    expect(result.success).toBe(false)
  })

  it("rejects a malformed contact email", () => {
    const result = supplierApplicationSchema.safeParse({ ...validInput, contactEmail: "wrong" })
    expect(result.success).toBe(false)
  })

  it("defaults certifications to an empty list when omitted", () => {
    const withoutCertifications: Partial<typeof validInput> = { ...validInput }
    delete withoutCertifications.certifications
    const result = supplierApplicationSchema.safeParse(withoutCertifications)
    expect(result.success && result.data.certifications).toEqual([])
  })

  it("rejects a negative lead time", () => {
    const result = supplierApplicationSchema.safeParse({
      ...validInput,
      capabilities: [{ ...validInput.capabilities[0], leadTimeDays: -5 }],
    })
    expect(result.success).toBe(false)
  })
})
