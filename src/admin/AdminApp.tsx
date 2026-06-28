import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import AdminLayout from './AdminLayout';
import Login from './Login';
import Dashboard from './Dashboard';
import ProductsAdmin from './ProductsAdmin';
import ProductForm from './ProductForm';
import Submissions from './Submissions';

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:rowId" element={<ProductForm />} />
          <Route path="submissions" element={<Submissions />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
}
