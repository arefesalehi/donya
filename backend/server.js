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
<<<<<<< HEAD
  return app(req, res);
};
=======
})();


const port = +process.env.PORT || 4000;

const productionMode = process.env.NODE_ENV === 'production'
app.listen(port, () => {
  console.log(`Server running in ${productionMode?"production":"development"} mode on port ${port}`);
});


const cors = require("cors");
app.use(cors({ origin: process.env.CLIENT_URL }));
>>>>>>> f52928fe8deec50b72398188bd43a3d6f7ad3e48
