import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// Global variables for payment
const currency = "pkr";
const deliveryCharges = 10;
const taxPercentage = 0.02;

// PLACE ORDER USING COD
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Please add product first" });
    }

    // calculate subtotal
    let subtotal = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;
      subtotal += product.offerPrice * item.quantity;
    }

    const taxAmount = subtotal * taxPercentage;
    const totalAmount = subtotal + taxAmount + deliveryCharges;

    await Order.create({
      userId,
      items,
      amount: totalAmount,
      address,
      paymentMethod: "COD",
      isPaid: false,
    });

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// PLACE ORDER USING ONLINE PAYMENT
export const placeOrderOnline = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Please add product first" });
    }

    let subtotal = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;
      subtotal += product.offerPrice * item.quantity;
    }

    const taxAmount = subtotal * taxPercentage;
    const totalAmount = subtotal + taxAmount + deliveryCharges;

    // Create unpaid order first
    const order = await Order.create({
      userId,
      items,
      amount: totalAmount,
      address,
      paymentMethod: "ONLINE",
      isPaid: false,
    });

    const txRef = order._id.toString();
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: txRef,
        amount: totalAmount,
        currency: "NGN",
        redirect_url: `${process.env.CLIENT_URL}/loader?my-orders`,
        customer: {
          email: user.email,
          name: user.name,
        },
        customizations: {
          title: "My Shop Checkout",
          description: "Payment for cart items",
          logo: "/clientsrcassetslogo.png",
        },
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.data?.link) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Flutterwave init failed",
          error: data,
        });
    }

    res.json({
      success: true,
      message: "Payment initiated successfully",
      checkoutLink: data.data.link,
      txRef,
      amountToPay: totalAmount,
      orderId: order._id,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { transaction_id, tx_ref } = req.query; // tx_ref = order._id

    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();
    const payment = data.data;

    if (!payment || payment.status !== "successful") {
      return res.status(400).json({ message: "Payment not successful" });
    }

    const order = await Order.findById(tx_ref); 
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    order.isPaid = true;
    order.flutterwavePayment = transaction_id;
    await order.save();

    return res.redirect(`${process.env.CLIENT_URL}/my-orders`);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Payment verification failed", error: error.message });
  }
};

// ALL ORDERS DATA FOR FRONTEND BY USERID
export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({
      userId,
      $or: [{ paymentMethod: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });

    // Missing success response: res.json({success: true, orders})
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ALL ORDERS DATA FOR ADMIN PANEL
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentMethod: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// UPDATING ORDER STATUS FROM ADMIN PANEL
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
