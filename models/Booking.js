const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },  // Tên khách hàng
    phone: { type: String, required: true },         // Số điện thoại liên hệ
    carId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Car', 
        required: true 
    },                                               // ID của chiếc xe khách muốn xem
    appointmentDate: { type: Date, required: true }, // Ngày giờ đến xem xe
    notes: { type: String },                         // Ghi chú của khách
    status: { type: String, default: 'Chờ duyệt' }   // Chờ duyệt, Đã xác nhận, Đã hủy
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
