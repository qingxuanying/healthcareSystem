
import { useState, useEffect } from "react";
import Input from "antd/es/input/Input";
import { Avatar, Button } from 'antd'
import './chatGPT.styl';

function ChatGPT() {
    const [question, setQuestion] = useState('');
    const [chat, setChat] = useState([]);
    const [messages, setmessages] = useState([])

    useEffect(() => {
        // console.log(question);
        // setChat(['请问我任何问题'])
        setmessages(
            [
                { role: 'system', content: 'You are a helpful assistant.' },
            ]
        )
    }, []);

    const qs = async () => {
        let a = []
        messages.map((i) => {
            a.push(i)
        })
        a.push({
            role: 'user',
            content: question
        })
        console.log(a)
        await setmessages(a)
        // console.log(messages)
        try {

            const apiKey = '';  // 替换为你的实际 API 密钥
            const endpoint = 'https://api.openai.com/v1/chat/completions';

            const requestBody = {
                model: "gpt-3.5-turbo",
                messages: a,
                max_tokens: 500,
            };
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data from OpenAI API');
            }
            const data = await response.json();
            const assistantResponse = data.choices[0].message.content;
            setmessages(
                [
                    ...messages,
                    {
                        role: 'system',
                        content: assistantResponse
                    }
                ]
            )
            //   const data = await response.json();
            //   const generatedText = data.choices[0].text;
            setChat([
                ...chat,
                assistantResponse
            ]);
            console.log(assistantResponse)
        } catch (error) {
            console.error('Error:', error.message);
            // 在此处添加适当的错误处理
        }
    };

    const changeQuestion = (e) => {
        setQuestion(e.target.value);
    };

    return (
        <div className="chat">
            <div className="body">
                <div className="chat-cotent">
                    <Avatar shape='circle' size={50} src='src/img/avatar.png' />
                    <div className="text">请提出问题</div>
                </div>
                {
                    chat.map((item, index) => {
                        return (
                            <div className="chat-cotent" key={index}>
                                <Avatar shape='circle' size={50} src='src/img/avatar.png' />
                                <div className="text">{item}</div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="footer">
                <Input onChange={changeQuestion} />
                <Button onClick={qs}>提问</Button>
            </div>
        </div>
    );
}

export default ChatGPT;
