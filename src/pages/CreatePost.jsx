import React, { useState, useContext } from 'react'
import { UserContext } from '../store/UserContext'
import axios from 'axios'
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom'
import Editor from '../components/Editor'
axios.defaults.withCredentials = true

const CreatePost = () => {
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [content, setContent] = useState('')
	const [files, setFiles] = useState('')
	const [redirect, setRedirect] = useState(false)
	const [category, setCategory] = useState('')
	const [tag, setTag] = useState('')
	const navigate = useNavigate()
	const { userInfo } = useContext(UserContext)

	const categories = category.split(',')
	const tags = tag.split(',')

	const createNewPost = async (e) => {
		e.preventDefault()
		const data = new FormData()
		data.set('title', title)
		data.set('summary', summary)
		data.set('content', content)
		data.set('categories', categories)
		data.set('tags', tags)
		data.set('file', files[0])

		const response = await axios.post('https://blogqita-api.up.railway.app/api/v1/post/post', data, {
			withCredentials: true,
		}).then(res => {
				setRedirect(true)
			})
			.catch(err => console.log(err))
	}

	if(redirect || !userInfo?.isWriter) {
		return navigate('/')
	}

	return (
		<h1>Bismillah</h1>
	)
}

export default CreatePost