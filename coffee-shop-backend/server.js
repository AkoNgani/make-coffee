import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import sequelize from "./sequelize.js";
import Order from "./models/Order.js";
import Item from "./models/Item.js";

// Load environment variables
dotenv.config();

const { PORT, SESSION_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Serve Static Files (Logo, Favicon)
app.use(express.static("public"));

// Database Connection
sequelize
    .sync({ alter: true })
    .then(() => console.log("✅ Database synced"))
    .catch((err) => console.error("❌ Database sync failed:", err));

// AdminJS Setup
AdminJS.registerAdapter(AdminJSSequelize);

const admin = new AdminJS({
    databases: [sequelize],
    rootPath: "/admin",
    branding: {
        companyName: "Coffee Make Admin",
        logo: "/logo.jpg",  
        favicon: "/favicon.ico",
        theme: {
            colors: {
                primary100: "#4B2E2E", 
                primary80: "#6F4E37",
                primary60: "#A67B5B",
                primary40: "#D2B48C",
                primary20: "#F5DEB3",
                grey100: "#2C2C2C",
                grey80: "#4A4A4A",
                grey60: "#6A6A6A",
                grey40: "#8A8A8A",
                grey20: "#AAAAAA",
                filterBg: "#D2B48C",
                accent: "#8B4513", // Dark brown
            },
        },
    },
});

// AdminJS Authentication
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate: async (email, password) => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            return { email };
        }
        return null;
    },
    cookiePassword: SESSION_SECRET || "default-secret",
}, null, {
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET || "default-secret",
});

app.use(admin.options.rootPath, adminRouter);

// API Route
app.get("/", (req, res) => {
    res.send("Welcome to the Coffee Shop API!");
});

// Start Server
const SERVER_PORT = PORT || 5000;
app.listen(SERVER_PORT, () => {
    console.log(`🚀 Server running on http://localhost:${SERVER_PORT}`);
    console.log(`🛠️ AdminJS running on http://localhost:${SERVER_PORT}/admin`);
});
