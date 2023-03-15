import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../store/UserContext'
import { Navigate, useParams } from 'react-router-dom'
import { RiArticleFill, RiLinkedinFill, RiRedditLine } from 'react-icons/ri'
import { BsFillPersonFill, BsTwitter, BsInstagram, BsWhatsapp, BsSnapchat, BsYoutube, BsGithub } from 'react-icons/bs'
import { TfiFacebook } from 'react-icons/tfi'
import { SiTiktok, SiDiscord } from 'react-icons/si'
import { FaTelegramPlane, FaPinterestP } from 'react-icons/fa'
import axios from 'axios'
axios.defaults.withCredentials = true

const Setting = () => {
	const { id } = useParams()
	const { setUserInfo } = useContext(UserContext)
	const [datas, setDatas] = useState({})
	const [ files, setFiles ] = useState('')
	const [ redirect, setRedirect ] = useState(false)

	const getProfile = async () => {
		const response = await axios.get('https://blogqita-api.up.railway.app/api/v1/user/profile', {
			withCredentials: true
		}).catch(err => console.log(err))
		const data = await response.data
		return data
	}
	

	const settingAccount = async (e) => {
		e.preventDefault()
		const data = new FormData()
		data.set('firstName', datas.firstName)
		data.set('name', datas.name)
		data.set('email', datas.email)
		data.set('id', datas.id)
		if(files?.[0]) {
			data.set('file', files?.[0])
		}
		const response = await axios.put(`https://blogqita-api.up.railway.app/api/v1/user/profile`, {data: data}, { withCredentials: true })

		if(response.ok) {
			setRedirect(true)
			setUserInfo(datas.firstName)
		}
	}

	useEffect(() => {
		getProfile().then(data => {
			setDatas(data.user)
		})
	}, [])

	if(redirect) {
		return <Navigate to="/" />
	}

	return (
		<>
			<h1 className="font-extrabold text-3xl text-center mb-4">Setting</h1>
			<div className="flex flex-col mt-10 ">
				<div className="flex flex-row flex-wrap mx-2 basis-1/4 max-md:basis-1/3 mx-auto max-sm:flex-1 min-md:basis-1/3">
					<div className="my-2 bg-white shadow-xl rounded-lg text-gray-900">
						<div className="rounded-t-lg h-64 overflow-hidden">
							<img className="object-cover object-top w-full" src="https://blogqita-api.up.railway.app/uploads/00fe726c7a4bdbd58cf8914680221ae0.jpg" alt="Coffee" />
						</div>
						<div className="mx-auto w-48 h-48 relative -mt-36 border-4 border-white border-gray-400 rounded-full overflow-hidden">
							<img src={`https://blogqita-api.up.railway.app/${datas?.image}`} alt="Profile Image" />
						</div>
						<div className="text-center mt-2">
							<h3 className="font-semibold text-2xl">{ datas?.name } ({ datas?.firstName })</h3>
							<p className="text-gray-500">{ datas?.bio }</p>
						</div>
						<ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
							<li className="flex flex-col items-center justify-around">
								<svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
									<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
								</svg>
							<div>{ datas?.followers?.length }</div>
							</li>
							<li className="flex flex-col items-center justify-between">
								<svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
									<path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
								</svg> 
								<div>{ datas?.following?.length }</div>
							</li>
							<li className="flex flex-col items-center justify-around text-blue-900">
								<RiArticleFill/>
								<div>{ datas?.posts?.length }</div>
							</li>
						</ul>
						<div className="p-4 border-t mx-8 mt-2 text-center">
							<div className="sharing-buttons flex flex-wrap justify-between">
								{ datas?.socialsAccounts?.whatsapp && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ datas?.socialsAccounts?.whatsapp }>
									<BsWhatsapp className="w-6 h-6" />
								</a>}
								{ datas?.socialsAccounts?.tiktok && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ datas?.socialsAccounts?.tiktok }>
									<SiTiktok className="w-6 h-6" />
								</a>}
								{ datas?.socialsAccounts?.instagram && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ datas?.socialsAccounts?.instagram }>
									<BsInstagram className="w-6 h-6" />
								</a>}
								{ datas?.socialsAccounts?.facebook && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ datas?.socialsAccounts?.facebook }>
									<TfiFacebook className="w-6 h-6" />
								</a>}
								{ datas?.socialsAccounts?.github && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ datas?.socialsAccounts?.github }>
									<BsGithub className="w-6 h-6" />
								</a>}
								{ datas?.socialsAccounts?.twitter && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ datas?.socialsAccounts?.twitter }>
									<BsTwitter className="w-6 h-6" />
								</a>}
								{ datas?.socialsAccounts?.linkedin && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ datas?.socialsAccounts?.linkedin }>
									<RiLinkedinFill className="w-6 h-6" />
								</a>}
								{ datas?.socialsAccounts?.telegram && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ datas?.socialsAccounts?.telegram }>
									<FaTelegramPlane className="w-6 h-6" />
								</a>}
								{ datas?.socialsAccounts?.pinterest && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ datas?.socialsAccounts?.pinterest }>
									<FaPinterestP className="w-6 h-6" />
								</a>}
								{ datas?.socialsAccounts?.discord && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ datas?.socialsAccounts?.discord }>
									<SiDiscord className="w-6 h-6" />
								</a>}
								{ datas?.socialsAccounts?.reddit && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ datas?.socialsAccounts?.reddit }>
									<RiRedditLine className="w-6 h-6" />
								</a>}
								{ datas?.socialsAccounts?.snapchat && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ datas?.socialsAccounts?.snapchat }>
									<BsSnapchat className="w-6 h-6" />
								</a>}
								{ datas?.socialsAccounts?.youtube && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ datas?.socialsAccounts?.whatsapp }youtube>
									<BsYoutube className="w-6 h-6" />
								</a>}	
							</div>
						</div>
					</div>
				</div>

				<form onSubmit={settingAccount} className="w-full flex-1 my-0 mx-auto" encType="multipart/form-data">
					<label for="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
					<div className="relative mb-6">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
						</div>
						<input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" value={datas?.email} placeholder="email" onChange={e => setDatas({ ...datas, email: e.target.value })} />
					</div>
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 font-extrabold">@</span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.firstName} placeholder="firstName" onChange={e => setDatas({ ...datas, firstName: e.target.value })}/>
					</div>
					<label for="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><BsFillPersonFill /></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.name} placeholder="firstName" onChange={e => setDatas({ ...datas, name: e.target.value })}/>
					</div>
					<label for="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Bio</label>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.bio} placeholder="Your Bio" onChange={e => setDatas({ ...datas, bio: e.target.value })}/>
					</div>
					<label for="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Socials Account</label>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><BsWhatsapp /></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.socialsAccounts?.whatsapp} placeholder="Drop Your Whatsapp Link" onChange={e => setDatas({ ...datas, whatsapp: e.target.value })}/>
					</div>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><SiTiktok /></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.socialsAccounts?.tiktok} placeholder="Drop Your Tiktok Link" onChange={e => setDatas({ ...datas, tiktok: e.target.value })}/>
					</div>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><BsInstagram /></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.socialsAccounts?.instagram} placeholder="Drop Your Instagram Link" onChange={e => setDatas({ ...datas, instagram: e.target.value })}/>
					</div>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><TfiFacebook /></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.socialsAccounts?.facebook} placeholder="Drop Your Facebook Link" onChange={e => setDatas({ ...datas, facebook: e.target.value })}/>
					</div>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><BsGithub /></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.socialsAccounts?.github} placeholder="Drop Your github Link" onChange={e => setDatas({ ...datas, github: e.target.value })}/>
					</div>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><BsTwitter /></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.socialsAccounts?.twitter} placeholder="Drop Your twitter Link" onChange={e => setDatas({ ...datas, twitter: e.target.value })}/>
					</div>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><RiLinkedinFill /></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.socialsAccounts?.linkedin} placeholder="Drop Your linkedin Link" onChange={e => setDatas({ ...datas, linkedin: e.target.value })}/>
					</div>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><FaTelegramPlane /></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.socialsAccounts?.telegram} placeholder="Drop Your telegram Link" onChange={e => setDatas({ ...datas, telegram: e.target.value })}/>
					</div>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><FaPinterestP /></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.socialsAccounts?.pinterest} placeholder="Drop Your pinterest Link" onChange={e => setDatas({ ...datas, pinterest: e.target.value })}/>
					</div>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><SiDiscord /></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.socialsAccounts?.discord} placeholder="Drop Your discord Link" onChange={e => setDatas({ ...datas, discord: e.target.value })}/>
					</div>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><BsSnapchat /></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.socialsAccounts?.snapchat} placeholder="Drop Your snapchat Link" onChange={e => setDatas({ ...datas, snapchat: e.target.value })}/>
					</div>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><BsYoutube /></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.socialsAccounts?.youtube} placeholder="Drop Your youtube Link" onChange={e => setDatas({ ...datas, youtube: e.target.value })}/>
					</div>
					<div className="flex mb-6">
						<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><RiRedditLine /></span>
						<input type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={datas?.socialsAccounts?.reddit} placeholder="Drop Your reddit Link" onChange={e => setDatas({ ...datas, reddit: e.target.value })}/>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700">Cover photo</label>
						<div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
							<div class="space-y-1 text-center">
								<svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
									<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
								<div class="flex text-sm text-gray-600">
									<label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
										<span>Upload a file</span>
										<input id="file-upload" name="file-upload" type="file" class="sr-only" />
									</label>
									<p class="pl-1">or drag and drop</p>
								</div>
								<p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
							</div>
						</div>
					</div>
					<button className="w-full bg-gray-100 transition-colors duration-150 bg-gray-300 rounded-lg focus:shadow-outline hover:bg-gray-400 py-3">Upload Setting</button>
				</form>
			</div>
		</>
	)
}

export default Setting