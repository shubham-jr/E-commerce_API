const app = require("./app.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./env/config.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
const port = 3333 || process.env.PORT;
mongoose
  .connect(DB)
  .then(() => {
    console.log("database connected successfully....");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
