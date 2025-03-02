const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080; // Railway otomatis mengatur PORT

app.use(cors()); // Pastikan frontend bisa akses
app.use(bodyParser.json());

app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    let botReply = "Saya di sini untuk mendengarkan. Bisa ceritakan lebih lanjut? 😊";

    // Respon Berdasarkan Mood & Topik
    const responses = {
        "halo": "Halo! Saya MentalCare Bot. Bagaimana perasaan Anda hari ini?",
        "apa kabar": "Saya baik! Terima kasih sudah bertanya. Bagaimana dengan Anda?",
        "senang": "Wah, saya ikut senang mendengarnya! Apa yang membuat Anda bahagia hari ini? 😊",
        "sedih": "Saya mengerti. Berbicara dengan seseorang bisa membantu. Saya di sini untuk mendengarkan. 💙",
        "marah": "Saya paham, kemarahan adalah emosi yang normal. Mungkin menarik napas dalam bisa membantu?",
        "kecewa": "Saya mengerti perasaan kecewa itu tidak mudah. Anda ingin berbicara lebih lanjut?",
        "suntuk": "Coba lakukan sesuatu yang menyenangkan, seperti jalan-jalan atau mendengarkan musik! 🎵",
        "biasa saja": "Tidak apa-apa merasa biasa saja. Kadang-kadang, menjalani hari dengan tenang juga baik.",
        "takut": "Tarik napas dalam-dalam, Anda tidak sendirian. Mau cerita lebih lanjut?",
        "stress": "Stres memang berat. Cobalah teknik relaksasi seperti meditasi atau mendengarkan musik.",
        "capek": "Istirahatlah sejenak. Mungkin secangkir teh hangat bisa membantu. 🍵",
        "hobi": "Saya suka mendengarkan cerita Anda! Apa hobi yang Anda sukai?",
        "pekerjaan": "Saya adalah chatbot yang siap menemani Anda. Anda bekerja di bidang apa?",
        "kegiatan": "Saya hanya menunggu Anda untuk mengobrol 😊. Ada yang ingin Anda ceritakan?",
        "cuaca": "Saya tidak bisa melihat cuaca, tapi Anda bisa mengeceknya di aplikasi cuaca. ☀️",
        "makanan favorit": "Saya tidak makan, tapi banyak orang suka nasi goreng dan ayam bakar! Anda suka apa?",
        "saran aktivitas": "Bagaimana kalau mencoba sesuatu yang menyenangkan, seperti membaca buku atau menonton film?",
        "motivasi": "Jangan menyerah! Setiap hari adalah kesempatan baru untuk menjadi lebih baik. 💪✨",
        "cerita lucu": "Kenapa ayam nyebrang jalan? Karena mau ke seberang! 🐔😂",
        "kamu siapa": "Saya MentalCare Bot, siap menemani Anda kapan saja!",
        "siapa pembuatmu": "Saya dibuat oleh seorang pengembang yang ingin membantu orang-orang merasa lebih baik! 😊"
    };

    for (let key in responses) {
        if (userMessage.includes(key)) {
            botReply = responses[key];
            break;
        }
    }

    res.json({ reply: botReply });
});

// Pastikan server berjalan di PORT yang tersedia di Railway
app.listen(8080, () => console.log(`✅ MentalCare Bot berjalan di port http://10.250.17.201:8080`));
