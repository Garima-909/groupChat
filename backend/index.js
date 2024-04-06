const io = require("socket.io")(8000, {
    cors: {
        origin: "*"
    }
});

const users = {};

io.on("connection", (socket) => {

    // socket.on("hello" , (a) => {
    //     console.log("msg received");
    // });

    socket.on("new-user-joined", (name) => {
        users[socket.id] = name;
        console.log(name + " joined!");
        socket.broadcast.emit("user-joined", name);
    });

    socket.on("send", (message) => {
        // console.log("msg is : " + message);
        socket.broadcast.emit("received", {message: message, user: users[socket.id]});
    });

    socket.on("disconnect", (message) => {
        socket.broadcast.emit("left-chat", users[socket.id]);
        delete users[socket.id];
    });
});


