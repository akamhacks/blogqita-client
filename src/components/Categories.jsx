import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ArticleLoader from '../components/ArticleLoader'
import { Link } from 'react-router-dom'

const Categories = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [categories, setCategories] = useState()
	const getCategories = async () => {
		const res = await axios.get('https://blogqita-api.up.railway.app/api/v1/post/categories').catch(err => console.log(err))
		const data = await res.data
		return data
	}

	useEffect(() => {
		getCategories().then(data => {
			setIsLoading(false)
			const dumpCategories = data.map(category => category.categories)
			const nullArray = []
			const allCategory = nullArray.concat(...dumpCategories)
			const categories = [...new Set(allCategory)]
			setCategories(categories)
		})
	}, [])

	if(isLoading) {
		return (
			<ArticleLoader />
		)
	}

	return (
		<div>
			<h2 className="font-semibold mb-6 text-2xl">Recomended Category</h2>
			<div className="flex flex-wrap gap-3 container md:w-9/12 border-b pb-4">
				{categories.map(category => (
					<Link to={`/categories?id=${category}`} key={category} className="shadow-md bg-gray-200 hover:bg-gray-300 duration-300 rounded-full px-4 py-2 font-light text-sm">
						<span>#{ category } </span>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Categories