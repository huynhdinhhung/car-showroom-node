# 1. Chọn môi trường chạy là Node.js phiên bản 20
FROM node:20-alpine

# 2. Tạo thư mục làm việc bên trong container
WORKDIR /app

# 3. Copy file package.json vào trước để cài thư viện
COPY package*.json ./

# 4. Cài đặt các thư viện
RUN npm install

# 5. Copy toàn bộ code còn lại vào container
COPY . .

# 6. Mở cổng 5000 để container giao tiếp với bên ngoài
EXPOSE 5000

# 7. Lệnh để chạy ứng dụng
CMD ["npm", "start"]
