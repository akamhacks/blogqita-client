import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ArticleLoader from '../components/ArticleLoader'
import moment from 'moment'
import { BsCalendar2Day } from 'react-icons/bs'

const LatestPost = () => {
	const [posts, setPosts] = useState()
	const [isLoading, setIsLoading] = useState(true)
	const getLatestPosts = async () => {
		const res = await axios.get('https://blogqita-api.up.railway.app/api/v1/post/latest-posts').catch(err => console.log(err))
		const data = await res.data
		return data
	}

	useEffect(() => {
		getLatestPosts().then(data => {
			setPosts(data)
			setIsLoading(false)
		})
	}, [])

	if(isLoading) {
		return (
			<ArticleLoader />
		)
	}

	return (
		<>
			<h2 className="font-semibold text-2xl">Latest Post</h2>
			<div className="border-b pb-4 flex flex-col gap-6 max-lg:flex-row">
				{posts.map(post => (
					<>
						<div className="flex flex-col">
							<span className="flex gap-2">
								<BsCalendar2Day className="h-5" />
								<time className="text-gray-600 text-left -mb-2">{moment(post.createdAt).format('MMM DD, YYYY HH:mm')}</time>
							</span>
							<a href={`/post/${post._id}`} className="">
								<img
								src={`https://blogqita-api.up.railway.app/${post.cover}`}
								className="rounded-2xl m-3"
								alt={post.title}
								onError={event => {
									event.target.src = "https://blogqita-api.up.railway.app/uploads/null.png"
									event.onerror = null
								}}
							/>
							</a>
							<a href={`/post/${post._id}`}>
								<span className="font-bold hover:underline text-gray-700">{ post.title }</span>
							</a>
						</div>
					</>
				))}
			</div>
		</>
	)
}

export default LatestPost