import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<main className="w-11/12 lg:w-5/6 lg:min-w-[1030px] xl:w-2/3 my-auto mx-auto">
			<Header />
			<Outlet />
		</main>
	)
}

export default Layout