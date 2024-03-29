// initialize express APP
const express = require("express");
const app = express();

// load .env
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());

// create websocket server
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3000;

// --------------------------deployment------------------------------
const path = require("path");
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  console.log(process.env.NODE_ENV);
  app.use(express.static(path.join(__dirname1, "/client/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html")),
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

io.on("connection", (socket) => {
  // server will give front-end a specific id
  socket.emit("me", socket.id);

  // socket.on 是一個監聽器(listener)函數，用來監聽從客戶端發送到服務器的事件，建立基於事件驅動的實時應用程序的基礎，允許服務器和客戶端之間進行雙向通信
  // broadcast: 向所有已連接的客戶端發送一個消息，除了發送者，避免將消息回聲發送給發起動作的用戶
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({userToCall, signalData, from, name}) => {
    // io.to() 方法用於向特定房間(room)內的所有客戶端發送事件。這是實現針對特定群組或房間內用戶的通信的一種方式，而不是向所有連接到服務器的客戶端廣播。
    io.to(userToCall).emit("callUser", {signal: signalData, from, name});
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
