import { describe, expect, it } from "vitest"
import { buildSupplierApplicationInput } from "./supplier-application-form"

const baseFields: Record<string, string> = {
  legalName: "Okafor Roasters Ltd",
  countryCode: "ug",
  contactName: "Amara Okafor",
  contactEmail: "amara@okafor-roasters.example",
  contactRole: "Sales",
}

const formDataWith = (fields: Record<string, string>, repeated: Record<string, string[]>) => {
  const formData = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value)
  }
  for (const [key, values] of Object.entries(repeated)) {
    for (const value of values) {
      formData.append(key, value)
    }
  }
  return formData
}

describe("buildSupplierApplicationInput", () => {
  it("zips one populated capability row into a single capability", () => {
    const formData = formDataWith(baseFields, {
      capability_category: ["coffee"],
      capability_variety: ["Arabica"],
      capability_grade: ["AA"],
      capability_origin_country: [""],
      capability_capacity: [""],
      capability_season: [""],
      capability_lead_time_days: ["30"],
    })
    const input = buildSupplierApplicationInput(formData)
    expect(input.capabilities).toEqual([
      {
        category: "coffee",
        variety: "Arabica",
        grade: "AA",
        originCountryCode: undefined,
        capacityDescription: undefined,
        season: undefined,
        leadTimeDays: 30,
      },
    ])
  })

  it("drops empty optional capability slots (blank category)", () => {
    const formData = formDataWith(baseFields, {
      capability_category: ["coffee", ""],
      capability_variety: ["Arabica", ""],
      capability_grade: ["AA", ""],
      capability_origin_country: ["", ""],
      capability_capacity: ["", ""],
      capability_season: ["", ""],
      capability_lead_time_days: ["", ""],
    })
    const input = buildSupplierApplicationInput(formData)
    expect(input.capabilities).toHaveLength(1)
  })

  it("drops empty optional certification slots", () => {
    const formData = formDataWith(baseFields, {
      capability_category: ["coffee"],
      capability_variety: [""],
      capability_grade: [""],
      capability_origin_country: [""],
      capability_capacity: [""],
      capability_season: [""],
      capability_lead_time_days: [""],
      certification_type: ["Organic", ""],
      certification_issuer: ["EU", ""],
      certification_reference: ["", ""],
      certification_issued_on: ["", ""],
      certification_expires_on: ["", ""],
    })
    const input = buildSupplierApplicationInput(formData)
    expect(input.certifications).toEqual([
      {
        certificationType: "Organic",
        issuer: "EU",
        referenceNumber: undefined,
        issuedOn: undefined,
        expiresOn: undefined,
      },
    ])
  })

  it("treats a non-numeric lead time as undefined rather than NaN", () => {
    const formData = formDataWith(baseFields, {
      capability_category: ["coffee"],
      capability_variety: [""],
      capability_grade: [""],
      capability_origin_country: [""],
      capability_capacity: [""],
      capability_season: [""],
      capability_lead_time_days: ["not-a-number"],
    })
    const input = buildSupplierApplicationInput(formData)
    const capabilities = input.capabilities as Array<{ leadTimeDays?: number }>
    expect(Number.isNaN(capabilities[0].leadTimeDays)).toBe(true)
  })
})
