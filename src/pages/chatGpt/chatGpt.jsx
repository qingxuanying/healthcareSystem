
import { useState, useEffect } from "react";
import Input from "antd/es/input/Input";
import { Button } from "antd";
import './chatGPT.styl';

function ChatGPT() {
    const [question, setQuestion] = useState('');
    const [chat, setChat] = useState([]);
    const [messages, setmessages] = useState([])

    useEffect(() => {
        console.log(question);
        setChat(['请问我任何问题'])
        setmessages(
            [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: question }
            ]
        )
    }, [question]);

    const qs = async () => {
        try {

            const apiKey = '132';  // 替换为你的实际 API 密钥
            const endpoint = 'https://api.openai.com/v1/chat/completions';

            const requestBody = {
                model:"gpt-3.5-turbo",
                messages: messages,
                max_tokens: 100,
                stop: ['\n']
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
            setChat(assistantResponse);
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
                {
                    chat.map((item)=>{
                        return(
                            <div key={item}></div>
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
