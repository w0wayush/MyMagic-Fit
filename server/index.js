const express = require("express");
const cors = require("cors");
const paymentRouter = require("./routes/payment");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", paymentRouter);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
