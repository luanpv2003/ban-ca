# Implementation Plan

- [x] 1. Initialize Next.js project with TypeScript and Tailwind CSS
  - Create Next.js 14+ project with App Router
  - Install and configure TypeScript
  - Install and configure Tailwind CSS
  - Set up project folder structure (app, lib, components)
  - Install required dependencies: @vercel/kv, formidable, form-data, node-fetch
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 2. Set up Vercel KV integration and data layer
  - Create lib/types.ts with Product and ProductFormData interfaces
  - Create lib/db.ts with Vercel KV client initialization
  - Implement getAllProducts() function to fetch all products from KV
  - Implement getProductById() function to fetch single product
  - Implement createProduct() function to create new product in KV
  - Implement updateProduct() function to update existing product
  - Implement deleteProduct() function to remove product from KV
  - _Requirements: 6.2, 6.3_

- [x] 3. Create image upload API route
  - Create app/api/upload/route.ts file
  - Implement POST handler using formidable to parse multipart form data
  - Validate uploaded file type and existence
  - Create FormData and forward file to Coolmate Media API
  - Parse Coolmate API response and extract image URL
  - Return formatted response with success status and image URL
  - Add error handling for upload failures
  - Configure CORS headers for API route
  - _Requirements: 7.2, 7.3, 7.4, 7.6_

- [x] 4. Build public product listing page
  - Create app/page.tsx for product listing
  - Fetch all products using getAllProducts() in Server Component
  - Create components/ProductCard.tsx component
  - Implement responsive grid layout (1 col mobile, 2 tablet, 3-4 desktop)
  - Display product image, title, original price (strikethrough), sale price
  - Add discount badge calculation if applicable
  - Implement loading state with skeleton cards
  - Implement empty state message
  - Add header with site branding for dried fish products
  - Style with warm color scheme (yellow, orange, brown tones)
  - Configure next/image for Coolmate Media domain
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 5. Build product detail page
  - Create app/products/[id]/page.tsx dynamic route
  - Fetch product by ID using getProductById()
  - Implement breadcrumb navigation
  - Create two-column layout (image left, info right, stacked on mobile)
  - Display large product image with zoom capability
  - Display product name, prices, savings amount
  - Add product highlights section (origin, quality, weight)
  - Display full description with formatting
  - Add call-to-action buttons (contact, order)
  - Implement loading state
  - Implement 404 page for non-existent products
  - Style for food product presentation
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 6. Create admin dashboard page
  - Create app/admin/page.tsx for admin dashboard
  - Create app/admin/layout.tsx with admin-specific layout
  - Fetch all products and display in table format
  - Show product thumbnail, title, prices in table
  - Add "Thêm sản phẩm mới" button linking to create page
  - Add Edit and Delete action buttons for each product
  - Implement responsive table design
  - _Requirements: 3.1, 4.1, 5.1_

- [x] 7. Build product creation functionality
  - Create app/admin/products/new/page.tsx
  - Create components/ProductForm.tsx reusable form component
  - Create components/ImageUpload.tsx for image upload with preview
  - Implement form fields: image upload, title, original price, sale price, description
  - Add client-side validation (required fields, sale price <= original price)
  - Create lib/actions.ts with createProductAction server action
  - Implement form submission handling
  - Add success message and redirect to admin dashboard
  - Add error handling and display error messages
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 7.1, 7.5_

- [x] 8. Build product edit functionality
  - Create app/admin/products/[id]/edit/page.tsx
  - Fetch existing product data and pre-populate ProductForm
  - Reuse ProductForm component with edit mode
  - Create updateProductAction server action in lib/actions.ts
  - Implement form submission with product ID
  - Add success confirmation message
  - Handle errors and display error messages
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 9. Implement product deletion functionality
  - Create components/DeleteButton.tsx with confirmation dialog
  - Create deleteProductAction server action in lib/actions.ts
  - Implement confirmation dialog before deletion
  - Call deleteProductAction on confirmation
  - Refresh page or update UI after successful deletion
  - Display success message after deletion
  - Handle errors and display error messages
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 10. Configure project for Vercel deployment
  - Create or update next.config.js with image domains configuration
  - Create .env.local.example with required environment variables
  - Create README.md with project description and deployment instructions
  - Document Vercel KV setup steps
  - Document environment variables needed
  - Add deployment checklist to README
  - _Requirements: 6.1, 6.4, 6.5_

- [x] 11. Add loading and error states polish
  - Enhance loading skeletons with shimmer effects
  - Create consistent error message components
  - Add toast notifications for success/error messages
  - Implement optimistic UI updates for admin actions
  - Add form submission loading states
  - _Requirements: 1.4, 2.4_

- [x] 12. Responsive design and mobile optimization
  - Test and refine mobile layouts for all pages
  - Ensure touch-friendly buttons and interactions
  - Optimize images for mobile devices
  - Test on various screen sizes
  - _Requirements: 1.1, 2.1_
