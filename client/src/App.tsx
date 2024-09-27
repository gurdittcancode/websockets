import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [latestMessage, setLatestMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    };

    socket.onmessage = (message) => {
      console.log("Received message: ", message.data);
      setLatestMessage(message.data);
    };

    return () => {
      socket.close();
    };
  }, []);

  if (!socket) {
    return <div>Connecting to socket</div>;
  }
  return (
    <div>
      <div>
        <input onChange={(e) => setMessage(e.target.value)} />
        <button onClick={() => socket.send(message)}>Send</button>
      </div>
      <div>{latestMessage}</div>
    </div>
  );
}

export default App;
