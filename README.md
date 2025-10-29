# Cá Khô Đặc Sản - Product Management System

Hệ thống quản lý sản phẩm e-commerce chuyên về đồ khô (cá khô) được xây dựng trên Next.js 15 với App Router, TypeScript, Tailwind CSS và Vercel KV.

## Tính năng

### Public Pages
- 🏠 **Trang chủ**: Hiển thị danh sách sản phẩm với grid layout responsive
- 📦 **Chi tiết sản phẩm**: Xem thông tin chi tiết, giá, mô tả, hướng dẫn bảo quản
- 🎨 **UI/UX**: Thiết kế phù hợp với sản phẩm thực phẩm, màu sắc ấm áp

### Admin Panel
- ➕ **Thêm sản phẩm**: Form tạo sản phẩm mới với upload ảnh
- ✏️ **Sửa sản phẩm**: Cập nhật thông tin sản phẩm
- 🗑️ **Xóa sản phẩm**: Xóa sản phẩm với confirmation dialog
- 📊 **Dashboard**: Quản lý tất cả sản phẩm trong bảng

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Vercel KV (Redis)
- **Image Upload**: Coolmate Media API
- **Package Manager**: Bun
- **Deployment**: Vercel

## Cài đặt

### Prerequisites

- Node.js 18+ hoặc Bun
- Tài khoản Vercel

### Local Development

1. Clone repository:
```bash
git clone <repository-url>
cd vercel-product-management
```

2. Cài đặt dependencies:
```bash
bun install
```

3. Tạo file `.env.local` (copy từ `.env.local.example`):
```bash
cp .env.local.example .env.local
```

4. Cấu hình Vercel KV (xem phần Vercel KV Setup bên dưới)

5. Chạy development server:
```bash
bun dev
```

6. Mở [http://localhost:3000](http://localhost:3000)

## Vercel KV Setup

### Option 1: Local Development với Vercel CLI

1. Cài đặt Vercel CLI:
```bash
npm i -g vercel
```

2. Login vào Vercel:
```bash
vercel login
```

3. Link project với Vercel:
```bash
vercel link
```

4. Pull environment variables:
```bash
vercel env pull .env.local
```

### Option 2: Manual Setup

1. Tạo Vercel KV database tại [Vercel Dashboard](https://vercel.com/dashboard)
2. Copy các environment variables vào `.env.local`:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

## Deployment lên Vercel

### Bước 1: Push code lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Bước 2: Deploy trên Vercel

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import GitHub repository
4. Vercel sẽ tự động detect Next.js project
5. Click "Deploy"

### Bước 3: Thêm Vercel KV Storage

1. Trong project dashboard, vào tab "Storage"
2. Click "Create Database"
3. Chọn "KV"
4. Đặt tên database và chọn region
5. Click "Create"
6. Environment variables sẽ tự động được thêm vào project

### Bước 4: Redeploy

Sau khi thêm KV storage, trigger một deployment mới để áp dụng environment variables:
- Push một commit mới, hoặc
- Click "Redeploy" trong Deployments tab

## Project Structure

```
/
├── app/
│   ├── page.tsx                    # Product listing page
│   ├── products/
│   │   └── [id]/
│   │       ├── page.tsx            # Product detail page
│   │       └── not-found.tsx       # 404 page
│   ├── admin/
│   │   ├── page.tsx                # Admin dashboard
│   │   ├── layout.tsx              # Admin layout
│   │   └── products/
│   │       ├── new/
│   │       │   └── page.tsx        # Create product
│   │       └── [id]/
│   │           └── edit/
│   │               └── page.tsx    # Edit product
│   ├── api/
│   │   └── upload/
│   │       └── route.ts            # Image upload API
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── lib/
│   ├── db.ts                       # Vercel KV operations
│   ├── types.ts                    # TypeScript types
│   └── actions.ts                  # Server actions
├── components/
│   ├── ProductCard.tsx             # Product card component
│   ├── ProductForm.tsx             # Product form component
│   ├── ImageUpload.tsx             # Image upload component
│   └── DeleteButton.tsx            # Delete button with confirmation
├── next.config.js                  # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
└── package.json
```

## Environment Variables

Các environment variables cần thiết (tự động được set bởi Vercel khi thêm KV storage):

```env
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```

## Deployment Checklist

- [ ] Code đã được push lên GitHub
- [ ] Project đã được import vào Vercel
- [ ] Vercel KV storage đã được tạo và linked
- [ ] Environment variables đã được set
- [ ] Deployment thành công
- [ ] Test CRUD operations trên production
- [ ] Test image upload trên production
- [ ] Kiểm tra responsive design trên mobile

## Scripts

```bash
# Development
bun dev

# Build
bun run build

# Start production server
bun start

# Lint
bun run lint
```

## API Routes

### POST /api/upload

Upload image to Coolmate Media API.

**Request**: multipart/form-data with `file` field

**Response**:
```json
{
  "success": true,
  "url": "https://media.coolmate.me/..."
}
```

## Database Schema

### Product

```typescript
{
  id: string;              // UUID
  title: string;           // Product name
  description: string;     // Full description
  originalPrice: number;   // Original price
  salePrice: number;       // Sale price
  imageUrl: string;        // Coolmate Media URL
  createdAt: number;       // Timestamp
  updatedAt: number;       // Timestamp
}
```

### Vercel KV Keys

- `products:list` - Set of product IDs
- `product:{id}` - Product object

## Troubleshooting

### Build errors

Nếu gặp lỗi build, kiểm tra:
- TypeScript errors: `bun run build`
- Dependencies: `bun install`

### Vercel KV connection errors

- Kiểm tra environment variables đã được set đúng
- Verify KV storage đã được linked với project
- Check Vercel logs trong dashboard

### Image upload errors

- Kiểm tra file size (max 5MB)
- Verify file type (JPEG, PNG, WebP)
- Check Coolmate Media API status

## License

MIT

## Support

Nếu gặp vấn đề, vui lòng tạo issue trên GitHub repository.
