const { simulateCheckout } = require('../checkout');

// Sample cart items
const sampleCart = [
    { id: 1, name: 'Burger', price: 500, quantity: 2 },
    { id: 2, name: 'Fries', price: 200, quantity: 1 },
];

// Test scenarios
const tests = [
    {
        name: 'All valid inputs',
        input: { fullName: 'John Doe', phone: '03001234567', address: 'Street 123', deliveryTime: 'asap', paymentMethod: 'cash', instructions: '', cartItems: sampleCart, userId: '1', userEmail: 'john@example.com', saveAddress: true },
        expectSuccess: true
    },
    {
        name: 'Missing full name',
        input: { fullName: '', phone: '03001234567', address: 'Street 123', deliveryTime: 'asap', paymentMethod: 'cash', instructions: '', cartItems: sampleCart, userId: '1', userEmail: 'john@example.com', saveAddress: false },
        expectSuccess: false
    },
    {
        name: 'Invalid phone number',
        input: { fullName: 'John Doe', phone: '12345', address: 'Street 123', deliveryTime: 'asap', paymentMethod: 'cash', instructions: '', cartItems: sampleCart, userId: '1', userEmail: 'john@example.com', saveAddress: false },
        expectSuccess: false
    },
    {
        name: 'Empty cart',
        input: { fullName: 'John Doe', phone: '03001234567', address: 'Street 123', deliveryTime: 'asap', paymentMethod: 'cash', instructions: '', cartItems: [], userId: '1', userEmail: 'john@example.com', saveAddress: false },
        expectSuccess: false
    },
    {
        name: 'User not logged in',
        input: { fullName: 'John Doe', phone: '03001234567', address: 'Street 123', deliveryTime: 'asap', paymentMethod: 'cash', instructions: '', cartItems: sampleCart, userId: '', userEmail: '', saveAddress: false },
        expectSuccess: false
    },
    {
        name: 'Save profile info',
        input: { fullName: 'Alice', phone: '03009876543', address: 'Some Road', deliveryTime: 'schedule', paymentMethod: 'card', instructions: 'Leave at door', cartItems: sampleCart, userId: '2', userEmail: 'alice@example.com', saveAddress: true },
        expectSuccess: true
    },
    {
        name: 'Schedule delivery time',
        input: { fullName: 'Bob', phone: '03001112233', address: 'Street 77', deliveryTime: 'schedule', paymentMethod: 'card', instructions: '', cartItems: sampleCart, userId: '3', userEmail: 'bob@example.com', saveAddress: false },
        expectSuccess: true
    },
    {
        name: 'ASAP delivery time',
        input: { fullName: 'Charlie', phone: '03009998877', address: 'Avenue 1', deliveryTime: 'asap', paymentMethod: 'cash', instructions: '', cartItems: sampleCart, userId: '4', userEmail: 'charlie@example.com', saveAddress: false },
        expectSuccess: true
    },
    {
        name: 'With delivery instructions',
        input: { fullName: 'David', phone: '03005554433', address: 'Lane 5', deliveryTime: 'asap', paymentMethod: 'cash', instructions: 'Call on arrival', cartItems: sampleCart, userId: '5', userEmail: 'david@example.com', saveAddress: false },
        expectSuccess: true
    },
    {
        name: 'Missing address',
        input: { fullName: 'Eva', phone: '03002223344', address: '', deliveryTime: 'asap', paymentMethod: 'cash', instructions: '', cartItems: sampleCart, userId: '6', userEmail: 'eva@example.com', saveAddress: false },
        expectSuccess: false
    },
];

// Run tests
tests.forEach((test, index) => {
    const result = simulateCheckout(test.input);
    const passed = result.success === test.expectSuccess;
    console.log(`${index + 1}. ${test.name}: ${passed ? 'PASS ✅' : 'FAIL ❌'}`);
    if (!passed) console.log('   Result:', result);
});
