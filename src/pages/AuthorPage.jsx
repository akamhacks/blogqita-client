import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSearchParams, Link } from 'react-router-dom'
import ArticleLoader from '../components/ArticleLoader'
import Post from '../components/Post'
import Tags from '../components/Tags'
import Categories from '../components/Categories'
import { RiArticleFill, RiLinkedinFill, RiRedditLine } from 'react-icons/ri'
import { BsFillPersonFill, BsTwitter, BsInstagram, BsWhatsapp, BsSnapchat, BsYoutube, BsGithub } from 'react-icons/bs'
import { TfiFacebook } from 'react-icons/tfi'
import { SiTiktok, SiDiscord } from 'react-icons/si'
import { FaTelegramPlane, FaPinterestP } from 'react-icons/fa'

const AuthorPage = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [author, setAuthor] = useState({})
	const [posts, setPosts] = useState([])
	const [searchParams, setSearchParams] = useSearchParams()
	const id = searchParams.get('id')

	const getAuthorPosts = async () => {
		const res = await axios.get(`http://localhost:4000/api/author?id=${id}`).catch(err => console.log(err))
		const data = await res.data
		return data
	}

	useEffect(() => {
		getAuthorPosts().then(data => {
			setPosts(data.posts)
			setAuthor(data.author)
			setIsLoading(false)
		})
	}, [])

	return (
		<>
			{isLoading && <ArticleLoader />}
			<div className="flex flex-col gap-8">
				<div className="flex flex-row flex-wrap mx-2 basis-1/4 max-md:basis-1/3 mx-auto max-sm:flex-1 min-md:basis-1/3">
					<div className="my-2 bg-white shadow-xl rounded-lg text-gray-900">
						<div className="rounded-t-lg h-64 overflow-hidden">
							<img className="w-full object-contain" src="http://localhost:4000/uploads/coffee.jpg" alt="Coffee" />
						</div>
						<div className="mx-auto w-48 h-48 relative -mt-36 border-4 border-white rounded-full overflow-hidden">
							<img src={`http://localhost:4000/${author.image}`} alt="Profile Image" />
						</div>
						<div className="text-center mt-2">
							<h3 className="font-semibold text-2xl">{ author.name }</h3>
							<p className="text-gray-500">{ author.bio }</p>
						</div>
						<ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
							<li className="flex flex-col items-center justify-around">
								<svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
									<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
								</svg>
							<div>{ author?.followers?.length }</div>
							</li>
							<li className="flex flex-col items-center justify-between">
								<svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
									<path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
								</svg> 
								<div>{ author?.following?.length }</div>
							</li>
							<li className="flex flex-col items-center justify-around text-blue-900">
								<RiArticleFill/>
								<div>{ posts.length }</div>
							</li>
						</ul>
						<div className="p-4 border-t mx-8 mt-2 text-center">
							<div className="sharing-buttons flex flex-wrap justify-start">
								{ author?.socialsAccounts?.whatsapp && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ author?.socialsAccounts?.whatsapp }>
									<BsWhatsapp className="w-6 h-6" />
								</a>}
								{ author?.socialsAccounts?.tiktok && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ author?.socialsAccounts?.tiktok }>
									<SiTiktok className="w-6 h-6" />
								</a>}
								{ author?.socialsAccounts?.instagram && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ author?.socialsAccounts?.instagram }>
									<BsInstagram className="w-6 h-6" />
								</a>}
								{ author?.socialsAccounts?.facebook && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ author?.socialsAccounts?.facebook }>
									<TfiFacebook className="w-6 h-6" />
								</a>}
								{ author?.socialsAccounts?.github && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ author?.socialsAccounts?.github }>
									<BsGithub className="w-6 h-6" />
								</a>}
								{ author?.socialsAccounts?.twitter && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ author?.socialsAccounts?.twitter }>
									<BsTwitter className="w-6 h-6" />
								</a>}
								{ author?.socialsAccounts?.linkedin && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ author?.socialsAccounts?.linkedin }>
									<RiLinkedinFill className="w-6 h-6" />
								</a>}
								{ author?.socialsAccounts?.telegram && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ author?.socialsAccounts?.telegram }>
									<FaTelegramPlane className="w-6 h-6" />
								</a>}
								{ author?.socialsAccounts?.pinterest && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ author?.socialsAccounts?.pinterest }>
									<FaPinterestP className="w-6 h-6" />
								</a>}
								{ author?.socialsAccounts?.discord && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ author?.socialsAccounts?.discord }>
									<SiDiscord className="w-6 h-6" />
								</a>}
								{ author?.socialsAccounts?.reddit && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ author?.socialsAccounts?.reddit }>
									<RiRedditLine className="w-6 h-6" />
								</a>}
								{ author?.socialsAccounts?.snapchat && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ author?.socialsAccounts?.snapchat }>
									<BsSnapchat className="w-6 h-6" />
								</a>}
								{ author?.socialsAccounts?.youtube && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ author?.socialsAccounts?.whatsapp }youtube>
									<BsYoutube className="w-6 h-6" />
								</a>}	
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-row gap-2 max-lg:flex-col">
					<div className="basis-3/4">
						{posts.length > 0 && posts.map(post => (
							<Post {...post} key={post._id} />
						))}
					</div>
					<div className="basis-1/4 bg-white rounded-xl p-4 text-center shadow-xl mb-10 h-fit flex flex-col gap-6">
						<Tags />
						<Categories />
					</div>
				</div>
			</div>
		</>
	)
}

export default AuthorPage