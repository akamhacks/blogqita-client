import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true;

const ResetForm = () => {
	const [password, setPassword] = useState('')
	const [passwordRetype, setPasswordRetype] = useState('')
	const [redirect, setRedirect] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	let token;
	token = searchParams.get('token')

	const resetPasswordHandler = async (e) => {
		e.preventDefault()
		if(password !== passwordRetype) {
			return
		}
		const response = await axios.post(`https://blogqita-api.up.railway.app/api/v1/auth/reset?token=${token}`, {password: password}, { withCredentials: true })
			.then(response => {
				alert(response?.data?.message)
				setPassword('')
				setPasswordRetype('')
				setRedirect(true)
			})
	}

	if(redirect) {
		return navigate('/login')
	}
	return (
		<>
			<div class="main w-max m-auto mt-10">
				<form onSubmit={resetPasswordHandler} className="max-w-xl my-0 mx-auto">
		    		<h2 class="text-2xl mb-6">Reset Password</h2>
					<div class="password flex border rounded text-gray-500 mb-4">
						<input
							class="outline-none px-4 h-full py-2 text-lg"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div class="password flex border rounded text-gray-500 mb-4">
						<input
							class="outline-none px-4 h-full py-2 text-lg"
							type="password"
							value={passwordRetype}
							placeholder="Retype Password"
							onChange={(e) => setPasswordRetype(e.target.value)}
						/>
					</div>
					<div>
						<span class={`${password === passwordRetype || passwordRetype === '' ? 'hidden' : 'text-sm mb-4 text-red-400'}`}>The Password must be the same</span>
					</div>
					<button class="border rounded mb-4 bg-gray-600 hover:bg-gray-500 text-white cursor-pointer w-full">
						<div class="wrapper flex w-max mx-auto">
							<span className="outline-none px-2 h-full cursor-pointer py-2 text-lg bg-transparent">Reset password</span>
						</div>
					</button>
				</form>
			</div>
		</>
	)
}

export default ResetForm