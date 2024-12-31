import express from "express";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";
import mainRouter from "./routes/route.index";
import { schedulePost, scheduleArchival } from "./middleware/schedulePost";
import connectDb from "./utils/connectDb";
import { errorHandler } from "./utils/errorHandler";

const PORT = process.env.PORT || 4000;

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://api.bagbhairabbhs.edu.np/api",
    "http://localhost:5173/",
    "https://admin-codecraft.netlify.app/",
    "https://admin.codynn.com/",
    "https://codynn.com/",
    "http://localhost:3000/",
    "http://127.0.0.1:3000/",
    "http://localhost:5050/",
    "https://betacompiler.codynn.com/",
    "http://localhost:5174/",
    "http://localhost:5413/",
    "http://localhost:9787/",
    "https://beta.codynn.com/",
    "https://betachallenges.codynn.com/",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(express.json({ limit: "30mb" }));

app.use(cookieParser());

app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "server is up and running..." });
});

schedulePost();
scheduleArchival();

app.use("/api", mainRouter);
app.use(errorHandler);

const server = http.createServer(app);
connectDb()
  .then(() => {
    server.listen(PORT, () => console.log(`server is listening to port ${PORT}`));
  })
  .catch((err) => console.log("error", err));

