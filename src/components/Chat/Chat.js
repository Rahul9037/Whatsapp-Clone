import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../contextAPI/StateProvider';
import firebase from "firebase";
import db from '../../firebase';

function Chat() {

    const [input, setInput] = useState('');
    const [roomName, setRoomName] = useState('');
    const { roomId } = useParams();
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user} , dispatch] = useStateValue();

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId)
                .onSnapshot(
                    snapShot => (setRoomName(snapShot.data().name))
                )
            db.collection('rooms').doc(roomId).collection('messages')
                .orderBy('timestamp', 'asc').onSnapshot(
                    snapShot => (setMessages(snapShot.docs.map
                        (doc => doc.data())
                    )))
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        //to sent message
        db.collection('rooms').doc(roomId)
        .collection('messages').add({
            message : input,
            name: user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('');
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    {messages.length > 0 ? (<p>Last message at{" "}
                        {new Date( messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>) : null}
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => 
                    (<p key={message} className={`chat__message ${message.name === user.displayName && `chat__reciever`}`}>
                        <span className="chat__name">{message.name}</span>
                            {message.message}
                        <span className="chat__timestamp">
                            {
                                new Date(message.timestamp?.toDate()).toUTCString()
                            }
                        </span>
                    </p>))}

            </div>
            <div className="chat__footer">
                <EmojiEmotionsIcon />
                <form>
                    <input onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text" value={input} />
                    <button type="submit" onClick={sendMessage}>Sent Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
