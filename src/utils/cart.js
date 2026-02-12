// ──────────────────────────────────────────
// Epic Eats — Cart Utility (localStorage-based)
// ──────────────────────────────────────────

const CART_KEY = "epiceats_cart";

export const getCart = () => {
    try {
        const cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch {
        return [];
    }
};

export const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (item) => {
    const cart = getCart();
    const existingIndex = cart.findIndex((i) => i._id === item._id);

    if (existingIndex >= 0) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    saveCart(cart);
    return cart;
};

export const removeFromCart = (itemId) => {
    const cart = getCart().filter((item) => item._id !== itemId);
    saveCart(cart);
    return cart;
};

export const updateQuantity = (itemId, quantity) => {
    const cart = getCart();
    if (quantity <= 0) {
        return removeFromCart(itemId);
    }
    const updated = cart.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
    );
    saveCart(updated);
    return updated;
};

export const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    return [];
};

export const getCartTotal = () => {
    return getCart().reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartItemCount = () => {
    return getCart().reduce((count, item) => count + item.quantity, 0);
};
