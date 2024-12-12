require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { errorHandler } = require("./middleware/errorHandler");
const {connectDB} = require('./config/db');

const authRoutes = require("./routes/authRoutes");
const qrRoutes = require("./routes/qrRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/qr", qrRoutes);
app.use("/", analyticsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
