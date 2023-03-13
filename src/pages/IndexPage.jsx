import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../store/UserContext'
import { useParams, Navigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Post from '../components/Post'
import HeroSection from '../components/HeroSection'
import ArticleLoader from '../components/ArticleLoader'
import ContainerButton from '../components/ContainerButton'
import Tags from '../components/Tags'
import Categories from '../components/Categories'
import LatestPost from '../components/LatestPost'
axios.defaults.withCredentials = true

const IndexPage = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [posts, setPosts] = useState([])
	const [featuredPosts, setFeaturedPosts] = useState([])
	const{ isLogin, setIslogin, searchValue } = useContext(UserContext)
	const [isLoading, setIsLoading] = useState(true)
	const [dataUser, setDataUser] = useState()
	const pages = searchParams.get('page')
	const getPosts = async () => {
		const res = await axios.get(`http://localhost:4000/api/posts?page=${pages}`, {
			withCredentials: true
		}).catch(err => console.log(err))
		const data = await res.data
		return data
	}

	const checkSetting = async () => {
		const res = await axios.get(`http://localhost:4000/api/profile`).catch(err => console.log(err))
		const data = await res.data
		return data
	}

	const getSearchPosts = async () => {
		const res = await axios.get(`http://localhost:4000/api/search?title=${searchValue}`, {
				withCredentials: true
		}).catch(err => console.log(err))
		const data = await res.data
		return data
	}

	const getFeaturedPosts = async () => {
		const res = await axios.get(`http://localhost:4000/api/featured`, {
				withCredentials: true
		}).catch(err => console.log(err))
		const data = await res.data
		return data
	}
	
	const zonkPost = posts.length < 1

	useEffect(() => {
		if(searchValue) {
			getSearchPosts().then(data => {
				setPosts(data)
				setIsLoading(false)
			})
		} else {
			getPosts().then(data => {
				setPosts(data)
				setIsLoading(false)
			})
			getFeaturedPosts().then(data => {
				setFeaturedPosts(data)
			})
			checkSetting().then(data => {
				setDataUser(data)
			})
		}
	}, [searchValue, pages])

	if(pages === undefined || pages === null) {
		return <Navigate to={'/home?page=1'} />
	}

	if(dataUser?.user?.isSettinged === false) {
		return <Navigate to={`/account?id=${dataUser?.user?._id}`} />
	}

	return (
		<>
			<div className="flex flex-col relative md:ml-10">
				<HeroSection posts={featuredPosts} />
				{isLoading || zonkPost && <ArticleLoader />}
				<div className="flex flex-row gap-2 max-lg:flex-col">
					<div className="basis-3/4">
						{posts.length > 0 && posts.map(post => (
							<Post {...post} key={post._id} />
						))}
					</div>
					<div className="basis-1/4 bg-white rounded-xl p-4 text-center shadow-xl mb-10 h-fit flex flex-col gap-6">
						<LatestPost />
						<Tags />
						<Categories />
					</div>
				</div>
				<ContainerButton pages={pages} />
			</div>
		</>
	)
}

export default IndexPage