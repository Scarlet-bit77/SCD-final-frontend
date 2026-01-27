

require("dotenv").config({ path: "./db.env" });

// ==================== GEMINI AI SETUP ====================
const { GoogleGenAI } = require("@google/genai");

const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});























// ===== IMPORTS =====
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: "./db.env" });

const app = express();
const PORT = process.env.PORT || 3000;



// ===== MIDDLEWARE =====
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());//newly added for chatbox
app.use(bodyParser.urlencoded({ extended: true }));




// 2. AI Chat
// ==================== AI CHAT ROUTE ====================
app.post("/chat", async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || messages.length === 0) {
            return res.status(400).json({ error: "No messages provided" });
        }

        const conversationText = messages
            .map(m => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
            .join("\n");

        const result = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: conversationText }] }]
        });

        const aiReply =
            result?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response from AI";

        res.json({ reply: aiReply });

    } catch (err) {
        console.error("❌ Gemini AI Error:", err);
        res.status(500).json({ error: "AI Service Error", details: err.message });
    }
});


















































// ⚠️ CORRECT PATH: All your files are in this folder
const frontendPath = "C:\\Users\\Microsoft\\OneDrive\\Desktop\\FDB tarka final\\FDB tarka final\\FDB tarka final\\Tarka SDC - Copy\\Tarka SDC-demo\\tarka-2 - Copy 5";
console.log("📁 Frontend path:", frontendPath);
console.log("✅ Path exists:", fs.existsSync(frontendPath));

// Serve static files from frontend folder
app.use(express.static(frontendPath));

// ===== MONGODB MODELS =====

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date,
    default: null
  },
  login_count: {
    type: Number,
    default: 0
  }
});

// Login Attempt Schema
const loginAttemptSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  user_email: {  // ← ADDED: Store email directly
    type: String,
    default: ""
  },
  attempt_time: {
    type: Date,
    default: Date.now
  },
  success: {
    type: Boolean,
    required: true
  },
  ip_address: {
    type: String,
    default: "unknown"
  }
});

// ORDER SCHEMA - UPDATED WITH USER_NAME FIELD
const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  user_email: {
    type: String,
    required: true
  },
  user_name: {  // ← ADDED: Store user name directly
    type: String,
    default: ""
  },
  items: [{
    name: String,
    quantity: Number,
    price: Number,
    total: Number
  }],
  total_amount: {
    type: Number,
    required: true
  },
  delivery_address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  delivery_time: String,
  payment_method: String,
  notes: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

// USER PROFILE SCHEMA
const userProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  name: {  // ← MOVED: Name is stored in profile, not in User
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  profile_picture: {
    type: String,
    default: ""
  },
  preferences: {
    type: Map,
    of: String,
    default: {}
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// CART SCHEMA (FROM SERVER1)
const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  items: [{
    product_id: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String,
    total: Number
  }],
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// CHECKOUT SCHEMA (FROM SERVER1)
const checkoutSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  user_email: { type: String, required: true },
  items: [{
    name: String,
    quantity: Number,
    price: Number,
    total: Number
  }],
  total_amount: { type: Number, required: true },
  delivery_address: { type: String, required: true },
  delivery_time: String,
  payment_method: String,
  notes: String,
  created_at: { type: Date, default: Date.now }
});

// CONTACT MESSAGE SCHEMA (FROM SERVER1)
const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// Create Models
const User = mongoose.model("User", userSchema);
const LoginAttempt = mongoose.model("LoginAttempt", loginAttemptSchema);
const Order = mongoose.model("Order", orderSchema);
const UserProfile = mongoose.model("UserProfile", userProfileSchema);
const Cart = mongoose.model("Cart", cartSchema);  // FROM SERVER1
const Checkout = mongoose.model("Checkout", checkoutSchema);  // FROM SERVER1
const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);  // FROM SERVER1

// ===== OBSERVER PATTERN =====
class LoginObserver {
  update(user, eventType, additionalData) {
    // To be implemented by concrete observers
  }
}

class LoginAttemptLogger extends LoginObserver {
  async update(user, eventType, additionalData) {
    if (eventType === 'login_attempt') {
      try {
        await this.recordLoginAttempt(
          user ? user._id : null,
          additionalData.attemptedEmail || (user ? user.email : ""),  // ← Use attemptedEmail
          additionalData.success, 
          additionalData.ipAddress
        );
      } catch (err) {
        console.error("Error in LoginAttemptLogger:", err);
      }
    }
  }

  async recordLoginAttempt(userId, userEmail, success, ipAddress) {
    try {
      const loginAttempt = new LoginAttempt({
        user_id: userId,
        user_email: userEmail,  // ← Store email here
        success: success,
        ip_address: ipAddress
      });
      await loginAttempt.save();
      console.log(`📝 Login attempt recorded: ${userEmail} - ${success ? '✅' : '❌'}`);
    } catch (err) {
      console.error("Error recording login attempt:", err);
    }
  }
}

