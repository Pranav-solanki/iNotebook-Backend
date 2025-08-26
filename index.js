const connectToMongoose = require("./db");
const express = require("express");
connectToMongoose();
const port = 5000;
const app = express();

let cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
