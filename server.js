const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Tải cấu hình từ file .env
dotenv.config();

const app = express();

// Middleware để đọc dữ liệu JSON gửi lên từ Client
app.use(express.json());
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Đã kết nối thành công tới MongoDB'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// Đường dẫn (Route) chạy thử ban đầu
app.get('/', (req, res) => {
    res.send('Chào mừng bạn đến với API Web Bán Xe Ô Tô!');
});

// Bật Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy cực mượt tại cổng ${PORT}`);
});
