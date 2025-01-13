import type { Cart } from "~/types/Cart";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body || !body.cart || !body.userId) {
      throw createError({
        statusCode: 400,
        message: "Invalid request.Missing fields are required.",
      });
    }
    const ordersCookie = getCookie(event, "orders");
    const orders = ordersCookie ? JSON.parse(ordersCookie) : [];

    const order: Cart = {
      id: orders.length + 1,
      cart: body.cart,
      userId: body.userId,
      address: body.address,
      deliveryInstructions: body.deliveryInstructions,
      deliveryMethod: body.deliveryMethod,
      paymentMethod: body.paymentMethod,
      changeFor: body.changeFor,
      paymentDetails: body.paymentDetails,
      total: body.total,
      status: "pending",
      createdAt: new Date(),
    };

    orders.push(order);

    setCookie(event, "orders", JSON.stringify(orders), {
      httpOnly: true,
      path: "/",
    });

    return {
      message: "Order created successfully",
      order,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "An error occurred while creating the order.",
    });
  }
});

// "https://sandbox.paypal.com//cgi-bin/webscr?cmd=_xclick&amp;business=sb-qsjwi36682830@business.example.com&amp;currency_code=USD&amp;amount=20&amp;return=http://romanstwelve.com/contact-us&amp;item_name=Registration+Fee"
