import React, { useState, useRef, useEffect } from 'react';

// Ganti dengan URL backend yang telah dideploy di Railway
const API_URL = 'https://mentalcare-bot-production.up.railway.app/api/chat';

function Chatbot() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [error, setError] = useState(null);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    const sendMessage = async () => {
        if (!message.trim()) return; // Cegah pengiriman pesan kosong
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            if (!response.ok) throw new Error('Gagal menghubungi server');

            const data = await response.json();
            setChat([...chat, { user: message, bot: data.reply }]);
            setMessage('');
            setError(null); // Reset error jika sukses
        } catch (error) {
            console.error('Error:', error);
            setError('⚠️ Gagal terhubung ke server. Coba lagi nanti!');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center', fontFamily: 'Arial' }}>
            <h2>Chatbot</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto', backgroundColor: '#f9f9f9' }}>
                {chat.map((c, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <p><strong>Pengguna:</strong> {c.user}</p>
                        <p><strong>Chatbot:</strong> {c.bot}</p>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ketik pesan..." 
                style={{ width: '80%', padding: '8px', marginTop: '10px' }}
            />
            <button onClick={sendMessage} style={{ padding: '8px', marginLeft: '5px' }}>Kirim</button>
        </div>
    );
}

export default Chatbot;
