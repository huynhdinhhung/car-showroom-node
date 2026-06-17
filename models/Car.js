const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },       // Ví dụ: VinFast VF8
    brand: { type: String, required: true },      // Hãng: VinFast, Toyota...
    type: { type: String, required: true },       // Loại: SUV, Sedan...
    year: { type: Number, required: true },       // Năm sản xuất
    price: { type: Number, required: true },      // Giá bán (VNĐ)
    color: { type: String },                      // Màu sắc
    status: { type: String, default: 'Còn hàng' }, // Còn hàng, Hết hàng, Đặt trước
    description: { type: String }                 // Mô tả thêm
}, { timestamps: true }); // Tự động tạo trường createdAt và updatedAt để biết xe thêm lúc nào

module.exports = mongoose.model('Car', carSchema);
