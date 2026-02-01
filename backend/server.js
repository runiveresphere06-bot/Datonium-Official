const sequelize = require("./config/database");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "DATONIUM backend running" });
});

const PORT = process.env.PORT || 4000;

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

sequelize.sync().then(() => {
  console.log("Database connected");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
