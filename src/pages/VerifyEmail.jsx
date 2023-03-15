import React, { useEffect } from 'react'
import axios from 'axios'
import { useSearchParams, Link } from 'react-router-dom'
import{ MdOutlineVerifiedUser } from 'react-icons/md'

const VerifyEmail = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const token = searchParams.get('token')

	useEffect(() => {
		const verifyAccount = async () => {
			const response = await axios.get(`https://blogqita-api.up.railway.app/api/v1/auth/verify?token=${token}`)
				.then(response => console.log(response))
				.catch(err => console.log(err))
		}
		verifyAccount()
	}, [])


	return (
		<div className="flex flex-col max-w-screen-sm mt-20 mx-auto gap-3">
			<MdOutlineVerifiedUser className="h-16 w-16 text-green-600 mb-6" />
			<h4 className="font-bold text-2xl">Verified</h4>
			<p className="text-gray-500">You have successfully verified your account.</p>
			<Link to={`/login`} className="w-full text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold text-lg rounded-lg px-au py-3 mt-3 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log in to your Account</Link>
		</div>
	)
}

export default VerifyEmail