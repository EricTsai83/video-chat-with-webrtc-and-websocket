import {createContext, useState, useRef, useEffect} from "react";
import {io} from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
// process.env is setting from vercel
// const socketEndpoint = "http://localhost:3000";
const socketEndpoint =
  "https://back-end-video-chat-with-webrtc-and.onrender.com:10000";
const socket = io(socketEndpoint);

function SocketContextProvider({children}) {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({video: true, audio: true})
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({from, name: callerName, signal}) => {
      setCall({isReceivingCall: true, from, name: callerName, signal});
    });
  }, []);

  function answerCall() {
    setCallAccepted(true);
    // initiator: false: This option indicates whether the peer is the initiating peer in
    // the connection or not. When set to true, the peer will attempt to start the
    // connection process. If false, the peer will wait for an initiating peer to start
    // the connection process.
    const peer = new Peer({initiator: false, trickle: false, stream});
    // peer.on(event, callback) 是用來監聽對對等連接 event 所要執行的函式
    peer.on("signal", (data) => {
      socket.emit("answerCall", {signal: data, to: call.from});
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    // 當你透過某種訊號機制（例如WebSocket、XHR 或任何其他方式）從遠端對等方接收到訊號資料時，
    // 你需要將這些資料傳遞給 peer.signal 方法來繼續進行連線的建立或維護流程。
    peer.signal(call.signal);

    connectionRef.current = peer;
  }

  function callUser(id) {
    const peer = new Peer({initiator: true, trickle: false, stream});

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    // user 接獲對方接受電話的通知
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  }

  function leaveCall() {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  }

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}>
      {children}
    </SocketContext.Provider>
  );
}

export {SocketContextProvider, SocketContext};
