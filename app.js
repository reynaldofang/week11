const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();
const port = 8000;

app.use(bodyParser.json());

app.use("/", userRoutes);
app.use("/attendance", attendanceRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
