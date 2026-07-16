require('dotenv').config();
const express = require('express');
const cors = require('cors');
const securityMiddleware = require('./middleware/security');

const app = express();
const port = process.env.PORT || 3001;

// Middlewares de segurança
app.use(securityMiddleware.securityHeaders);
app.use(securityMiddleware.rateLimit(15 * 60 * 1000, 100));
app.use(securityMiddleware.validateInput);
app.use(securityMiddleware.detectAttacks);
app.use(securityMiddleware.securityLog);

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const memoryRoutes = require("./routes/memoryRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const commentRoutes = require("./routes/commentRoutes");
const futureMessageRoutes = require("./routes/futureMessageRoutes");
const lifeEventRoutes = require("./routes/lifeEventRoutes");
const aiTransformationRoutes = require("./routes/aiTransformationRoutes");

app.use("/api/users", userRoutes);
app.use("/api/memories", memoryRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/future-messages", futureMessageRoutes);
app.use("/api/life-events", lifeEventRoutes);
app.use("/api/ai-transformations", aiTransformationRoutes);

app.get("/", (req, res) => {
  res.send("Luko Memories Backend is running!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
