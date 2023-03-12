import React, { useRef } from 'react'
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import { auth } from '@/firebase';
import {useCollectionData} from 'react-firebase-hooks/firestore'


export default function ChatRoom() {
    const firestore = firebase.firestore();
    const msgRef = firestore.collection('messages')
    const query = msgRef.orderBy('createdAt').limit(25)
    const [formValue, setFormValue] = React.useState('');
    const dummy = useRef();

    const [messages, loading, error, snapshot] = useCollectionData(query, { idField: 'id' });

    const sendMessage = async (e) => {
        e.preventDefault();
    
        const { uid, photoURL } = auth.currentUser;
    
        await msgRef.add({
          text: formValue,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoURL
        })
    
        setFormValue('');
        dummy.current && dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

  return (
    <>
    <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    </div>
    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice..." />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
    </>
  )
}

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://xsgames.co/randomusers/avatar.php?g=pixel'} />
        <p>{text}</p>
      </div>
    </>
    )
}
