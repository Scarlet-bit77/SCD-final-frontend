console.log('✅ Test script is running...');
require('dotenv').config({ path: './db.env' });

console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded' : 'NOT loaded');
console.log('PORT:', process.env.PORT || 'Not set');