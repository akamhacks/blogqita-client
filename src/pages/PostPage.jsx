import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../store/UserContext'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import moment from 'moment'
import ArticleLoader from '../components/ArticleLoader'
import Tags from '../components/Tags'
import Categories from '../components/Categories'
import LatestPost from '../components/LatestPost'
import CommentForm from '../components/CommentForm'
import CommentsBody from '../components/CommentsBody'
import { BsCalendar2Day } from 'react-icons/bs'
import { RiArticleFill, RiLinkedinFill, RiRedditLine, RiDislikeFill } from 'react-icons/ri'
import { FcLike } from 'react-icons/fc'
import { BsFillPersonFill, BsTwitter, BsInstagram, BsWhatsapp, BsSnapchat, BsYoutube, BsGithub } from 'react-icons/bs'
import { TfiFacebook } from 'react-icons/tfi'
import { SiTiktok, SiDiscord } from 'react-icons/si'
import { FaTelegramPlane, FaPinterestP } from 'react-icons/fa'

const PostPage = () => {
	const { userInfo } = useContext(UserContext)
	const [postInfo, setPostInfo] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isLoadingComment, setIsLoadingComment] = useState(true)
	const [categories, setCategories] = useState()
	const [comments, setComments] = useState()
	const [commentText, setCommentText] = useState('')
	const [searchParams, setSearchParams] = useSearchParams()
	const id = searchParams.get('id')

	const getSinglePost = async () => {
		const res = await axios.get(`http://localhost:4000/api/post?id=${id}`).catch(err => console.log(err))
		const data = await res.data
		return data
	}

	const getComments = async () => {
		const res = await axios.get(`http://localhost:4000/api/comments?postId=${id}`).catch(err => console.log(err))
		const data = await res.data
		return data
	}

	const removeComment = (id) => {
		const res = axios.delete(`http://localhost:4000/api/comment?id=${id}`).catch(err => console.log(err))
		setComments(current => current.filter(comment => comment._id !== id))
	}

	const postComment = async (e) => {
		e.preventDefault()
		const res = await axios.post(`http://localhost:4000/api/comment?id=${id}`, { commentText: commentText}, {
			withCredentials: true
		}).catch(err => console.log(err))
		setCommentText('')
	}

	const likeHandler = async (id) => {
		const res = await axios.post(`http://localhost:4000/api/like?id=${id}`, {}, {
			withCredentials: true
		}).catch(err => console.log(err))
		setCommentText(`${commentText} `)
	}

	const dislikeHandler = async (id) => {
		const res = await axios.post(`http://localhost:4000/api/dislike?id=${id}`, {}, {
			withCredentials: true
		}).catch(err => console.log(err))
	}

	const replyHandler = async (id) => {
		const res = await axios.put(`http://localhost:4000/api/reply?id=${id}`, {commentText: commentText}, {
			withCredentials: true
		}).catch(err => console.log(err))
		setCommentText('')
		const replyForm = document.getElementsByClassName(`${id}__reply`)
		replyForm[0].classList.toggle('hidden')
	}

	const updateHandler = async (id) => {
		const res = await axios.put(`http://localhost:4000/api/comment?id=${id}`, {commentText: commentText}, {
			withCredentials: true
		}).catch(err => console.log(err))
		setCommentText('')
		const replyForm = document.getElementsByClassName(`${id}__update`)
		replyForm[0].classList.toggle('hidden')
	}

	const showComments = () => {
		getComments().then(data => {
			setIsLoadingComment(false)
			setComments(data)
		})
		const button = document.getElementsByClassName('comments__button')
		const comment = document.getElementsByClassName('comment__section')
		button[0].classList.toggle('hidden')
		comment[0].classList.toggle('hidden')
	}

	useEffect(() => {
		getSinglePost()
			.then(data => {
				setPostInfo(data.post)
				setIsLoading(false)
			})
	}, [commentText])

	useEffect(() => {
		getComments().then(data => {
			setIsLoadingComment(false)
			setComments(data)
		})
	}, [commentText])

	if(isLoading) {
		return (
			<h1>Loading ...</h1>
		)
	}

	return (
		<div className="flex flex-col gap-12 ">
			<div className="bg-white rounded-3xl shadow-2xl p-4">
				<img src={`http://localhost:4000/${postInfo?.cover}`} className="rounded-xl h-96 w-full object-cover" />
			</div>
			<div className="flex flex-row gap-10 max-lg:flex-col">
				<div className="basis-3/4 bg-white rounded-3xl p-4 shadow-xl mb-10 h-fit flex flex-col">
					<h2 className="m-0 text-2xl font-bold font-['roboto'] leading-8 text-center mb-4">{ postInfo?.title }</h2>
					<span className="text-gray-500 mb-8 flex ">
						<Link to={`/author?id=${postInfo?.author?._id}`}>@{ postInfo?.author?.name }</Link>
						<BsCalendar2Day className="h-5 ml-4 mr-1" />
						<time className="text-gray-600">{moment(postInfo?.createdAt).format('MMM DD, YYYY HH:mm')}</time>
					</span>
					<div className="text-gray-900 leading-8" dangerouslySetInnerHTML={{__html: postInfo?.content}} />
					<div className="flex flex-row-reverse flex-wrap gap-1 container md:w-9/12 mt-4 left-0 relative">
						{postInfo?.categories.map(category => <span key={category} className="bg-gray-200 hover:bg-gray-400 duration-300 rounded-full px-2 py-1 font-mono text-xs relative shadow-md"><a href={`/tags/${category}`}>#{category} </a></span>)}
					</div>
					{userInfo?.name === postInfo?.author.name && (
						<div className="text-center mt-5">
							<Link to={`/edit?id=${postInfo?._id}`} className="bg-black text-white py-2 px-4 rounded inline-flex items-center gap-1">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
									<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
								</svg>
								Edit This Post
							</Link>
						</div>
					)}
					<div className="flex mx-auto text-black gap-3">
						<FcLike className="w-6 h-6" />
						<RiDislikeFill className="w-6 h-6" />
					</div>
				</div>
				<div className="basis-1/4 bg-white rounded-2xl p-4 text-center shadow-xl h-fit flex flex-col gap-5">
					<LatestPost />
					<Tags />
					<Categories />
				</div>
			</div>
			<div className="bg-white rounded-3xl shadow-2xl p-6 w-[-425rem] mx-auto">
				<Link to={`/author?id=${postInfo?.post?.author?._id}`} className="rounded-full mx-auto h-32 w-32 overflow-hidden">
					<img src={`http://localhost:4000/${postInfo?.post?.author?.image}`} className="rounded-full mx-auto h-32 w-32" alt=""/>
				</Link>
				<h3 className="text-center font-bold text-xl"><Link to={`/author?id=${postInfo?.post?.author?._id}`}>{ postInfo?.post?.author?.name }</Link></h3>
				<p className="text-center text-gray-600">{postInfo?.post?.author?.bio}</p>
				<div className="p-4 border-t mx-8 mt-2 text-center">
					<div className="sharing-buttons flex flex-wrap justify-start">
						{ postInfo?.post?.author?.socialsAccounts?.whatsapp && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-2 rounded-full text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ postInfo?.post?.author?.socialsAccounts?.whatsapp }>
							<BsWhatsapp className="w-4 h-4" />
						</a>}
						{ postInfo?.post?.author?.socialsAccounts?.tiktok && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-2 rounded-full text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ postInfo?.post?.author?.socialsAccounts?.tiktok }>
							<SiTiktok className="w-4 h-4" />
						</a>}
						{ postInfo?.post?.author?.socialsAccounts?.instagram && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-2 rounded-full text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ postInfo?.post?.author?.socialsAccounts?.instagram }>
							<BsInstagram className="w-4 h-4" />
						</a>}
						{ postInfo?.post?.author?.socialsAccounts?.facebook && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-2 rounded-full text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ postInfo?.post?.author?.socialsAccounts?.facebook }>
							<TfiFacebook className="w-4 h-4" />
						</a>}
						{ postInfo?.post?.author?.socialsAccounts?.github && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-2 rounded-full text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ postInfo?.post?.author?.socialsAccounts?.github }>
							<BsGithub className="w-4 h-4" />
						</a>}
						{ postInfo?.post?.author?.socialsAccounts?.twitter && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-2 rounded-full text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ postInfo?.post?.author?.socialsAccounts?.twitter }>
							<BsTwitter className="w-4 h-4" />
						</a>}
						{ postInfo?.post?.author?.socialsAccounts?.linkedin && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-2 rounded-full text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ postInfo?.post?.author?.socialsAccounts?.linkedin }>
							<RiLinkedinFill className="w-4 h-4" />
						</a>}
						{ postInfo?.post?.author?.socialsAccounts?.telegram && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-2 rounded-full text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ postInfo?.post?.author?.socialsAccounts?.telegram }>
							<FaTelegramPlane className="w-4 h-4" />
						</a>}
						{ postInfo?.post?.author?.socialsAccounts?.pinterest && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-2 rounded-full text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ postInfo?.post?.author?.socialsAccounts?.pinterest }>
							<FaPinterestP className="w-4 h-4" />
						</a>}
						{ postInfo?.post?.author?.socialsAccounts?.discord && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-2 rounded-full text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ postInfo?.post?.author?.socialsAccounts?.discord }>
							<SiDiscord className="w-4 h-4" />
						</a>}
						{ postInfo?.post?.author?.socialsAccounts?.reddit && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-2 rounded-full text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ postInfo?.post?.author?.socialsAccounts?.reddit }>
							<RiRedditLine className="w-4 h-4" />
						</a>}
						{ postInfo?.post?.author?.socialsAccounts?.snapchat && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-2 rounded-full text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ postInfo?.post?.author?.socialsAccounts?.snapchat }>
							<BsSnapchat className="w-4 h-4" />
						</a>}
						{ postInfo?.post?.author?.socialsAccounts?.youtube && <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-2 rounded-full text-white border-slate-600 bg-slate-600 hover:bg-white hover:border-slate-400 hover:text-slate-700" target="_blank" rel="noopener" href={ postInfo?.post?.author?.socialsAccounts?.whatsapp }youtube>
							<BsYoutube className="w-4 h-4" />
						</a>}	
					</div>
				</div>
			</div>
			<button
				onClick={showComments}
				type="button"
				class="-mt-10 mb-2 block w-full rounded border-2 border-primary px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 comments__button"
				data-te-ripple-init>
				Show {comments?.length} Comments ...
			</button>
			<div className="flex flex-col gap-10 comment__section hidden">
				<CommentForm
					commentText={commentText}
					setCommentText={setCommentText}
					postComment={postComment}
				/>
				<CommentsBody
					comments={comments}
					isLoading={isLoadingComment}
					removeComment={removeComment}
					likeHandler={likeHandler}
					dislikeHandler={dislikeHandler}
					replyHandler={replyHandler}
					updateHandler={updateHandler}
					commentText={commentText}
					setCommentText={setCommentText}
				/>
			</div>
		</div>
	)
}

export default PostPage