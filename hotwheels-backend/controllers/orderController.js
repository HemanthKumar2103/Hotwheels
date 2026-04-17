const Order = require("../models/Order");
const Cart = require("../models/Cart");

// PLACE ORDER
exports.placeOrder = async (req, res) => {
  const { userId } = req.body;

  const cart = await Cart.findOne({ userId });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const order = new Order({
    userId,
    items: cart.items,
    total
  });

  await order.save();

  // clear cart
  cart.items = [];
  await cart.save();

  res.json({ message: "Order placed successfully", order });
};

// GET ORDERS
exports.getOrders = async (req, res) => {
  const { userId } = req.params;

  const orders = await Order.find({ userId }).sort({ createdAt: -1 });

  res.json(orders);
};