class LoginStatsUpdater extends LoginObserver {
  async update(user, eventType, additionalData) {
    console.log(`📊 LoginStatsUpdater received: ${eventType} for user: ${user?._id || 'none'}`);
    
    if (eventType === 'login_success' && user) {
      try {
        const updatedUser = await this.updateLoginStats(user._id);
        console.log(`✅ Login stats updated for user: ${user._id}, new count: ${updatedUser?.login_count}`);
        return updatedUser;
      } catch (err) {
        console.error("Error in LoginStatsUpdater:", err);
      }
    }
    return null;
  }

  async updateLoginStats(userId) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId, 
        {
          $set: { last_login: new Date() },
          $inc: { login_count: 1 }
        },
        { new: true }  // Return the updated document
      );
      return updatedUser;
    } catch (err) {
      console.error("Error updating login stats:", err);
      return null;
    }
  }
}

class LoginEventManager {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  async notifyObservers(user, eventType, additionalData = {}) {
    console.log(`🔔 Notifying observers: ${eventType} for user: ${user?._id || 'none'}`);
    
    const notifications = this.observers.map(observer =>
      observer.update(user, eventType, additionalData)
    );
    const results = await Promise.allSettled(notifications);
    
    // Return successful results
    const successfulResults = results
      .filter(result => result.status === 'fulfilled' && result.value)
      .map(result => result.value);
    
    return successfulResults;
  }
}

// ===== DATABASE CONNECTION =====
class DatabaseConnection {
  static instance = null;
  eventManager = new LoginEventManager();

  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    DatabaseConnection.instance = this;
    this.initializeEventObservers();
  }

  static getInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  initializeEventObservers() {
    this.eventManager.addObserver(new LoginAttemptLogger());
    this.eventManager.addObserver(new LoginStatsUpdater());
    console.log("👀 Observers initialized");
  }

  async initializeDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("✅ Connected to MongoDB Atlas!");
      console.log("📊 Database:", mongoose.connection.name);
      
      // Collections will be created automatically when we first insert data
      await this.ensureIndexes();
      
    } catch (err) {
      console.error("❌ MongoDB connection failed:", err.message);
    }
  }

  async ensureIndexes() {
    try {
      // Ensure unique email index
      await User.collection.createIndex({ email: 1 }, { unique: true });
      // Ensure unique user_id index for UserProfile
      await UserProfile.collection.createIndex({ user_id: 1 }, { unique: true });
      // Ensure indexes for orders
      await Order.collection.createIndex({ user_id: 1, order_date: -1 });
      // Ensure index for login attempts
      await LoginAttempt.collection.createIndex({ user_email: 1, attempt_time: -1 });
      // Ensure unique user_id index for Cart
      await Cart.collection.createIndex({ user_id: 1 }, { unique: true });
      console.log("✅ Database indexes created!");
    } catch (err) {
      console.error("Error creating indexes:", err);
    }
  }

  // ===== DATABASE OPERATIONS =====
  async findUserByEmail(email) {
    try {
      return await User.findOne({ email: email.toLowerCase() });
    } catch (err) {
      console.error("Error finding user by email:", err);
      return null;
    }
  }

  async createUser(email, hashedPassword) {
    try {
      const user = new User({
        email: email.toLowerCase(),
        password: hashedPassword
      });
      await user.save();
      
      // Create empty profile for the user
      const userProfile = new UserProfile({
        user_id: user._id,
        name: "",  // Empty name initially
        phone: "",
        address: "",
        profile_picture: ""
      });
      await userProfile.save();
      
      return user._id;
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  }

  async checkUserExists(email) {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      return user !== null;
    } catch (err) {
      console.error("Error checking user existence:", err);
      return false;
    }
  }

  getEventManager() {
    return this.eventManager;
  }
}

// ===== INITIALIZE DATABASE SINGLETON =====
const db = DatabaseConnection.getInstance();
db.initializeDatabase();

// ===== HELPER FUNCTIONS =====
function getClientIP(req) {
  return req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';
}

// ===== ROUTES =====

// Debug route to check file paths
app.get("/debug-path", (req, res) => {
  const loginPath = path.join(frontendPath, "login.html");
  const files = fs.readdirSync(frontendPath);
  const htmlFiles = files.filter(f => f.toLowerCase().endsWith('.html'));
  
  res.json({
    frontendPath: frontendPath,
    loginPath: loginPath,
    loginExists: fs.existsSync(loginPath),
    totalFiles: files.length,
    htmlFiles: htmlFiles,
    first10Files: files.slice(0, 10)
  });
});

