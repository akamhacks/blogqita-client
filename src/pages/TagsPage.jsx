import React, { useState, useEffect } from 'react'
import Tags from '../components/Tags'
import axios from 'axios'
import { useSearchParams, Link } from 'react-router-dom'
import ArticleLoader from '../components/ArticleLoader'
import Post from '../components/Post'

const TagsPage = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [posts, setPosts] = useState([])
	const [searchParams, setSearchParams] = useSearchParams()
	const id = searchParams.get('id')

	const getTagsPosts = async () => {
		const res = await axios.get(`http://localhost:4000/api/tags?id=${id}`).catch(err => console.log(err))
		const data = await res.data
		return data
	}

	useEffect(() => {
		if(id) {
			getTagsPosts().then(data => {
				setPosts(data)
				setIsLoading(false)
			})
		}
	}, [id])
	return (
		<>
			<Tags />
			{posts && (
				<>
					{posts.length > 0 && posts.map(post => (
						<Post {...post} key={post._id} />
					))}
				</>
			)}
		</>
	)
}

export default TagsPage