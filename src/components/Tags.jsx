import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ArticleLoader from '../components/ArticleLoader'
import { Link } from 'react-router-dom'

const Tags = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [tags, setTags] = useState()
	const getTags = async () => {
		const res = await axios.get('https://blogqita-api.up.railway.app/api/v1/post/tags').catch(err => console.log(err))
		const data = await res.data
		return data
	}

	useEffect(() => {
		getTags().then(data => {
			setIsLoading(false)
			const tagsArray = data.map(tag => tag.tags)
			const nullArray = []
			const arrayTags = nullArray.concat(...tagsArray)
			const tags = [...new Set(arrayTags)]
			setTags(tags)
		})
	}, [])


	if(isLoading) {
		return (
			<ArticleLoader />
		)
	}

	return (
		<div>
			<h2 className="font-semibold mb-6 text-2xl">Recomended Tags</h2>
			<div className="flex flex-wrap gap-3 container md:w-9/12 border-b pb-4">
				{tags.map(tag => (
					<Link to={`/tags?id=${tag}`} key={tag} className="bg-gray-200 hover:bg-gray-300 duration-300 rounded-full px-4 py-2 font-light text-sm shadow-md">
						<span>#{ tag } </span>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Tags