// Debug route to check database collections
app.get("/debug-collections", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({
      collections: collections.map(c => c.name),
      collectionCount: collections.length
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Debug route to check all users
app.get("/debug-users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password
    const loginAttempts = await LoginAttempt.find().sort({ attempt_time: -1 }).limit(20);
    
    // Get profiles for names
    const userIds = users.map(u => u._id);
    const profiles = await UserProfile.find({ user_id: { $in: userIds } });
    
    const usersWithNames = users.map(user => {
      const profile = profiles.find(p => p.user_id.toString() === user._id.toString());
      return {
        ...user.toObject(),
        name: profile ? profile.name : "",
        phone: profile ? profile.phone : "",
        address: profile ? profile.address : ""
      };
    });
    
    res.json({
      users: usersWithNames,
      userCount: users.length,
      recentLoginAttempts: loginAttempts.map(attempt => ({
        ...attempt.toObject(),
        readable_time: new Date(attempt.attempt_time).toLocaleString(),
        status: attempt.success ? "✅ Success" : "❌ Failed",
        email_display: attempt.user_email || (attempt.user_id ? `User ID: ${attempt.user_id}` : "No email")
      }))
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Debug route to check specific user
app.get("/debug-user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email.toLowerCase() });
    
    if (!user) {
      return res.json({ error: "User not found" });
    }
    
    const profile = await UserProfile.findOne({ user_id: user._id });
    const loginAttempts = await LoginAttempt.find({ 
      $or: [
        { user_id: user._id },
        { user_email: req.params.email.toLowerCase() }
      ]
    }).sort({ attempt_time: -1 }).limit(10);
    
    const orders = await Order.find({ user_id: user._id }).sort({ order_date: -1 }).limit(5);
    
    res.json({
      user: {
        _id: user._id,
        email: user.email,
        login_count: user.login_count,
        last_login: user.last_login,
        created_at: user.created_at
      },
      profile: profile || {
        name: "",
        phone: "",
        address: "",
        profile_picture: ""
      },
      login_attempts: loginAttempts,
      recent_orders: orders
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Debug route for profile page
app.get("/debug-userp", (req, res) => {
  const userpPath = path.join(frontendPath, "userp.html");
  
  if (!fs.existsSync(userpPath)) {
    return res.json({ 
      error: "userp.html not found",
      path: userpPath,
      exists: false
    });
  }
  
  // Check HTML content
  const content = fs.readFileSync(userpPath, 'utf8');
  
  res.json({
    exists: true,
    fileSize: content.length,
    hasScriptTags: content.includes('<script'),
    hasProfileAPI: content.includes('/api/user/'),
    hasUpdateProfile: content.includes('/api/user/') && content.includes('/profile'),
    path: userpPath,
    frontendPath: frontendPath
  });
});

// Test endpoint to verify API is working
app.get("/api/test-profile", (req, res) => {
  res.json({
    success: true,
    message: "Profile API is working!",
    endpoints: {
      getUser: "GET /api/user/:id",
      updateProfile: "PUT /api/user/:id/profile",
      getUserOrders: "GET /api/user/:id/orders",
      loginAttempts: "GET /api/admin/login-attempts",
      ordersWithDetails: "GET /api/orders/:orderId",
      updateOrderNames: "PUT /api/orders/update-names",
      debugOrders: "GET /api/debug/orders",
      cart: "GET /api/cart/:userId",
      addToCart: "POST /api/cart/add",
      removeFromCart: "DELETE /api/cart/remove",
      clearCart: "DELETE /api/cart/clear/:userId",
      checkout: "POST /api/checkout",
      contact: "POST /api/contact"
    }
  });
});

// Serve welcome page as default (since you have welcome.html)
app.get("/", (req, res) => {
  const welcomePage = path.join(frontendPath, "welcome.html");
  const loginPage = path.join(frontendPath, "login.html");
  const homePage = path.join(frontendPath, "home.html");
  
  if (fs.existsSync(welcomePage)) {
    res.sendFile(welcomePage);
  } else if (fs.existsSync(homePage)) {
    res.sendFile(homePage);
  } else if (fs.existsSync(loginPage)) {
    res.sendFile(loginPage);
  } else {
    res.json({
      message: "Backend API is running!",
      endpoints: {
        login: "/login",
        signup: "POST /signup",
        loginPost: "POST /login",
        debug: "/debug-path",
        debugUserp: "/debug-userp",
        users: "/users",
        userProfile: "/user/:id",
        apiUser: "/api/user/:id",
        loginAttempts: "/api/admin/login-attempts",
        updateOrderNames: "/api/orders/update-names",
        debugOrders: "/api/debug/orders",
        cart: "/api/cart/:userId",
        checkout: "/api/checkout",
        contact: "/api/contact"
      },
      availablePages: fs.readdirSync(frontendPath)
        .filter(f => f.endsWith('.html'))
        .map(f => `/${f.replace('.html', '')}`)
    });
  }
});

// Serve userp.html specifically
app.get("/userp", (req, res) => {
  const userpPath = path.join(frontendPath, "userp.html");
  
  if (fs.existsSync(userpPath)) {
    // Add headers to prevent caching issues
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    res.sendFile(userpPath);
  } else {
    res.status(404).json({ 
      error: "Profile page not found",
      suggestion: "Check if userp.html exists in frontend folder"
    });
  }
});

// Also serve userp.html directly
app.get("/userp.html", (req, res) => {
  const userpPath = path.join(frontendPath, "userp.html");
  
  if (fs.existsSync(userpPath)) {
    res.sendFile(userpPath);
  } else {
    res.status(404).json({ 
      error: "userp.html not found" 
    });
  }
});

// Serve all HTML pages dynamically
app.get("/:page", (req, res) => {
  const page = req.params.page;
  
  // Check for .html extension
  const pagePath = path.join(frontendPath, `${page}.html`);
  
  if (fs.existsSync(pagePath)) {
    res.sendFile(pagePath);
  } else {
    // Check if it's a file without extension
    const filePath = path.join(frontendPath, page);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      // Try lowercase version
      const lowerPath = path.join(frontendPath, `${page.toLowerCase()}.html`);
      if (fs.existsSync(lowerPath)) {
        res.sendFile(lowerPath);
      } else {
        res.status(404).json({ 
          error: "Page not found",
          requested: page,
          availablePages: fs.readdirSync(frontendPath)
            .filter(f => f.endsWith('.html'))
            .map(f => f.replace('.html', ''))
        });
      }
    }
  }
});

// --- CONTACT FORM (FROM SERVER1) ---
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newMessage = new ContactMessage({
      name,
      email,
      phone,
      subject,
      message
    });

    await newMessage.save();

    res.json({ success: true, message: "Message received successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- SIGN UP ---
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password required" });

  try {
    const db = DatabaseConnection.getInstance();
    
    // Check if user exists
    if (await db.checkUserExists(email)) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await db.createUser(email, hashedPassword);
    
    // Get the created user
    const user = await User.findById(userId);
    
    // Notify observers about successful registration/login
    await db.getEventManager().notifyObservers(
      user, 
      'login_attempt', 
      { 
        success: true, 
        ipAddress: getClientIP(req),
        attemptedEmail: email  // ← Pass attempted email
      }
    );

    res.json({ 
      success: true, 
      message: "User registered successfully!",
      user_id: userId,
      email: email
    });
    
  } catch (err) {
    console.error("Signup error:", err);
    
    // Handle duplicate key error (unique email constraint)
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Email already exists" 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Database error",
      error: err.message 
    });
  }
});

// --- LOGIN ---
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  console.log(`🔐 Login attempt for: ${email}`);

  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password required" });

  try {
    const db = DatabaseConnection.getInstance();
    
    // Find user
    const user = await db.findUserByEmail(email);
    console.log(`👤 User found: ${user ? 'Yes' : 'No'}`);

    if (!user) {
      // Notify observers about failed login attempt
      await db.getEventManager().notifyObservers(
        null, 
        'login_attempt', 
        { 
          success: false, 
          ipAddress: getClientIP(req),
          attemptedEmail: email  // ← Pass attempted email
        }
      );
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`🔑 Password match: ${isMatch}`);

    if (!isMatch) {
      // Notify observers about failed login attempt
      await db.getEventManager().notifyObservers(
        user, 
        'login_attempt', 
        { 
          success: false, 
          ipAddress: getClientIP(req),
          attemptedEmail: email  // ← Pass attempted email
        }
      );
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    console.log(`📊 Before update - Login count: ${user.login_count}, Last login: ${user.last_login}`);
    
    // Notify observers about successful login attempt
    await db.getEventManager().notifyObservers(
      user, 
      'login_attempt',  // ← Use 'login_attempt' not 'login_success'
      { 
        success: true, 
        ipAddress: getClientIP(req),
        attemptedEmail: email  // ← Pass attempted email
      }
    );
    
    // Update login stats
    const updatedUser = await User.findByIdAndUpdate(
      user._id, 
      {
        $set: { last_login: new Date() },
        $inc: { login_count: 1 }
      },
      { new: true }
    );
    
    // Get user profile for name
    const userProfile = await UserProfile.findOne({ user_id: user._id });
    
    console.log(`📈 After update - Login count: ${updatedUser.login_count}, Last login: ${updatedUser.last_login}`);

    res.json({ 
      success: true, 
      message: "Login successful!",
      user_id: updatedUser._id,
      email: updatedUser.email,
      name: userProfile ? userProfile.name : "",  // ← Return name from profile
      login_count: updatedUser.login_count,
      last_login: updatedUser.last_login
    });
    
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Database error",
      error: err.message 
    });
  }
});

// ===== CART ROUTES (FROM SERVER1) =====
app.get("/api/cart/:userId", async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.params.userId);
    const cart = await Cart.findOne({ user_id: userObjectId });
    res.json({ success: true, cart: cart || { items: [] } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch cart" });
  }
});

app.post("/api/cart/add", async (req, res) => {
  try {
    const { user_id, item } = req.body;

    if (!user_id || !item) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    const userObjectId = new mongoose.Types.ObjectId(user_id);

    let cart = await Cart.findOne({ user_id: userObjectId });

    if (!cart) {
      cart = new Cart({ user_id: userObjectId, items: [item] });
    } else {
      const existingItem = cart.items.find(i => i.product_id === item.product_id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.total = existingItem.quantity * existingItem.price;
      } else {
        cart.items.push(item);
      }
    }

    cart.updated_at = new Date();
    await cart.save();

    res.json({ success: true, message: "Item added to cart", cart });
  } catch (err) {
    console.error("Cart add error:", err);
    res.status(500).json({ success: false, message: "Failed to update cart" });
  }
});

// ===== DELETE CART ITEM (FROM SERVER1) =====
app.delete("/api/cart/remove", async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
      return res.status(400).json({ success: false, message: "Missing user_id or product_id" });
    }

    const userObjectId = new mongoose.Types.ObjectId(user_id);
    const cart = await Cart.findOne({ user_id: userObjectId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const originalLength = cart.items.length;
    cart.items = cart.items.filter(item => item.product_id !== product_id);

    if (cart.items.length === originalLength) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    cart.updated_at = new Date();
    await cart.save();

    res.json({ success: true, message: "Item removed from cart", cart });
  } catch (err) {
    console.error("Cart remove error:", err);
    res.status(500).json({ success: false, message: "Failed to remove item" });
  }
});

// ===== CLEAR ENTIRE CART (FROM SERVER1) =====
app.delete("/api/cart/clear/:userId", async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.params.userId);
    const cart = await Cart.findOneAndDelete({ user_id: userObjectId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.json({ success: true, message: "Cart cleared" });
  } catch (err) {
    console.error("Cart clear error:", err);
    res.status(500).json({ success: false, message: "Failed to clear cart" });
  }
});

