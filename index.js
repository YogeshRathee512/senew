const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoConnect = require("./database");
const authrouter = require("./routers/authrouter");
const productrouter = require("./routers/productrouter");
const orderrouter = require("./routers/orderrouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", // Correct the origin
  })
);

mongoConnect();
app.use("/orders", orderrouter);
app.use("/auth", authrouter);
app.use("/products", productrouter);

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

const port = process.env.port || 4001;

app.listen(port, () => {
  console.log(`listing on port number , ${port}`);
});
