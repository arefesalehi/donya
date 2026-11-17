/* eslint-disable no-undef */
require("dotenv").config();
const app = require("./app");
const connectDB = require("./db");

// اجرای لوکال و Render
if (require.main === module) {
  connectDB()
    .then(() => {
      const port = +process.env.PORT || 3000;
      app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

// اجرا روی Vercel (serverless)
module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "DB connection failed" });
  }
  return app(req, res);
};