// ===== CHECKOUT (FROM SERVER1) =====
app.post("/api/checkout", async (req, res) => {
  try {
    const { user_id, delivery_address, delivery_time, payment_method, notes } = req.body;

    if (!user_id || !delivery_address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const userObjectId = new mongoose.Types.ObjectId(user_id);

    // Fetch cart
    const cart = await Cart.findOne({ user_id: userObjectId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Fetch user
    const user = await User.findById(userObjectId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Get user's name from profile
    let user_name = "";
    try {
      const userProfile = await UserProfile.findOne({ user_id: userObjectId });
      user_name = userProfile ? userProfile.name : "";
    } catch (err) {
      console.log("Could not fetch user name for checkout:", err);
    }

    // Calculate total amount
    const total_amount = cart.items.reduce((sum, item) => sum + item.total, 0);

    // Prepare order items
    const orderItems = cart.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.total
    }));

    // Create Checkout record (optional)
    const checkout = new Checkout({
      user_id: userObjectId,
      user_email: user.email,
      items: orderItems,
      total_amount,
      delivery_address,
      delivery_time: delivery_time || "ASAP",
      payment_method: payment_method || "Cash on Delivery",
      notes: notes || ""
    });
    await checkout.save();

    // Create Order record WITH USER NAME
    const order = new Order({
      user_id: userObjectId,
      user_email: user.email,
      user_name: user_name,  // ← Store the name
      items: orderItems,
      total_amount,
      delivery_address,
      delivery_time: delivery_time || "ASAP",
      payment_method: payment_method || "Cash on Delivery",
      notes: notes || ""
    });
    await order.save();

    // Clear cart after successful checkout
    await Cart.findOneAndDelete({ user_id: userObjectId });

    res.json({
      success: true,
      message: "Checkout successful! Order created.",
      order_id: order._id,
      order: order
    });

  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// ===== PROFILE AND ORDER ROUTES =====

// --- GET USER WITH PROFILE DATA ---
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
    
    // Get user profile data (includes name)
    const userProfile = await UserProfile.findOne({ user_id: req.params.id });
    
    // Get user orders
    const orders = await Order.find({ user_id: req.params.id })
      .sort({ order_date: -1 })
      .limit(10);
    
    // Get user cart
    const cart = await Cart.findOne({ user_id: req.params.id });
    
    // Get login attempts with email stored directly
    const loginAttempts = await LoginAttempt.find({ user_id: req.params.id })
      .sort({ attempt_time: -1 })
      .limit(10);
    
    res.json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        created_at: user.created_at,
        last_login: user.last_login,
        login_count: user.login_count
      },
      profile: userProfile || {
        name: "",  // ← Include name in default
        phone: "",
        address: "",
        profile_picture: ""
      },
      cart: cart || { items: [] },
      orders: orders,
      login_history: loginAttempts,
      statistics: {
        total_orders: orders.length,
        total_spent: orders.reduce((sum, order) => sum + order.total_amount, 0),
        last_order_date: orders.length > 0 ? orders[0].order_date : null,
        cart_items: cart ? cart.items.length : 0
      }
    });
    
  } catch (err) {
    console.error("Get user with profile error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Database error" 
    });
  }
});

