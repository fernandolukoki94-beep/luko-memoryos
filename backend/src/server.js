require('dotenv').config();
const express = require('express');
const cors = require('cors');

app.use(cors());
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);
const memoryRoutes = require("./routes/memoryRoutes");
app.use("/api/memories", memoryRoutes);
const mediaRoutes = require("./routes/mediaRoutes");
app.use("/api/media", mediaRoutes);
const commentRoutes = require("./routes/commentRoutes");
app.use("/api/comments", commentRoutes);
const futureMessageRoutes = require("./routes/futureMessageRoutes");
app.use("/api/future-messages", futureMessageRoutes);

app.get("/", (req, res) => {
  res.send("Luko Memories Backend is running!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
