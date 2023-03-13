import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import ArticleLoader from '../components/ArticleLoader'
import { Link } from 'react-router-dom'
import { RiArticleFill } from 'react-icons/ri'

const Authors = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [authors, setAuthors] = useState()
	const [authorPosts, setAuthorPosts] = useState()
	const [searchParams, setSearchParams] = useSearchParams()
	const id = searchParams.get('id')
	
	const getAuthors = async () => {
		const res = await axios.get('http://localhost:4000/api/authors').catch(err => console.log(err))
		const data = await res.data
		return data
	}

	const clickFollowButton = async (id) => {
		const response = await axios.put(`http://localhost:4000/api/author?id=${id}`, {
			withCredentials: true
		}).catch(err => console.log(err))
		const data = await response.data
		return data
	}

	useEffect(() => {
		getAuthors().then(data => {
			setIsLoading(false)
			setAuthors(data)
		})
	}, [])


	if(isLoading) {
		return (
			<ArticleLoader />
		)
	}

	return (
		<div className="flex flex-row flex-wrap justify-center">
			{authors.map(author => (
				<>
					<div className="flex flex-row flex-wrap mx-4 basis-1/4 max-md:basis-1/3 mx-auto max-sm:flex-1 min-md:basis-1/3 max-md:max-w-xs">
						<div className="my-2 bg-white shadow-xl rounded-lg text-gray-900">
							<div className="rounded-t-lg h-32 overflow-hidden">
								<img className="w-full" src="http://localhost:4000/uploads/coffee.jpg" alt="Coffee" />
							</div>
							<div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
								<img src={`http://localhost:4000/${author.image}`} alt="Profile Image" />
							</div>
							<div className="text-center mt-2">
								<Link to={`/author?id=${author._id}`}>
									<span className="font-semibold">{ author.name } </span>
								</Link>
								<p className="text-gray-500">Writer</p>
							</div>
							<ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
								<li className="flex flex-col items-center justify-around">
									<svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
										<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
									</svg>
								<div>{ author.followers.length }</div>
								</li>
								<li className="flex flex-col items-center justify-between">
									<svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
										<path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
									</svg> 
									<div>{ author.following.length }</div>
								</li>
								<li className="flex flex-col items-center justify-around text-blue-900">
									<RiArticleFill/>
									<div>?</div>
								</li>
							</ul>
							<div className="p-4 border-t mx-8 mt-2 text-center">
								<button
									onClick={() => clickFollowButton(author._id)}
									className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-auto"
								>
									Follow
								</button>
							</div>
						</div>
					</div>
				</>
			))}
		</div>
	)
}

export default Authors
