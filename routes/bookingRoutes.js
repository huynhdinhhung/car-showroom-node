const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// 1. API: Khách hàng gửi yêu cầu đặt lịch hẹn (POST http://localhost:5000/api/bookings)
router.post('/', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        res.status(201).json({ message: "📅 Đặt lịch hẹn thành công! Nhân viên sẽ gọi lại cho bạn.", data: savedBooking });
    } catch (error) {
        res.status(400).json({ message: "❌ Lỗi khi đặt lịch", error: error.message });
    }
});

// 2. API: Admin lấy toàn bộ lịch hẹn ra xem (GET http://localhost:5000/api/bookings)
// 🔥 Sử dụng .populate('carId') để lôi toàn bộ thông tin xe đi kèm ra luôn
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('carId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "❌ Lỗi khi lấy danh sách lịch hẹn", error: error.message });
    }
});

module.exports = router;
// 3. API: Sửa trạng thái lịch hẹn (PUT http://localhost:5000/api/bookings/:id)
router.put('/:id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status }, 
            { new: true }
        );
        if (!updatedBooking) return res.status(404).json({ message: "❌ Không tìm thấy lịch hẹn này" });
        res.status(200).json({ message: "🎉 Cập nhật lịch hẹn thành công!", data: updatedBooking });
    } catch (error) {
        res.status(400).json({ message: "❌ Lỗi khi cập nhật lịch hẹn", error: error.message });
    }
});
