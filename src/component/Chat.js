import React, { useCallback, useState } from "react";
import { Input, message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const opanAiKey = process.env.REACT_APP_OPENAI_API_KEY;

export default function Chat() {

    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const messagesContainer = useCallback((node) => {
        if (node !== null) {
            const scrollingElement = document.getElementById('test');
            const config = { childList: true };

            const callback = (mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        scrollingElement.scrollTo(0, scrollingElement.scrollHeight);
                    }
                }
            };

            const observer = new MutationObserver(callback);
            observer.observe(scrollingElement, config);
        }
    }, [])

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const handleSend = async (e) => {
        setLoading(true);
        setMessages(messages => [...messages, { author: 'me', content: e.target.value, sendAt: new Date() }]);
        setValue('');
        const result = await getResponse(value);

        if (result.error) {
            messageApi.open({
                type: 'error',
                content: result.error.message
            })
        } else if (result.choices.length) {
            setMessages(messages => [...messages, { author: 'his', content: result.choices[0].text, sendAt: new Date() }]);
        }

        setLoading(false);
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

    const loadingIcon = <LoadingOutlined style={{ fontSize: 16, color: 'white' }} spin />;

    return (
        <div className="chat_container">
            {contextHolder}

            <div className="messages_container" id="test" ref={messagesContainer}>
                {messages.map((message, index) => (
                    <div key={index} className={`message_chat ${message.author}`}>
                        <div className="message_chat_text">
                            {message.content}
                        </div>
                    </div>
                ))}

                {loading && <div className="message_chat his">
                    <div className="message_chat_text">
                        <Spin indicator={loadingIcon} />
                    </div>
                </div>}
            </div>

            <Input
                placeholder="Demandez moi ce que vous voulez"
                allowClear onChange={onChange}
                onPressEnter={handleSend}
                value={value}
            />
        </div>
    )
}