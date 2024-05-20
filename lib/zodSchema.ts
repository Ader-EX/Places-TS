import Contact from "@/app/user/properties/add/_components/Contact";
import validator from "validator";
import { z } from "zod";

export const AddPropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(5, "Description is required"),
  type: z
    .string()
    .min(1, "Select the Type of the Property")
    .transform((data: unknown) => Number(data)),
  status: z
    .string()
    .min(1, "Select the Status of the Property")
    .transform((data: unknown) => Number(data)),
  price: z.number().min(1, "Price is required"),

  location: z.object({
    street: z.string().min(1, "Street is required"),
    zip: z
      .string()
      .refine((data) => validator.isPostalCode(data, "ID"), "Invalid Zipcode"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    region: z.string().min(1, "Region is required"),
    landmark: z.string().min(1, "Landmark is required"),
  }),
  features: z.object({
    bedrooms: z.number().min(1, "Bedrooms are required"),
    bathrooms: z.number().min(1, "Bathrooms are required"),
    parkingSpots: z.number().min(1, "Parking Spots are required"),
    area: z.number().min(1, "Areas are required"),
    hasSwimmingPool: z.boolean().optional().default(false),
    hasBalcony: z.boolean().optional().default(false),
    hasGarden: z.boolean().optional().default(false),
  }),
  contact: z.object({
    name: z.string().min(1, "Contact Name is required"),
    phone: z
      .string()
      .min(8, "Phone is required")
      .refine(
        (value) => /^[0-9]+$/.test(value),
        "Phone must contain only numbers"
      ),
    email: z.string().email().min(1, "Email is required"),
  }),
});
