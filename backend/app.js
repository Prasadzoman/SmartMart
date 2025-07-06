require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/product");
const { detectCondition } = require("./script/medModel");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const userRouter=require("./routes/user");
const orderRouter=require("./routes/order");
const cartRouter=require("./routes/cart")
const reorderRouter = require('./routes/reorder');
const productRouter=require("./routes/product")
const chatbotRouter=require("./routes/chatbot")
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gdfl9i8.mongodb.net/SmartMart?retryWrites=true&w=majority&appName=Cluster0`

// Middleware
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//auth setup

app.use(
  session({
    secret: "your-secret-key", 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: url }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: "email" }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/product", productRouter);

app.use("/chatbot", chatbotRouter);

app.use("/user",userRouter);

app.use("/orders",orderRouter);

app.use("/cart",cartRouter);

app.use('/reorder', reorderRouter);
// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
