# Setup Vercel KV Storage

## Option 1: Sử dụng Vercel CLI (Recommended)

### Bước 1: Cài đặt Vercel CLI

```bash
npm i -g vercel
# hoặc
bun add -g vercel
```

### Bước 2: Login vào Vercel

```bash
vercel login
```

Làm theo hướng dẫn để login (email hoặc GitHub).

### Bước 3: Link project với Vercel

```bash
vercel link
```

Chọn:
- Set up and deploy? **No** (chỉ link, chưa deploy)
- Which scope? Chọn account của bạn
- Link to existing project? **No** (nếu chưa có) hoặc **Yes** (nếu đã có)
- What's your project's name? `vercel-product-management` (hoặc tên khác)
- In which directory is your code located? `./`

### Bước 4: Tạo Vercel KV Database

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project vừa tạo (hoặc tạo mới nếu chưa có)
3. Vào tab **Storage**
4. Click **Create Database**
5. Chọn **KV**
6. Đặt tên database: `product-kv` (hoặc tên khác)
7. Chọn region gần nhất (Singapore cho VN)
8. Click **Create**

### Bước 5: Pull Environment Variables

```bash
vercel env pull .env.local
```

Lệnh này sẽ tự động tạo file `.env.local` với các environment variables từ Vercel.

### Bước 6: Kiểm tra .env.local

File `.env.local` sẽ có nội dung như sau:

```env
KV_URL="redis://..."
KV_REST_API_URL="https://..."
KV_REST_API_TOKEN="..."
KV_REST_API_READ_ONLY_TOKEN="..."
```

### Bước 7: Chạy Development Server

```bash
bun dev
```

Truy cập http://localhost:3000 để test!

---

## Option 2: Manual Setup (Nếu không dùng CLI)

### Bước 1: Tạo Vercel Project và KV Database

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import GitHub repository (hoặc deploy từ local)
4. Sau khi project được tạo, vào tab **Storage**
5. Click **Create Database** → Chọn **KV**
6. Đặt tên và chọn region
7. Click **Create**

### Bước 2: Copy Environment Variables

1. Trong KV database dashboard, vào tab **Settings** hoặc **Quickstart**
2. Copy các environment variables:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

### Bước 3: Tạo file .env.local

Tạo file `.env.local` trong root directory:

```bash
touch .env.local
```

Paste các environment variables vào file:

```env
KV_URL="redis://..."
KV_REST_API_URL="https://..."
KV_REST_API_TOKEN="..."
KV_REST_API_READ_ONLY_TOKEN="..."
```

### Bước 4: Chạy Development Server

```bash
bun dev
```

---

## Kiểm tra Connection

Sau khi setup xong, test connection bằng cách:

1. Chạy dev server: `bun dev`
2. Truy cập http://localhost:3000
3. Vào admin panel: http://localhost:3000/admin
4. Thử tạo một sản phẩm mới
5. Kiểm tra xem sản phẩm có hiển thị trên trang chủ không

---

## Troubleshooting

### Lỗi: Missing required environment variables

**Nguyên nhân**: File `.env.local` chưa được tạo hoặc thiếu variables

**Giải pháp**:
- Kiểm tra file `.env.local` có tồn tại không
- Verify tất cả 4 environment variables đã được set
- Restart dev server sau khi thêm env variables

### Lỗi: Connection refused

**Nguyên nhân**: KV database chưa được tạo hoặc credentials sai

**Giải pháp**:
- Verify KV database đã được tạo trong Vercel Dashboard
- Copy lại environment variables từ Vercel
- Kiểm tra không có khoảng trắng thừa trong `.env.local`

### Lỗi: Unauthorized

**Nguyên nhân**: Token không hợp lệ hoặc đã expire

**Giải pháp**:
- Regenerate tokens trong Vercel KV dashboard
- Update `.env.local` với tokens mới
- Restart dev server

---

## Deploy lên Vercel

Sau khi test local thành công:

### Bước 1: Push code lên GitHub

```bash
git add .
git commit -m "Complete product management system"
git push origin main
```

### Bước 2: Deploy trên Vercel

```bash
vercel --prod
```

Hoặc deploy qua Vercel Dashboard:
1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Project sẽ tự động deploy khi có commit mới
3. Hoặc click **Deploy** để trigger manual deployment

### Bước 3: Verify Production

1. Truy cập production URL (vd: `https://your-project.vercel.app`)
2. Test tất cả features:
   - View product listing
   - View product detail
   - Admin CRUD operations
   - Image upload

---

## Next Steps

Sau khi setup thành công:

1. ✅ Test local development
2. ✅ Deploy to production
3. 🔄 Add authentication cho admin panel (optional)
4. 🔄 Add more features theo nhu cầu

Chúc bạn setup thành công! 🎉
