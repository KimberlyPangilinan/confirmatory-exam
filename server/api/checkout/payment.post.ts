import { z } from "zod";

const bodySchema = z.object({
  userId: z.number(),
  cart: z
    .array(
      z.object({
        quantity: z.number().min(1, "Quantity must be at least 1"),
      }),
    )
    .min(1, "Cart must have at least one item"),
  changeFor: z.optional(z.number()),
  address: z.string(),
  paymentMethod: z.string(),
  delivery: z.optional(z.string()),
  requestCutlery: z.optional(z.boolean()),
  total: z.number(),
  paymentDetails: z
    .object({
      cardNumber: z.string(),
      cardHolderName: z.string(),
      expirationDate: z.string(),
      cvv: z.string(),
      billingDetails: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
      }),
    })
    .optional(),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, bodySchema.parse);
    return {
      message: "Successfully validated",
      data: body,
    };
  } catch (error: any) {
    let message = "Error";
    let errorData = null;
    if (error.statusCode === 400) {
      // Assuming Zod is used for validation
      message = "Validation Error";
      errorData = error.data || "Invalid input data";
    } else {
      // statusCode = error.statusCode || 500;
      message = error.message || "An unexpected error occurred";
      errorData = error.data || {};
    }
    throw createError({
      statusCode: error.statusCode || 500,
      message,
      data: errorData,
    });
  }
});
