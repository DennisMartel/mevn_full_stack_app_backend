const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// connecting to database
mongoose.set("strictQuery", false)
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("base de datos conectada correctamente"))
.catch(err => console.log(`error al conectar a la base de datos ${err}`));

// router
app.use("/api/posts", require("./routes/posts.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

// start server
app.listen(PORT, () => console.log(`servidor corriendo en el puerto ${PORT}`));