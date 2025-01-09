export default defineEventHandler(async (event) => {
  try {
    // Get existing orders from cookies
    const ordersCookie = getCookie(event, "orders");
    const orders = ordersCookie ? JSON.parse(ordersCookie) : [];

    return {
      message: "Orders fetched successfully",
      data: orders,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "An error occurred while fetching orders.",
    });
  }
});