// --- UPDATE USER PROFILE ---
app.put("/api/user/:id/profile", async (req, res) => {
  try {
    const { name, phone, address, profile_picture } = req.body;  // ← Add name
    const userId = req.params.id;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
    
    // Update or create profile with name
    const userProfile = await UserProfile.findOneAndUpdate(
      { user_id: userId },
      {
        name: name || "",  // ← Add name field
        phone: phone || "",
        address: address || "",
        profile_picture: profile_picture || "",
        updated_at: new Date()
      },
      {
        new: true,
        upsert: true, // Create if doesn't exist
        runValidators: true
      }
    );
    
    res.json({
      success: true,
      message: "Profile updated successfully",
      profile: userProfile
    });
    
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Database error",
      error: err.message 
    });
  }
});

// --- GET USER ORDERS ---
app.get("/api/user/:id/orders", async (req, res) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    const orders = await Order.find({ user_id: req.params.id })
      .sort({ order_date: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const totalOrders = await Order.countDocuments({ user_id: req.params.id });
    
    // If any orders are missing names, try to fill them
    const ordersWithNames = await Promise.all(orders.map(async (order) => {
      if (!order.user_name || order.user_name === "") {
        try {
          const userProfile = await UserProfile.findOne({ user_id: order.user_id });
          if (userProfile && userProfile.name) {
            order.user_name = userProfile.name;
            await order.save();
          }
        } catch (err) {
          console.log("Could not update order name:", err);
        }
      }
      return order;
    }));
    
    res.json({
      success: true,
      orders: ordersWithNames,
      pagination: {
        total: totalOrders,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalOrders / limit)
      }
    });
    
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ 
      success: false, 
      message: "Database error" 
    });
  }
});

