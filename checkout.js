// checkout.js

function simulateCheckout({ fullName, phone, address, deliveryTime, paymentMethod, instructions, cartItems, userId, userEmail, saveAddress }) {
    // Validation
    if (!fullName || !phone || !address) return { success: false, message: 'Missing required fields' };
    if (!/^\d{11}$/.test(phone)) return { success: false, message: 'Invalid phone number' };
    if (!userId || !userEmail) return { success: false, message: 'User not logged in' };
    if (!cartItems || cartItems.length === 0) return { success: false, message: 'Cart is empty' };

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 0 ? 150 : 0;
    const tax = Math.round(subtotal * 0.05);
    const total_amount = subtotal + deliveryFee + tax;

    // Generate order ID
    const orderId = `#TKA${Math.floor(Math.random() * 90000) + 10000}`;
    const estimatedTime = deliveryTime === 'asap' ? '25-35 minutes' : '35-45 minutes';

    // Create order object
    const order = {
        orderId,
        email: userEmail,
        items: JSON.parse(JSON.stringify(cartItems)),
        total: total_amount,
        subtotal,
        deliveryFee,
        tax,
        fullName,
        phone,
        address,
        deliveryTime,
        estimatedDelivery: estimatedTime,
        paymentMethod,
        instructions: instructions || '',
        status: 'confirmed',
        timestamp: new Date().toISOString(),
    };

    // Save profile info if requested
    let savedProfile = {};
    if (saveAddress) {
        savedProfile[userEmail] = { phone, address, lastUpdated: new Date().toISOString() };
    }

    return { success: true, order, savedProfile };
}

module.exports = { simulateCheckout };
