import React, { useState, useContext } from 'react'
import { UserContext } from '../store/UserContext'

const Search = () => {
	const { urlSearch, setUrlSearch } = useContext(UserContext)
	const [search, setSearch] = useState('')

	const handleSearch = (e) => {
		e.preventDefault()
		setUrlSearch(search)
	}

	return (
		<form className="bottom-[-7px]" onSubmit={handleSearch}>
			<div className="relative">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="relative top-3 w-3 h-3 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
				<input
					type="text"
					placeholder="Search Article Title"
					className="text-gray-500 ml-4 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600 my-auto w-48 top-[-6px] relative"
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</div>
		</form>
	)
}

export default Search