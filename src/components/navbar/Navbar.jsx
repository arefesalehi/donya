import axios from 'axios'
import './navbar.css'
import { Dropdown } from 'flowbite-react'
import { useContext, useEffect, useState } from 'react'
import { BsCart3, BsFillSuitHeartFill, BsFillPersonFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/Context'

const Navbar = () => {
  const [allMenu, setAllMenu] = useState([])

  const authContext = useContext(AuthContext)
  console.log('authcontext:', authContext)

  useEffect(() => {
    axios({
      url: 'http://localhost:4000/v1/menus',
    }).then((data) => {
      console.log('allmenu:', data.data)
      setAllMenu(data.data)
    })
  }, [])

  return (
    <>
      <div className="navbar-parent">
        <div className="back-of-navbar"></div>
        <div className="navbar">
          <div className="navbar-right">
            <nav className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mr-4">
              <div className="flex flex-wrap justify-between items-center mx-auto px-8 p-4 max-w-screen-xl">
                <a href="#" className="flex items-center">
                  <img
                    src="/images/logomob-1.png"
                    className="mr-3 h-8"
                    alt="donya Logo"
                  />
                </a>
                <button
                  data-collapse-toggle="navbar-dropdown"
                  type="button"
                  className="inline-flex justify-center items-center md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 w-10 h-10 text-gray-500 text-sm focus:outline-none dark:text-gray-400"
                  aria-controls="navbar-dropdown"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
                <div
                  className="md:block hidden w-full md:w-auto"
                  id="navbar-dropdown"
                >
                  <ul className="flex md:flex-row flex-col md:space-x-8 border-gray-100 md:border-0 dark:border-gray-700 bg-gray-50 md:bg-white md:dark:bg-gray-900 dark:bg-gray-800 mt-4 md:mt-0 p-4 md:p-0 border rounded-lg font-medium">
                    <li className="px-6">
                      <Link
                        to="/"
                        className="block bg-blue-700 md:bg-transparent md:dark:bg-transparent dark:bg-blue-600 py-2 md:p-0 pr-4 pl-3 rounded text-white md:text-blue-700 md:dark:text-blue-500"
                        aria-current="page"
                      >
                        صفحه اصلی
                      </Link>
                    </li>

                    {allMenu.map((menu) => {
                      return (
                        <li key={menu._id}>
                          {
                            <Dropdown
                              inline
                              label={
                                <Link to={`/category-info/${menu.href}/1`}>
                                  {menu.title}
                                </Link>
                              }
                            >
                              {menu.submenus.map((sub) => {
                                return (
                                  <div key={sub._id}>
                                    <Link to={`/course-info/${sub.href}`}>
                                      <Dropdown.Item
                                        style={{
                                          fontSize: '15px',
                                          padding: '15px 10px',
                                        }}
                                      >
                                        {sub.title}
                                      </Dropdown.Item>
                                    </Link>
                                  </div>
                                )
                              })}
                            </Dropdown>
                          }
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className="navbar-left">
            <span>
              <BsCart3 />
              <BsFillSuitHeartFill />
            </span>
            {authContext.isLoggedIn ? (
              <Link to="/my-account">
                <button>
                  <BsFillPersonFill />
                  {authContext?.userInfo?.name ||
                    authContext?.userInfo?.data?.name ||
                    (authContext.userInfo === undefined &&
                      '  مشکل بک اند رفرش کن')}
                </button>
              </Link>
            ) : (
             <>
             {
            
               <button>
                 <BsFillPersonFill />
                 <Link to="/login"> ورود و عضویت</Link>
               </button>
             }
             </>
            )}
          </div>
        </div>
      </div>

      {/* <nav className="flex justify-between items-center border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 container">
        <div className="flex flex-wrap justify-between items-center mx-auto p-4 max-w-screen-xl">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/images/logomob-1.png"
              className="mr-3 h-8"
                    alt="donya Logo"
       
            />
      
          </a>
          <button
            data-collapse-toggle="navbar-multi-level"
            type="button"
            className="inline-flex justify-center items-center md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 w-10 h-10 text-gray-500 text-sm focus:outline-none dark:text-gray-400"
            aria-controls="navbar-multi-level"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className="md:block hidden w-full md:w-auto"
            id="navbar-multi-level"
          >
            <ul className="flex md:flex-row flex-col md:space-x-8 rtl:space-x-reverse border-gray-100 md:border-0 dark:border-gray-700 bg-gray-50 md:bg-white md:dark:bg-gray-900 dark:bg-gray-800 mt-4 md:mt-0 p-4 md:p-0 border rounded-lg font-medium">
              <li>
                <a
                  href="#"
                  className="block bg-blue-700 md:bg-transparent md:dark:bg-transparent dark:bg-blue-600 px-3 py-2 md:p-0 rounded text-white md:text-blue-700 md:dark:text-blue-500"
                  aria-current="page"
                >
                  صفحه اصلی
                </a>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex justify-between items-center md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 md:p-0 w-full md:w-auto text-gray-900 md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:focus:text-white dark:text-white"
                >
                  Dropdown{' '}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownNavbar"
                  className="z-10 hidden bg-white dark:bg-gray-700 shadow rounded-lg divide-y divide-gray-100 dark:divide-gray-600 w-44 font-normal"
                >
                  <ul
                    className="py-2 text-gray-700 text-sm dark:text-gray-200"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li aria-labelledby="dropdownNavbarLink">
                      <button
                        id="doubleDropdownButton"
                        data-dropdown-toggle="doubleDropdown"
                        data-dropdown-placement="right-start"
                        type="button"
                        className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 w-full dark:hover:text-white"
                      >
                        Dropdown
                        <svg
                          className="w-2.5 h-2.5 ms-2.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>
                      <div
                        id="doubleDropdown"
                        className="z-10 hidden bg-white dark:bg-gray-700 shadow rounded-lg divide-y divide-gray-100 w-44"
                      >
                        <ul
                          className="py-2 text-gray-700 text-sm dark:text-gray-200"
                          aria-labelledby="doubleDropdownButton"
                        >
                          <li>
                            <a
                              href="#"
                              className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 dark:hover:text-white dark:text-gray-200"
                            >
                              Overview
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 dark:hover:text-white dark:text-gray-200"
                            >
                              My downloads
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 dark:hover:text-white dark:text-gray-200"
                            >
                              Billing
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 dark:hover:text-white dark:text-gray-200"
                            >
                              Rewards
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 text-gray-700 text-sm dark:hover:text-white dark:text-gray-200"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="block md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 md:p-0 rounded text-gray-900 md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:text-white dark:text-white"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 md:p-0 rounded text-gray-900 md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:text-white dark:text-white"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 md:p-0 rounded text-gray-900 md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:text-white dark:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
            
          </div>
          

          
          
        </div>
        <div className="navbar-left">
            <span>
              <BsCart3 />
              <BsFillSuitHeartFill />
            </span>
            {authContext.isLoggedIn ? (
              <Link to="/my-account">
                <button>
                  <BsFillPersonFill />
                  {authContext?.userInfo?.name ||
                    authContext?.userInfo?.data.name ||
                    (authContext.userInfo === undefined &&
                      '  مشکل بک اند رفرش کن')}
                </button>
              </Link>
            ) : (
              <button>
                <BsFillPersonFill />
                <Link to="/login"> ورود و عضویت</Link>
              </button>
            )}
          </div>

        
      </nav> */}
    </>
  )
}

export default Navbar
