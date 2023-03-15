import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Post = ({ _id, title, summary, cover, content, createdAt, author, count, categories }) => {
	return (
		<div className="bg-white rounded-[20px] shadow-lg m-10 mt-0 ml-0 flex flex-row p-8 relative max-md:flex-col max-md:m-0 max-md:my-10 max-sm:pb-16 max-lg:pb-12 max-lg:mr-0 gap-8">
			<div className="basis-1/3 max-sm:mb-6 relative right-0 ">
				<Link to={`/post?id=${_id}`} className="block aspect-square max-md:aspect-auto overflow-hidden w-56 h-56 rounded-2xl mx-lg:w-48 max-lg:h-48 max-md:h-full max-md:w-full">
					<img
						src={`https://blogqita-api.up.railway.app/${cover}`}
						onError={event => {
							event.target.src = "https://blogqita-api.up.railway.app/uploads/null.png"
							event.onerror = null
						}}
						className="post__image w-full h-full object-cover group-hover:ease-in-out transition duration-500 hover:scale-[1.03]" alt={`${title}`} />
				</Link>
			</div>
			<div className="basis-2/3 xl:-left-12">
				<Link to={`/post?id=${_id}`}>
					<h2 className="m-0 text-2xl font-bold font-['roboto'] leading-8 hover:underline">{ title }</h2>
				</Link>
				<p className="leading-7 text-gray-700 font-['roboto'] my-4 h-auto overflow-hidden max-h-20">Lorem ipsum dolor sit amet consectetur adipisicing, elit. Cumque repudiandae alias aspernatur! Lorem ipsum dolor sit amet consectetur adipisicing, elit. Cumque repudiandae alias aspernatur!...</p>
				<p className="text-gray-500">{count ? `Visited ${ count } time` : ''}</p>
				{/*<span className="font-light">Writed By : </span>
				<Link to={`/post?id=${_id}`} className="text-gray-600 font-bold">{ author.name }</Link>
				<time className="text-gray-600"> (at {moment(createdAt).format('MMM DD, YYYY HH:mm')})</time>*/}
				<div className="flex flex-row-reverse flex-wrap gap-1 container md:w-9/12 mr-4 mb-4 absolute right-0 bottom-0">
					{categories.map(category => <span className="bg-gray-200 hover:bg-gray-400 duration-300 rounded-full px-2 py-1 font-mono text-xs relative right-0 shadow-md"><a href={`/tags/${category}`}>#{category} </a></span>)}
				</div>
			</div>
		</div>
	)
}

export default Post