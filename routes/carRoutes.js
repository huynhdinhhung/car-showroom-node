const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// 1. API: Thêm xe mới (POST http://localhost:5000/api/cars)
router.post('/', async (req, res) => {
    try {
        const newCar = new Car(req.body);
        const savedCar = await newCar.save();
        res.status(201).json({ message: "🎉 Thêm xe thành công!", data: savedCar });
    } catch (error) {
        res.status(400).json({ message: "❌ Lỗi khi thêm xe", error: error.message });
    }
});

// 2. API: Lấy danh sách tất cả xe (GET http://localhost:5000/api/cars)
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: "❌ Lỗi khi lấy danh sách xe", error: error.message });
    }
});

module.exports = router;
// 3. API: Sửa thông tin hoặc trạng thái xe (PUT http://localhost:5000/api/cars/:id)
router.put('/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCar) return res.status(404).json({ message: "❌ Không tìm thấy xe này" });
        res.status(200).json({ message: "🎉 Cập nhật thành công!", data: updatedCar });
    } catch (error) {
        res.status(400).json({ message: "❌ Lỗi khi cập nhật", error: error.message });
    }
});

// 4. API: Xóa xe khỏi hệ thống (DELETE http://localhost:5000/api/cars/:id)
router.delete('/:id', async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) return res.status(404).json({ message: "❌ Không tìm thấy xe này" });
        res.status(200).json({ message: "🗑️ Đã xóa xe thành công!" });
    } catch (error) {
        res.status(500).json({ message: "❌ Lỗi khi xóa xe", error: error.message });
    }
});
