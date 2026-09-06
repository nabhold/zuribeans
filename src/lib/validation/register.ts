import { z } from "zod"

export const registerSchema = z
  .object({
    email: z.string().email("Enter a valid business email."),
    password: z.string().min(8, "Password must contain at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm your password."),
    firstName: z.string().min(1, "Enter your first name."),
    lastName: z.string().min(1, "Enter your last name."),
    companyName: z.string().min(1, "Enter your company name."),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
