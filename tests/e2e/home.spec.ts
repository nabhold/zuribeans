import { expect, test } from "@playwright/test"
test("visitor can enter the multi-product catalogue from the home page", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Quality products. Clear provenance. Serious trade.",
  )
  await expect(page.getByRole("link", { name: "Explore products", exact: true })).toHaveAttribute(
    "href",
    "/products",
  )
})