// --- CREATE NEW ORDER (UPDATED WITH USER NAME) ---
app.post("/api/orders", async (req, res) => {
  try {
    const {
      user_id,
      user_email,
      items,
      total_amount,
      delivery_address,
      delivery_time,
      payment_method,
      notes
    } = req.body;

    // Validate required fields
    if (!user_id || !user_email || !items || !total_amount || !delivery_address) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    // Get user's name from profile
    let user_name = "";
    try {
      const userProfile = await UserProfile.findOne({ user_id: user_id });
      user_name = userProfile ? userProfile.name : "";
      console.log(`👤 Found user name for order: ${user_name}`);
    } catch (err) {
      console.log("Could not fetch user name:", err);
    }

    // Create new order WITH NAME
    const order = new Order({
      user_id,
      user_email,
      user_name,  // ← Store the name
      items,
      total_amount,
      delivery_address,
      delivery_time: delivery_time || "ASAP",
      payment_method: payment_method || "Cash on Delivery",
      notes: notes || ""
    });

    await order.save();
    
    console.log(`✅ Order created with name: ${user_name || 'No name found'}`);

    res.json({
      success: true,
      message: "Order created successfully",
      order_id: order._id,
      order: order
    });

  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ 
      success: false, 
      message: "Database error",
      error: err.message 
    });
  }
});

// --- GET ORDER BY ID WITH USER DETAILS ---
app.get("/api/orders/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    // Get user info
    const user = await User.findById(order.user_id);
    const userProfile = await UserProfile.findOne({ user_id: order.user_id });
    
    // Get all user orders
    const userOrders = await Order.find({ user_id: order.user_id })
      .sort({ order_date: -1 });

    // If order doesn't have name but we found it in profile, update it
    if ((!order.user_name || order.user_name === "") && userProfile && userProfile.name) {
      try {
        order.user_name = userProfile.name;
        await order.save();
        console.log(`✅ Updated order ${order._id} with name from profile: ${userProfile.name}`);
      } catch (err) {
        console.log("Could not update order with name:", err);
      }
    }

    res.json({
      success: true,
      order: {
        ...order.toObject(),
        user: user ? {
          _id: user._id,
          email: user.email,
          name: order.user_name || (userProfile ? userProfile.name : ""),
          phone: userProfile ? userProfile.phone : "",
          address: userProfile ? userProfile.address : "",
          total_orders: userOrders.length,
          total_spent: userOrders.reduce((sum, o) => sum + o.total_amount, 0)
        } : null
      }
    });

  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ 
      success: false, 
      message: "Database error" 
    });
  }
});

// --- UPDATE ORDER STATUS ---
app.put("/api/orders/:orderId/status", async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['pending', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid status" 
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { 
        status: status,
        ...(status === 'delivered' ? { delivered_at: new Date() } : {})
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    res.json({
      success: true,
      message: "Order status updated",
      order: order
    });

  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ 
      success: false, 
      message: "Database error" 
    });
  }
});

