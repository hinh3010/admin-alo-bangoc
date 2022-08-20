// import { useContext, useState } from 'react';
// import io from 'socket.io-client';
// import { REALTIME_URL } from '../api/urlConfig';
// import {SocketContext} from '../context/Context'

// let timeoutId;
// const useSocket = () => {
//   const [socket, setSocket] = useState();

//   const { profile, setProfile } = useContext(SocketContext);
//   const init = userId => {
//     // console.log('userId  ', userId, socket === undefined)
//     const socket = io(REALTIME_URL);
//     setSocket(socket);
//     socket.emit('setSocketId', `${userId}`);
//     return socket;

//     // socket.on('disconnect', () => {
//     //   socket.on('connect', () => {});
//     // });


//     // socket.on('setSocketId', msg => {});

//     // socket.on('user-online', msg => {
//     //   // console.log('socket userOnline  ', msg)
//     // });

//     // socket.on('join-room', msg => {
//     //   // console.log('my-event', msg);
//     // });

//     // socket.on('get_message', msg => {
//     //   if (msg.msg?.user?._id !== userId && userId) {
//     //   }
//     // });

//     // socket.on('is_typing', msg => {
//     //   // console.log('my-event', msg);
//     //   if (msg?.user?.userId !== userId) {
//     //   }
//     // });

//     // socket.on('io_notifi_send_admin', msg => {
//     //   if(msg){
//     //     return msg;
//     //   }
//     // });
    
//   };
  

//   const sendMessage = (message, roomId) => {
//     if (socket) {
//       // console.log('send_message', socket);
//       socket.emit('send_message', {
//         msg: message,
//         roomId,
//       });
//     }
//   };

//   const sendIsTyping = (roomId, user) => {
//     if (socket) {
//       // console.log('is_typing', socket);
//       socket.emit('is_typing', { roomId, user });
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         socket.emit('is_typing', { roomId, user: null });
//       }, 2000);
//     }
//   };

//   // const likeShare = () => {
//   //     socket.on('io_post_action', (msg) => {
//   //         console.log('io_post_action', msg)
//   //     })
//   // }

//   return {
//     socket,
//     init,
//     // joinRoom,
//     sendMessage,
//     sendIsTyping,
//   };
// };

// export default useSocket;
