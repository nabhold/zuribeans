import { expect, test } from "@playwright/test"
test("customer can enter the catalogue from the home page", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Coffee")
  await expect(page.getByRole("link", { name: "Explore available lots" })).toHaveAttribute(
    "href",
    "/products",
  )
})