// --- UPDATE EXISTING ORDERS WITH NAMES ---
app.put("/api/orders/update-names", async (req, res) => {
  try {
    console.log("🔄 Updating existing orders with user names...");
    
    // Get all orders without names or with empty names
    const orders = await Order.find({ 
      $or: [
        { user_name: { $exists: false } },
        { user_name: "" },
        { user_name: null }
      ]
    });
    
    console.log(`📊 Found ${orders.length} orders to update`);
    
    let updatedCount = 0;
    let errors = [];
    
    for (const order of orders) {
      try {
        if (order.user_id) {
          // Get user profile
          const userProfile = await UserProfile.findOne({ user_id: order.user_id });
          
          if (userProfile && userProfile.name) {
            // Update order with name
            await Order.findByIdAndUpdate(
              order._id,
              { user_name: userProfile.name },
              { new: true }
            );
            updatedCount++;
            console.log(`✅ Updated order ${order._id} with name: ${userProfile.name}`);
          } else {
            console.log(`⚠️ No name found for user ${order.user_id}`);
          }
        }
      } catch (err) {
        errors.push({ orderId: order._id, error: err.message });
        console.error(`❌ Error updating order ${order._id}:`, err);
      }
    }
    
    res.json({
      success: true,
      message: `Updated ${updatedCount} orders with user names`,
      updated: updatedCount,
      total: orders.length,
      errors: errors.length > 0 ? errors : undefined
    });
    
  } catch (err) {
    console.error("Error updating orders:", err);
    res.status(500).json({ 
      success: false, 
      message: "Database error",
      error: err.message 
    });
  }
});

// --- DEBUG: GET ALL ORDERS WITH NAMES ---
app.get("/api/debug/orders", async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    
    const orders = await Order.find({})
      .sort({ order_date: -1 })
      .limit(parseInt(limit));
    
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      user_id: order.user_id,
      user_email: order.user_email,
      user_name: order.user_name || "(empty)",
      items_count: order.items.length,
      total_amount: order.total_amount,
      status: order.status,
      order_date: order.order_date,
      delivery_address: order.delivery_address,
      has_name: !!order.user_name && order.user_name !== ""
    }));
    
    const stats = {
      total: orders.length,
      with_names: orders.filter(o => o.user_name && o.user_name !== "").length,
      without_names: orders.filter(o => !o.user_name || o.user_name === "").length
    };
    
    res.json({
      success: true,
      stats: stats,
      orders: formattedOrders
    });
    
  } catch (err) {
    console.error("Error fetching debug orders:", err);
    res.status(500).json({ 
      success: false, 
      message: "Database error" 
    });
  }
});

// --- GET USER STATISTICS ---
app.get("/api/user/:id/stats", async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
    
    // Get orders
    const orders = await Order.find({ user_id: userId });
    
    // Get cart
    const cart = await Cart.findOne({ user_id: userId });
    
    // Calculate statistics
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total_amount, 0);
    const lastOrder = orders.length > 0 ? orders[0] : null;
    
    // Get profile
    const profile = await UserProfile.findOne({ user_id: userId });
    
    res.json({
      success: true,
      statistics: {
        user: {
          email: user.email,
          created_at: user.created_at,
          last_login: user.last_login,
          login_count: user.login_count
        },
        profile: profile || {
          name: "",
          phone: "",
          address: "",
          profile_picture: ""
        },
        cart: {
          items_count: cart ? cart.items.length : 0,
          total_items: cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0
        },
        orders: {
          total: totalOrders,
          total_spent: totalSpent,
          last_order: lastOrder ? {
            id: lastOrder._id,
            date: lastOrder.order_date,
            amount: lastOrder.total_amount
          } : null
        }
      }
    });
    
  } catch (err) {
    console.error("Error getting user stats:", err);
    res.status(500).json({ 
      success: false, 
      message: "Database error" 
    });
  }
});

// --- GET ALL LOGIN ATTEMPTS WITH EMAILS ---
app.get("/api/admin/login-attempts", async (req, res) => {
  try {
    const { limit = 100 } = req.query;
    
    const loginAttempts = await LoginAttempt.find({})
      .sort({ attempt_time: -1 })
      .limit(parseInt(limit));
    
    // Format response with readable data
    const formattedAttempts = loginAttempts.map(attempt => ({
      _id: attempt._id,
      user_id: attempt.user_id,
      email: attempt.user_email || (attempt.user_id ? "User ID: " + attempt.user_id : "No email"),
      success: attempt.success,
      ip_address: attempt.ip_address,
      attempt_time: attempt.attempt_time,
      readable_time: new Date(attempt.attempt_time).toLocaleString(),
      status: attempt.success ? "✅ Success" : "❌ Failed"
    }));
    
    res.json({
      success: true,
      total: formattedAttempts.length,
      login_attempts: formattedAttempts
    });
    
  } catch (err) {
    console.error("Error fetching login attempts:", err);
    res.status(500).json({ 
      success: false, 
      message: "Database error" 
    });
  }
});

// --- GET LOGIN ATTEMPTS BY USER EMAIL ---
app.get("/api/login-attempts/:email", async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    
    // First find user
    const user = await User.findOne({ email: req.params.email.toLowerCase() });
    
    let loginAttempts;
    if (user) {
      // Get attempts by user_id
      loginAttempts = await LoginAttempt.find({ 
        $or: [
          { user_id: user._id },
          { user_email: req.params.email.toLowerCase() }
        ]
      })
      .sort({ attempt_time: -1 })
      .limit(parseInt(limit));
    } else {
      // Get attempts by email only
      loginAttempts = await LoginAttempt.find({ 
        user_email: req.params.email.toLowerCase() 
      })
      .sort({ attempt_time: -1 })
      .limit(parseInt(limit));
    }
    
    const userProfile = user ? await UserProfile.findOne({ user_id: user._id }) : null;
    
    res.json({
      success: true,
      user_found: !!user,
      user: user ? {
        _id: user._id,
        email: user.email,
        name: userProfile ? userProfile.name : "",
        login_count: user.login_count
      } : null,
      login_attempts: loginAttempts.map(attempt => ({
        ...attempt.toObject(),
        readable_time: new Date(attempt.attempt_time).toLocaleString()
      })),
      count: loginAttempts.length
    });
    
  } catch (err) {
    console.error("Error fetching login attempts by email:", err);
    res.status(500).json({ 
      success: false, 
      message: "Database error" 
    });
  }
});

