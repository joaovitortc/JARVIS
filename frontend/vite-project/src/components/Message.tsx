import React, { useEffect, useState } from 'react';

export default function Message(props) {
    const [audioKey, setAudioKey] = useState(Date.now());

    useEffect(() => {
        if (props.sender === 'ChatGPT') {
            setAudioKey(Date.now());
        }
    }, [props]);

    return (
        <div key={props.index} className={`message ${props.sender}`}>
            <div>
                {props.sender}
            </div>
            <div>
                {props.text}
            </div>
            
            {props.sender === 'ChatGPT' 
            ? <audio controls src={`http://localhost:8080/audios/output.mp3?${Date.now()}`}>Play</audio> 
            : null}
        </div>
    );
}