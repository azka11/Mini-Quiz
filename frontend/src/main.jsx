import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import{
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";

import UserLogin from './pages/User_Login.jsx';
import AdminLogin from './pages/Admin_Login.jsx';
import AdminDashboard from './pages/Admin_Dashboard.jsx';
import UserQuizPage from './pages/User_QuizPage.jsx';
import UserQuizForm from './components/User_QuizForm.jsx';
import AdminQuizPage from './pages/Admin_QuizPage.jsx';
import UserSettingPage from './pages/User_SettingPage.jsx';
import AdminSettingPage from './pages/Admin_SettingPage.jsx';
import NotFound from './pages/NotFound.jsx';


const router = createBrowserRouter([
  {
      path:"/",
      element: <App/>,
  },
  {
    path:"/login/admin",
    element: <AdminLogin />,
  },
  {
    path:"/admin",
    element: <AdminDashboard />,
  },
  {
    path:"/admin/quiz",
    element: <AdminQuizPage />,
  },
  {
    path:"/admin/profile",
    element: <AdminSettingPage />,
  },
  {
      path:"/login",
      element: <UserLogin />,
  },
  {
      path:"/quiz",
      element: <UserQuizPage />,
  },
  {
      path:"/profile",
      element: <UserSettingPage />,
  },
  {
    path:"/quiz/:id",
    element: <UserQuizForm />,
  },
  {
    path:"/404",
    element: <NotFound />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <RouterProvider router={router} />
  <React.StrictMode />
  </>
)