// ===== EXISTING ROUTES =====

// --- GET USER PROFILE ---
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 }); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    // Get user profile for name
    const userProfile = await UserProfile.findOne({ user_id: req.params.id });
    
    // Get login history
    const loginHistory = await LoginAttempt.find({ user_id: req.params.id })
      .sort({ attempt_time: -1 })
      .limit(10);
    
    res.json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        name: userProfile ? userProfile.name : "",  // ← Include name
        created_at: user.created_at,
        last_login: user.last_login,
        login_count: user.login_count
      },
      login_history: loginHistory
    });
    
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

// --- GET ALL USERS (Admin only) ---
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ created_at: -1 });
    
    // Get profiles for all users
    const userIds = users.map(u => u._id);
    const profiles = await UserProfile.find({ user_id: { $in: userIds } });
    
    // Combine users with their profiles
    const usersWithProfiles = users.map(user => {
      const profile = profiles.find(p => p.user_id.toString() === user._id.toString());
      return {
        ...user.toObject(),
        name: profile ? profile.name : "",
        phone: profile ? profile.phone : "",
        address: profile ? profile.address : ""
      };
    });
    
    const totalUsers = await User.countDocuments();
    
    res.json({
      success: true,
      total_users: totalUsers,
      users: usersWithProfiles
    });
    
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

// --- UPDATE USER ---
app.put("/user/:id", async (req, res) => {
  try {
    const { email, password } = req.body;
    const updateData = {};
    
    if (email) updateData.email = email.toLowerCase();
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password"); // Exclude password from response
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    res.json({
      success: true,
      message: "User updated successfully",
      user: user
    });
    
  } catch (err) {
    console.error("Update user error:", err);
    
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Email already exists" 
      });
    }
    
    res.status(500).json({ success: false, message: "Database error" });
  }
});

// --- DELETE USER (ENHANCED FROM SERVER1) ---
app.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Delete ALL related data (FROM SERVER1)
    await Promise.all([
      LoginAttempt.deleteMany({ user_id: userId }),
      UserProfile.deleteOne({ user_id: userId }),
      Cart.deleteOne({ user_id: userId }),  // FROM SERVER1
      Order.deleteMany({ user_id: userId }),
      Checkout.deleteMany({ user_id: userId })  // FROM SERVER1
    ]);

    res.json({ success: true, message: "User and all related data deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from: ${frontendPath}`);
  console.log(`📧 Login page: http://localhost:${PORT}/login`);
  console.log(`👤 Profile page: http://localhost:3000/userp`);
  console.log(`👤 Profile page (alt): http://localhost:3000/userp.html`);
  console.log(`🏠 Home page: http://localhost:${PORT}/home`);
  console.log(`📊 MongoDB connected to: ${mongoose.connection.name}`);
  
  // List all available pages
  try {
    const files = fs.readdirSync(frontendPath);
    const htmlFiles = files.filter(f => f.toLowerCase().endsWith('.html'));
    
    console.log(`\n📚 Available Pages (${htmlFiles.length}):`);
    htmlFiles.forEach((file, i) => {
      const pageName = file.replace('.html', '');
      console.log(`  ${i + 1}. http://localhost:${PORT}/${pageName}`);
    });
    
    console.log(`\n🔧 Debug Endpoints:`);
    console.log(`  • http://localhost:${PORT}/debug-path`);
    console.log(`  • http://localhost:${PORT}/debug-userp`);
    console.log(`  • http://localhost:${PORT}/api/test-profile`);
    console.log(`  • http://localhost:${PORT}/debug-users`);
    console.log(`  • http://localhost:${PORT}/api/admin/login-attempts`);
    console.log(`  • http://localhost:${PORT}/api/orders/update-names`);
    console.log(`  • http://localhost:${PORT}/api/debug/orders`);
    
    console.log(`\n🛒 Cart & E-commerce Endpoints:`);
    console.log(`  • http://localhost:${PORT}/api/cart/:userId`);
    console.log(`  • http://localhost:${PORT}/api/checkout`);
    console.log(`  • http://localhost:${PORT}/api/contact`);
    
    console.log(`\n✅ Your COMPLETE website is ready with ALL features!`);
    console.log(`👉 Open http://localhost:${PORT} in your browser`);
    
  } catch (err) {
    console.log(`❌ Error reading files: ${err.message}`);
  }
});