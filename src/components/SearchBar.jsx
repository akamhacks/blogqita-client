import React, { useState, useContext } from 'react'
import { UserContext } from '../store/UserContext'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
	const { setUrlSearch } = useContext(UserContext)
	const [searchValue, setSearchValue] = useState('')
	const [select, setSelect] = useState('title')
	const navigate = useNavigate()

	const handleChange = (selected) => {
		setSelect(selected.target.value)
	};

	const handleSearch = (e) => {
		e.preventDefault()
		setUrlSearch(`?${select}=${searchValue}`)
		navigate("/");
	}

	return (
		<div className="box pt-6 search__bar hidden mb-10">
			<div className="box-wrapper">
				<form
					className="bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200 rounded-full"
					onSubmit={handleSearch}
				>
					<span
						className="outline-none focus:outline-none"
					>
						<svg
							className="w-5 text-gray-600 h-5 cursor-pointer"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
								<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</span>
					<input
						type="search"
						placeholder="Search Blog"
						x-model="q"
						className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
						onChange={e => setSearchValue(e.target.value)}
					/>
					<div className="select">
						<select name="" id="" className="text-sm outline-none focus:outline-none bg-transparent" onChange={handleChange}>
							<option value="title">Title</option>
							<option value="content">Content</option>
							<option value="tags">Tags</option>
							<option value="categories">Categories</option>
							<option value="author">Author</option>
						</select>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SearchBar