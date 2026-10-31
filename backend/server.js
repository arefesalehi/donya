// const dotenv = require('dotenv');
// const { default: mongoose } = require('mongoose');
// const app = require('./app');

// //* Load env
// dotenv.config();

// //* Database connection
// (async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (err) {
//     //?error catch
//     console.log(err);
//     process.exit(1);
//   }
// })();


// const port = +process.env.PORT || 3000;

// const productionMode = process.env.NODE_ENV === 'production'
// app.listen(port, () => {
//   console.log(`Server running in ${productionMode?"production":"development"} mode on port ${port}`);
// });


require("dotenv").config();
const app = require("./app");
const connectDB = require("./db");

// اجرای لوکال
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

// اجرا روی ورسل
module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "DB connection failed" });
  }
  return app(req, res);
};