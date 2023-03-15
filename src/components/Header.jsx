import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../store/UserContext'
import Account from './Account'
import MobileDropdown from './MobileDropdown.jsx'
import SearchBar from '../components/SearchBar'
import { BsSearch } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import { FaSearch } from 'react-icons/fa'
import { TbEdit } from 'react-icons/tb'
import { HiOutlineHashtag } from 'react-icons/hi'
import { MdOutlineLogin } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgClose } from 'react-icons/cg'
import IMG from '../assets/images/img1.jpg'
axios.defaults.withCredentials = true;

const Header = () => {
	const [isOpen, setIsOpen] = useState(true)
	const { isLogin, setIslogin, userInfo, setUserInfo, searchValue, setSearchValue } = useContext(UserContext)

	const logout = async () => {
		const response = await axios.post(`https://blogqita-api.up.railway.app/api/v1/auth/logout`, {}, {withCredentials: true})
			.then(response => {
				setUserInfo(null)
				setIslogin(false)
				localStorage.setItem('IS_LOGIN_INFO', false)
			})
	}

	const getUserInfo = async () => {
		const response = await axios.get(`https://blogqita-api.up.railway.app/api/v1/user/profile`, { withCredentials: true }).catch(err => console.log(err))
		const data = await response.data
		return
	}

	useEffect(() => {
		if(isLogin) {
			getUserInfo().then(response => {
				if(!response?.user?._id) {
					setIslogin(false)
					localStorage.setItem('IS_LOGIN_INFO', false)
					setUserInfo(null)
				}
				setUserInfo(response?.user)
			})
		}
	}, [])

	return (
		<>
			<button onClick={() => setIsOpen(!isOpen)} className="h-full w-12 cursor-pointer mt-3 -ml-3 max-md:block hover:text-gray-500 hidden group/hamburger">
				{isOpen ? <CgClose className="mx-auto h-8 w-8 my-auto" /> : <GiHamburgerMenu className="mx-auto h-8 w-8 my-auto" />}				
			</button>
			<div className={`${isOpen ? "fixed z-50 transition duration-300 translate-x-0 left-0 min-h-screen bg-gray-100 transition duration-500" : "fixed z-50 -left-14 min-h-screen bg-gray-100"}`}>
				<div className="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r transition duration-100 hover:w-56 hover:bg-white hover:shadow-lg group/sidebar">
					<div className="flex h-screen flex-col justify-between pt-2 pb-6">
						<div>
							<div className="mt-6 max-md:mt-0 space-y-2 tracking-wide border-b">
								<div className="min-w-max">
									<Link to={`/`} className="relative flex items-center space-x-4 px-4 py-3">
										<span className="font-extrabold text-4xl drop-shadow-md drop-shadow-lg font-['Abril_Fatface'] group-hover/sidebar:hidden">
											B
										</span>
										<span className="font-extrabold text-4xl drop-shadow-md drop-shadow-lg font-['Abril_Fatface'] mx-auto relative group-hover/sidebar:-ml-1">
											BLOGQITA
										</span>
									</Link>
								</div>
							</div>
							<ul className="mt-6 max-md:mt-0 space-y-2 tracking-wide">
								<li className="min-w-max rounded-lg">
									<div className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 relative">
										<FaSearch className="h-5 w-5 mr-2 group-hover/sidebar:hidden" />
										<form onSubmit className="font-sans text-black bg-white flex items-center justify-center left-0 group-hover/sidebar:-ml-1 rounded-full border-2 border-gray-100">
											<input onChange={(e) => setSearchValue(e.target.value)} type="text" className="px-4 py-2 w-48 rounded-full" placeholder="Search Title..."/>
										</form>
									</div>
								</li>
								<li className="min-w-max hover:bg-gray-200 rounded-lg">
									<Link to={`/categories`} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
										<BiCategory className="h-5 w-5" />
										<span className="group-hover:text-gray-700">Categories</span>
									</Link>
								</li>
								<li className="min-w-max hover:bg-gray-200 rounded-lg">
									<Link to={`/tags`} className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600">
										<HiOutlineHashtag className="h-5 w-5" />
										<span className="group-hover:text-gray-700">Tags</span>
									</Link>
								</li>
								<li className="min-w-max hover:bg-gray-200 rounded-lg">
									<Link to={`/authors`} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
											<path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
										</svg>
										<span className="group-hover:text-gray-700">Authors</span>
									</Link>
								</li>
								{isLogin && 
									<li className="min-w-max hover:bg-gray-200 rounded-lg">
										<Link to={`/create`} className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600">
											<TbEdit className="h-5 w-5" />
											<span className="group-hover:text-gray-700">Write</span>
										</Link>
									</li>
								}
							</ul>
						</div>
						<div className="min-w-max -mb-3 max-md:mb-20 px-1">
							<ul className="mt-6 space-y-2 tracking-wide">
								{isLogin ? (
									<>
										<li className="hover:bg-gray-200 rounded-lg">
											<Link to={`/author/${ userInfo?._id }`} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
												<div className="h-6 w-6 rounded-full overflow-hidden">
													<img src={IMG} className="w-full h-full object-cover group-hover:ease-in-out transition duration-500 hover:scale-[1.03]" alt="" />
												</div>
												<span className="group-hover:text-gray-700">{ userInfo?.firstName || 'Profile' }</span>
											</Link>
										</li>
										<li className="hover:bg-gray-200 rounded-lg">
											<Link to={`/account?id=${ userInfo?._id }`} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
												<svg fill="none"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													viewBox="0 0 24 24"
													stroke="currentColor"
													className="h-6 w-6">
														<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
													<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
												</svg>
												<span className="group-hover:text-gray-700">Settings</span>
											</Link>
										</li>
										<li className="hover:bg-gray-200 rounded-lg" onClick={logout}>
											<button className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
												<svg fill="none"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													viewBox="0 0 24 24"
													stroke="currentColor"
													className="h-6 w-6">
													<path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
												</svg>
												<span className="group-hover:text-gray-700">Logout</span>
											</button>
										</li>
									</>
								) : 
								<li className="hover:bg-gray-200 rounded-lg">
									<Link to={`/login`} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
										<MdOutlineLogin className="w-5 h-5" />
										<span className="group-hover:text-gray-700">Login</span>
									</Link>
								</li>
							}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Header