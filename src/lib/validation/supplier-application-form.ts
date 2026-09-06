/**
 * Shapes the fixed-slot repeated fieldsets (capability_*, certification_*)
 * into arrays before zod validation. Kept separate from the zod schema and
 * from the Server Action so both the shaping and the validation rules are
 * independently testable.
 */
const toOptional = (value: string | undefined): string | undefined =>
  value && value.trim().length > 0 ? value : undefined

const toOptionalInt = (value: string | undefined): number | undefined => {
  const trimmed = value?.trim()
  if (!trimmed) return undefined
  return Number(trimmed)
}

export const buildSupplierApplicationInput = (formData: FormData): Record<string, unknown> => {
  const get = (name: string) => formData.get(name)?.toString() ?? ""
  const getAll = (name: string) => formData.getAll(name).map((value) => value.toString())

  const categories = getAll("capability_category")
  const capabilities = categories
    .map((category, index) => ({
      category,
      variety: toOptional(getAll("capability_variety")[index]),
      grade: toOptional(getAll("capability_grade")[index]),
      originCountryCode: toOptional(getAll("capability_origin_country")[index]),
      capacityDescription: toOptional(getAll("capability_capacity")[index]),
      season: toOptional(getAll("capability_season")[index]),
      leadTimeDays: toOptionalInt(getAll("capability_lead_time_days")[index]),
    }))
    .filter((capability) => capability.category.trim().length > 0)

  const certificationTypes = getAll("certification_type")
  const certifications = certificationTypes
    .map((certificationType, index) => ({
      certificationType,
      issuer: toOptional(getAll("certification_issuer")[index]),
      referenceNumber: toOptional(getAll("certification_reference")[index]),
      issuedOn: toOptional(getAll("certification_issued_on")[index]),
      expiresOn: toOptional(getAll("certification_expires_on")[index]),
    }))
    .filter((certification) => certification.certificationType.trim().length > 0)

  return {
    legalName: get("legalName"),
    registrationNumber: toOptional(get("registrationNumber")),
    taxIdentifier: toOptional(get("taxIdentifier")),
    countryCode: get("countryCode"),
    contactName: get("contactName"),
    contactEmail: get("contactEmail"),
    contactRole: get("contactRole"),
    contactPhone: toOptional(get("contactPhone")),
    capabilities,
    certifications,
  }
}
