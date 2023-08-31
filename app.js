const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yaml");
const fs = require("fs");

const openApiPath = "swagger.yaml";
const file = fs.readFileSync(openApiPath, "utf8");
const swaggerDocument = yaml.parse(file);

const app = express();
const port = 8000;

app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", userRoutes);
app.use("/attendance", attendanceRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
