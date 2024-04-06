const socket = io("http://localhost:8000");

const form = document.getElementById("form");
const messageInp = document.getElementById("messageInp");
const msgContainer = document.getElementById("chats");


const append = (message, position) => {
    // console.log(msgContainer);
    const msgElement = document.createElement("div");
    msgElement.innerText = message;
    msgElement.classList.add("message");
    msgElement.classList.add(position);
    console.log(msgElement);
    msgContainer.appendChild(msgElement);
}

const namee = prompt("Enter your name : ");
socket.emit("new-user-joined", namee);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = messageInp.value;
    append(`You : ${msg}`, "right");
    messageInp.value = "";
    socket.emit("send", msg);
});

socket.on("user-joined", (name) => {
    if(name !== null){
        append(`${name} joined the chat`, "center");
    }   
});

socket.on("received", (data) => {
    if(data !== null){
        append(`${data.user} : ${data.message}`, "left");
    }
});

socket.on("left-chat", (user) => {
    if(user !== null){
        append(`${user} left the chat!`, "center");
    }
});
// socket.emit("hello", "gammo");