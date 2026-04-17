const Cart = require("../models/Cart");

// ================== GET CART ==================
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
    await cart.save();
  }

  res.json(cart);
};

// ================== ADD TO CART ==================
exports.addToCart = async (req, res) => {
  const { userId, product } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existing = cart.items.find(
    (item) => item.productId.toString() === product._id.toString()
  );

  if (existing) {
    existing.qty += 1;
  } else {
    cart.items.push({
      productId: String(product._id),
      name: product.name,
      price: product.price,
      qty: 1,
    });
  }

  await cart.save();
  res.json(cart);
};

// ================== REMOVE / DECREASE ==================
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ userId });

  if (!cart) return res.json({ items: [] });

  // 🔥 normalize incoming id
  const pid = String(productId);

  // 🔥 find index instead of object (more reliable)
  const index = cart.items.findIndex(
    (i) => String(i.productId) === pid
  );

  if (index !== -1) {
    if(removeAll) {
      cart.items.splice(index, 1); // ✅ remove all qty
    }
    else{
    if (cart.items[index].qty > 1) {
      cart.items[index].qty -= 1; // ✅ decrease
    } else {
      cart.items.splice(index, 1); // ✅ remove only when qty = 1
      }
    }
  }

  await cart.save();
  res.json(cart);
};