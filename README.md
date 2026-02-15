🛒 TrendSetter E-CommerceA modern, full-stack E-Commerce application built with React, Redux Toolkit, and Node.js. This project features a dynamic product catalog, category-based filtering, and a seamless "Add to Cart" experience.✨ FeaturesDynamic Product Listing: Fetches real-time data from a Node.js/MongoDB backend.Smart Filtering: Filter products by category (Shirt, Jeans, Hoodies, etc.) with a custom-styled UI.Redux State Management: Global cart management using Redux Toolkit.Admin Product Creation: specialized form with image upload support and form validation.Responsive Design: Modern Flexbox/Grid layout that adapts to different screen sizes.Base64 Image Handling: Support for buffer-based image rendering from the database.🚀 Tech StackFrontend:React.js (Vite)Redux Toolkit (State Management)Axios (API Calls)Material UI (Snackbars & Alerts)Backend:Node.js & ExpressMongoDB (Database)Multer (Image Upload Processing)🛠️ Installation & Setup1. Clone the repositoryBashgit clone https://github.com/your-username/your-repo-name.git
cd your-repo-name 2. Frontend SetupBash# Navigate to frontend folder (if separate)
npm install
npm run dev 3. Backend SetupBash# Navigate to server folder
npm install

# Ensure your MongoDB is running and .env is configured

npm start
📸 ScreenshotsProduct Catalog & FiltersProduct Creation Form📂 Project StructurePlaintextsrc/
├── components/ # UI Components (ProductList, CreateProduct)
├── redux/ # Redux Slices (cartSlice.js, store.js)
├── assets/ # Global styles and images
└── App.jsx # Main Routing & Entry point
📝 API Endpoints (Local)MethodEndpointDescriptionGET/api/v1/productFetch all productsPOST/api/v1/product/createCreate a new product (Multipart/form-data)
