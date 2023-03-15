import React, { useState, useEffect } from 'react'
import Categories from '../components/Categories'
import axios from 'axios'
import { useSearchParams, Link } from 'react-router-dom'
import ArticleLoader from '../components/ArticleLoader'
import Post from '../components/Post'

const CategoriesPage = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [posts, setPosts] = useState([])
	const [searchParams, setSearchParams] = useSearchParams()
	const id = searchParams.get('id')

	const getCategoriesPosts = async () => {
		const res = await axios.get(`https://blogqita-api.up.railway.app/api/v1/post/categories?id=${id}`).catch(err => console.log(err))
		const data = await res.data
		return data
	}

	useEffect(() => {
		getCategoriesPosts().then(data => {
			setPosts(data)
			setIsLoading(false)
		})
	}, [id])

	return (
		<>
			<Categories />
			{posts && (
				<>
					{isLoading && <ArticleLoader />}
					{posts.length > 0 && posts.map(post => (
						<Post {...post} key={post._id} />
					))}
				</>
			)}
		</>
	)
}

export default CategoriesPage