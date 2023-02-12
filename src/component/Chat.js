import React, { useEffect, useState } from "react";
import { Input, message } from 'antd';
export default function Chat() {

    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const opanAiKey = process.env.REACT_APP_OPENAI_API_KEY

    console.log(opanAiKey)

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const handleSend = async (e) => {
        setMessages(messages => [...messages, { author: 'me', content: e.target.value, sendAt: new Date() }]);
        setValue('');
        const result = await getResponse(value);
        console.log(result)
        if (result.error) {
            messageApi.open({
                type: 'error',
                content: result.error.message
            })
        } else if (result.choices.length) {
            setMessages(messages => [...messages, { author: 'his', content: result.choices[0].text, sendAt: new Date() }]);
        }
    }

    const getResponse = async (value) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${opanAiKey}`);
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "model": "text-davinci-003",
                "prompt": value,
                "temperature": 0,
                "max_tokens": 2048
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch('https://api.openai.com/v1/completions', requestOptions);

            return response.json();
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: error
            });
        }
    }

    return (
        <div className="chat_container">
            {contextHolder}
            <Input
                placeholder="Demandez moi ce que vous voulez"
                allowClear onChange={onChange}
                onPressEnter={handleSend}
                value={value}
            />

            <div className="messages_container">
                {messages.map((message, index) => (
                    <div key={index} className={`message_chat ${message.author}`}>
                        <div className="message_chat_text">
                            {message.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}