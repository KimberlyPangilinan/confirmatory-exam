import { z } from "zod";

const bodySchema = z.object({
  cart: z
    .array(
      z.object({
        quantity: z.number().min(1, "Quantity must be at least 1"),
      }),
    )
    .min(1, "Cart must have at least one item"),
  shippingFee: z.number().optional(),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, bodySchema.parse);
    body.shippingFee = 200;
    return {
      message: "Successfully validated",
      data: {
        shippingFee: body.shippingFee, // Include the shipping fee in the response data
      },
    };
  } catch (error: any) {
    // Handle validation errors
    throw createError({
      statusCode: 400,
      message: error.message,
      data: error,
    });
  }
});
