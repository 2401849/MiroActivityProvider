import express from "express";
const app = express();

const port = 3000;

import { config } from "./routes/configuration/index.js";
import { analytics } from "./routes/analytics/index.js";
import { activity } from "./routes/activity/index.js";

app.use(express.json());

app.get("/configuration/parameters", config.parameters);
app.get("/configuration/interface", config.interface);

app.post("/analytics/", analytics.show);
app.get("/analytics/contract", analytics.contract);

app.post("/activity/", activity.deploy);
app.get("/activity/:id", activity.show);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
