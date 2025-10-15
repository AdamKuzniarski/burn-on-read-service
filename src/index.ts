import "dotenv/config";
import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import nunjucks from "nunjucks";
import { logger } from "./middlewares/loggerMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const nunEnv = nunjucks.configure("src/templates", {
  autoescape: true,
  express: app,
});

app.get("/", (req: Request, res: Response) => {
  res.render("index.html", {
    title: "Home Page",
  });
});

app.post("/secret", (req: Request, res: Response) => {
  const secret = req?.body?.secret;
  // ... Secret speichern, Link generieren ...
  console.log(req.body);
  // res.render('secret_link.njk', { link: generatedLink });
});

app.get("/secret/:secret", (req: Request, res: Response) => {
  const secret = req.params.secret;

  if (!secret) {
    return res.status(404).send("Secret not found!");
  }

  res.render("secret.html", {
    secret,
  });
});

app.listen(PORT, () => {
  console.log(`server is Running at http://localhost:${PORT}`);
});
