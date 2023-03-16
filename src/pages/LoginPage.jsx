import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../store/UserContext";
axios.defaults.withCredentials = true;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameRegister, setFirstNameRegister] = useState("")
  const [nameRegister, setNameRegister] = useState("")
  const [emailRegister, setEmailRegister] = useState("")
  const [passwordRegister, setPasswordRegister] = useState("")
  const [passwordRegisterRepeat, setPasswordRegisterRepeat] = useState("")
  const { setUserInfo, setIslogin, isLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(
        "https://blogqita-api.up.railway.app/api/v1/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setUserInfo(response.data);
        setIslogin(true);
        navigate("/");
        localStorage.setItem("IS_LOGIN_INFO", true);
      })
      .catch((response) => {
        setEmail('')
        setPassword('')
        alert(response?.response?.data?.message);
      });
  };

	const register = async (e) => {
		e.preventDefault()
		const response = await axios.post('https://blogqita-api.up.railway.app/api/v1/auth/register', { firstName: firstNameRegister, name: nameRegister, email: emailRegister, password: passwordRegister }, { withCredentials: true, })
			.then(response => {
				alert(response?.data?.message)
				setNameRegister('')
				setFirstNameRegister('')
				setEmailRegister('')
				setPasswordRegister('')
				setPasswordRegisterRepeat('')
			}).catch(response => {
				alert(response?.response?.data?.message)
			})
	}

  if (isLogin === true) {
    navigate("/");
  }

  return (
    <div>
    	<div class="main w-max m-auto mt-10">
    		<form onSubmit={login} className="max-w-xl my-0 mx-auto">
		        <h2 className="text-2xl mb-6">Login</h2>
		        <div class="username flex border rounded text-gray-500 mb-4">
		            <svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-4 mx-2 my-auto"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
		            >
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
		            </svg>
		            <input
									class="outline-none px-2 h-full py-2 text-lg"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
		            />
		          </div>
		          <div class="password flex border rounded text-gray-500 mb-4">
		            <svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-4 mx-2 my-auto"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
		            >
		              	<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
		              	/>
		            </svg>
		            <input
									class="outline-none px-2 h-full py-2 text-lg"
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
		            />
		          	</div>
		          	<Link to={`/reset`} className="text-gray-600 font-medium">Forgot Password?</Link>
		          	<button className="w-full submit border rounded mb-4 bg-gray-600 text-white cursor-pointer hover:bg-gray-500">
			          	<div className="wrapper flex w-max mx-auto">
			          		<svg
											xmlns="http://www.w3.org/2000/svg"
											class="w-5 my-auto"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
			              	>
			                <path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
			                />
			              	</svg>
			            			<span className="outline-none px-2 h-full cursor-pointer py-2 text-lg bg-transparent">Login</span>
			          	</div>
	    					</button>
			</form>
			<form onSubmit={register} className="max-w-xl my-0 mx-auto">
	    		<h2 class="text-2xl mb-6">Register</h2>
					<div class="display_name flex border rounded text-gray-500 mb-4">
						<input
							class="outline-none px-4 h-full py-2 text-lg"
							type="text"
							placeholder="First Name"
							value={firstNameRegister}
							onChange={(e) => setFirstNameRegister(e.target.value)}
						/>
					</div>
					<div class="flex border rounded text-gray-500 mb-4">
						<input
							class="outline-none px-4 h-full py-2 text-lg"
							type="text"
							placeholder="Full Name"
							value={nameRegister}
							onChange={(e) => setNameRegister(e.target.value)} 
						/>
					</div>
					<div class="username flex border rounded text-gray-500 mb-4">
						<input
							class="outline-none px-4 h-full py-2 text-lg"
							type="email"
							placeholder="Email"
							value={emailRegister}
							onChange={(e) => setEmailRegister(e.target.value)} 
						/>
					</div>
					<div class="password flex border rounded text-gray-500 mb-4">
						<input
							class="outline-none px-4 h-full py-2 text-lg"
							type="password"
							placeholder="Password"
							value={passwordRegister}
							onChange={(e) => setPasswordRegister(e.target.value)}
						/>
					</div>
					<div class="password flex border rounded text-gray-500 mb-4">
						<input
							class="outline-none px-4 h-full py-2 text-lg"
							type="password"
							value={passwordRegisterRepeat}
							placeholder="Retype Password"
							onChange={(e) => setPasswordRegisterRepeat(e.target.value)}
						/>
					</div>
					<div>
						<span class={`${passwordRegister === passwordRegisterRepeat || passwordRegisterRepeat === '' ? 'hidden' : 'show_info text-sm mb-4 w-max text-red-400'}`}>The Password must be the same</span>
					</div>
					<button class="border rounded mb-4 bg-gray-600 hover:bg-gray-500 text-white cursor-pointer w-full">
						<div class="wrapper flex w-max mx-auto">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-5 my-auto"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
								/>
							</svg>
							<span className="outline-none px-2 h-full cursor-pointer py-2 text-lg bg-transparent">Register</span>
						</div>
					</button>
				</form>
			</div>
    </div>
  );
};

export default LoginPage;
