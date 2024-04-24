import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../layout/LoginForm'
import RegisterForm from '../layout/RegisterForm'
import useAuth from '../hooks/useAuth'
import Header from '../layout/Header'
import Motorcycle from '../layout/MotorcycleUser'
import ContactUs from '../layout/ContactUs'
import AboutUs from '../layout/AboutUs'


const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Outlet />
    </>,
    children: [
      { index: true, element: <LoginForm /> },
      { path: '/register', element: <RegisterForm />},
      { path: '/login', element: <LoginForm />},
      // { path: '/motorcycle', element: <MotorcycleUser />}
    ]
  }
])

export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = user?.id ? userRouter : guestRouter
  return (
    <RouterProvider router={finalRouter} />
  )
}

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children : [
      { path: '/motorcycle', element: <Motorcycle /> },
      { path: '/ContactUs', element: <ContactUs /> },
      { path: '/AboutUs', element: <AboutUs /> }

    ]
  }
])