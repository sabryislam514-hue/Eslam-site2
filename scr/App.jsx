import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import Home from './pages/Home.jsx'
import Teacher from './pages/Teacher.jsx'
import CourseDetails from './pages/CourseDetails.jsx'
import Restaurant from './pages/Restaurant.jsx'
import Accessories from './pages/Accessories.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Checkout from './pages/Checkout.jsx'
import NotFound from './pages/NotFound.jsx'
import Admin from './admin/Admin.jsx'
import Overview from './admin/pages/Overview.jsx'
import HomeSettings from './admin/pages/HomeSettings.jsx'
import TeacherAdmin from './admin/pages/TeacherAdmin.jsx'
import RestaurantAdmin from './admin/pages/RestaurantAdmin.jsx'
import AccessoriesAdmin from './admin/pages/AccessoriesAdmin.jsx'
import OrdersAdmin from './admin/pages/OrdersAdmin.jsx'
import GeneralSettings from './admin/pages/GeneralSettings.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/teacher/:id" element={<CourseDetails />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/accessories/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Admin />} />
        <Route path="overview" element={<Overview />} />
        <Route path="home" element={<HomeSettings />} />
        <Route path="teacher" element={<TeacherAdmin />} />
        <Route path="restaurant" element={<RestaurantAdmin />} />
        <Route path="accessories" element={<AccessoriesAdmin />} />
        <Route path="orders" element={<OrdersAdmin />} />
        <Route path="settings" element={<GeneralSettings />} />
      </Route>
    </Routes>
  )
}