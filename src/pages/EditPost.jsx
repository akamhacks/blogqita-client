import React, { useState, useEffect } from 'react'
import Editor from '../components/Editor'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { Navigate, useSearchParams } from 'react-router-dom'
axios.defaults.withCredentials = true;

const EditPost = () => {
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [content, setContent] = useState('')
	const [category, setCategory] = useState('')
	const [tag, setTag] = useState('')
	const [files, setFiles] = useState('')
	const [redirect, setRedirect] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const id = searchParams.get('id')

	const categories = category.split(',')
	const tags = tag.split(',')

	const getPost = async() => {
		const response = await axios.get(`https://blogqita-api.up.railway.app/api/v1/post/post?id=${id}`)
			.catch(err => console.log(err))
		const data = await response.data
		return
	}

	useEffect(() => {
		getPost()
			.then(postInfo => {
				setTitle(postInfo.post.title)
				setContent(postInfo.post.content)
				setSummary(postInfo.post.summary)
				setCategory(postInfo.post.categories.join(", "))
				setTag(postInfo.post.tags.join(", "))
			})
	}, [])

	const updatePost = async (e) => {
		e.preventDefault()
		const data = new FormData()
		data.set('title', title)
		data.set('summary', summary)
		data.set('content', content)
		data.set('categories', categories)
		data.set('tags', tags)
		data.set('id', id)
		if(files) {
			console.log(files?.[0])
			data.set('file', files?.[0])
		}
		const response = await axios.put(`https://blogqita-api.up.railway.app/api/v1/post/post?id=${id}`, {data: data}, {
			withCredentials: true
		}).catch(err => console.log(err))

		if(response.ok) {
			setRedirect(true)
		}
	}


	if(redirect) {
		return <Navigate to={`/post?id=${id}`} />
	}
	return (
		<form onSubmit={updatePost}>
			<input
				type="title"
				placeholder={'Title'}
				value={title}
				onChange={e => setTitle(e.target.value)}
				className="block mb-[5px] w-full p-[5px] border-b-gray-400 border-solid border-2 rounded"
			/>
			<input
				type="summary"
				placeholder={'Summary'}
				value={summary}
				maxLength="200"
				onChange={e => setSummary(e.target.value)}
				className="block mb-[5px] w-full p-[5px] border-b-gray-400 border-solid border-2 rounded"
			/>
			<input
				type="file"
				onChange={e => setFiles(e.target.files)}
				className="w-full bg-gray-300 rounded shadow-lg"
			/>
			<Editor
				onChange={setContent}
				value={content}
			/>
			<input
				type="category"
				placeholder={'Category (pisahkan dengan koma space (", "))'}
				value={category}
				onChange={e => setCategory(e.target.value)}
				className="block mb-[5px] w-full p-[5px] border-b-gray-400 border-solid border-2 rounded"
			/>
			<input
				type="tag"
				placeholder={'Tag (pisahkan dengan koma space (", "))'}
				value={tag}
				onChange={e => setTag(e.target.value)}
				className="block mb-[5px] w-full p-[5px] border-b-gray-400 border-solid border-2 rounded"
			/>
			<button className="mt-2 w-full bg-gray-600 text-white rounded shadow-lg">Update Post</button>
		</form>
	)
}

export default EditPost