import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../store/UserContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BsTrashFill, BsReplyFill } from 'react-icons/bs'
import { TbEdit } from 'react-icons/tb'
import { BiLike, BiDislike, BiDotsHorizontalRounded } from 'react-icons/bi'

const CommentsBody = ({ comments, isLoading, removeComment, likeHandler, dislikeHandler, replyHandler, updateHandler, commentText, setCommentText }) => {
	const { userInfo, isLogin } = useContext(UserContext)
	if(isLoading) {
		return <h1>Loading...</h1>
	}
	const displayReplyForm = (id) => {
		const replyForm = document.getElementsByClassName(`${id}__reply`)
		replyForm[0].classList.toggle('hidden')
	}

	const displayUpdateForm = (id) => {
		const replyForm = document.getElementsByClassName(`${id}__update`)
		replyForm[0].classList.toggle('hidden')
	}

	const showComment = (id) => {
		const hiddenComment = document.getElementsByClassName(`${id}__comment__hidden`)
		const visibleComment = document.getElementsByClassName(`${id}__comment__visible`)
		visibleComment[0].classList.toggle('hidden')
		hiddenComment[0].classList.toggle('hidden')
	}

	const marginLeft = ['ml-12', 'ml-24', 'ml-36', 'ml-48', 'ml-60']

	return (
		<>
			<div className="flex flex-col mb-10">
				{comments.map(comment => (
					<>
						<div className={`${marginLeft[comment.depth - 2]} flex flex-row gap-2 border-l border-l-4 border-b rounded-bl-3xl rounded-tl-lg pl-2 pb-6 mb-2 group/tripledot`}>
							<div className="rounded-full w-8 h-8 overflow-hidden -mt-6 max-sm:w-6 max-sm:h-6 max-sm:-ml-5 max-sm:-mt-5 max-sm:absolute">
								<img src={`http://localhost:4000/${comment?.commenter?.image}`} alt={comment?.commenter?.name} className="object-cover rounded-full aspect-square group-hover:ease-in-out transition duration-100 hover:scale-[1.09]" />
							</div>
							<div className="bg-white rounded-xl ml-2 shadow-md -mt-4 min-w-min w-80 min-h-min pr-10 pl-2 hover:bg-slate-100">
								{comment.parentId && <p className="text-gray-500 hover:text-black"><i>reply : </i>@{comment.replyTo}</p>}
								<span>
									<p className="text-gray-500 hover:text-black">@{comment?.commenter?.firstName}</p>
									<Link to={`/author?id=${comment?.commenter?._id}`} className="flex gap-2 border-b pb-2">
									</Link>
								</span>
								<span className="text-gray-600 hover:text-gray-800 flex justify-between">{comment.commentText.length >= 150 ?
										(
											<>
												<p className={`${comment._id}__comment__hidden comment__text__hiddden hidden`}>{comment.commentText}</p>
												<div className={`${comment._id}__comment__visible`}>
													<p>
														${comment.commentText.substring(0, 140)}<span className="blur-[.8px]">{comment.commentText.substring(140, 180)}</span>
														<button onClick={() => showComment(comment._id)}>...read more</button>
													</p>
												</div>
											</>
										) : comment.commentText}</span>
								{isLogin && (
									<>
										<span className="gap-2 text-gray-600 mx-2 my-2 max-sm:flex hidden">
											<BiLike className="hover:cursor-pointer hover:text-black hover:bg-gray-300 rounded-full"onClick={() => likeHandler(comment._id)} />
											<span className="text-gray-600 text-sm">{comment.likes.length}</span>
											<BiDislike className="hover:cursor-pointer hover:text-black hover:bg-gray-300 rounded-full" onClick={() => dislikeHandler(comment._id)} />
											<span className="text-gray-600 text-sm">{comment.dislikes.length}</span>
											<BsReplyFill onClick={() => displayReplyForm(comment._id)} className="hover:cursor-pointer hover:text-black" />
											{userInfo?.name === comment?.commenter?.name && (
												<>
													<TbEdit className="hover:cursor-pointer hover:text-black" onClick={() => displayUpdateForm(comment._id)} />
													<BsTrashFill className="hover:cursor-pointer hover:text-black" onClick={() => removeComment(comment._id)} />
												</>
											)}
										</span>
									</>
								)}
							</div>
							{isLogin && (
								<>
									<div className="inline-block relative my-auto group/item max-sm:hidden">
										<BiDotsHorizontalRounded className="text-gray-500 w-6 h-6 invisible hover:cursor-pointer hover:text-black group-hover/tripledot:visible" />
										<ul className="group-hover/item:flex transition ease-in-out duration-300 absolute hidden text-gray-500 shadow-md rounded-md z-50">
									        <li className>
									        	<BiLike className="hover:cursor-pointer hover:text-black hover:bg-gray-300 rounded-full w-6 h-6" onClick={() => likeHandler(comment._id)} />
									        	<span className="text-gray-600 text-sm">{comment.likes.length}</span>
									        </li>
									        <li className>
									        	<BiDislike className="hover:cursor-pointer hover:text-black hover:bg-gray-300 rounded-full w-6 h-6"  onClick={() => dislikeHandler(comment._id)} />
											<span className="text-gray-600 text-sm">{comment.dislikes.length}</span>
									        </li>
									        <li className>
									        	<BsReplyFill onClick={() => displayReplyForm(comment._id)} className="hover:cursor-pointer hover:text-black w-6 h-6" />
									        </li>
									        {userInfo?.name === comment?.commenter?.name && (
												<>
												<li>
													<TbEdit className="hover:cursor-pointer hover:text-black w-6 h-6" onClick={() => displayUpdateForm(comment._id)} />
												</li>
												<li>
													<BsTrashFill className="hover:cursor-pointer hover:text-black w-6 h-6" onClick={() => removeComment(comment._id)} />
												</li>
													
												</>
											)}
									      </ul>
									</div>
								</>
							)}
						</div>
						<form encType="multipart/form-data" onSubmit={(e) => {
							e.preventDefault()
							updateHandler(comment._id)}
						} className={`${comment._id}__update hidden relative mb-8 -mt-5 ml-8 pl-3`}>
						   <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
						       <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
						           <label for="comment" className="sr-only">Your comment</label>
						           <textarea
							           	id="comment"
							           	rows="4"
							           	className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
							           	placeholder={`Edit Your Comment...`}
							           	required
							           	onChange={(e) => setCommentText(e.target.value)}
							           	value={commentText}
						           	></textarea>
						       </div>
						       <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
						           <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
						               Post comment
						           </button>
						           <div className="flex pl-0 space-x-1 sm:pl-2">
						               <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
						                   <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
						                   <span className="sr-only">Attach file</span>
						               </button>
						               <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
						                   <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
						                   <span className="sr-only">Set location</span>
						               </button>
						               <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
						                   <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
						                   <span className="sr-only">Upload image</span>
						               </button>
						           </div>
						       </div>
						   </div>
						</form>
						<form encType="multipart/form-data" onSubmit={(e) => {
							e.preventDefault()
							replyHandler(comment._id)}
						} className={`${comment._id}__reply hidden relative mb-8 -mt-5 ml-8 pl-3`}>
						   <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
						       <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
						           <label for="comment" className="sr-only">Your comment</label>
						           <textarea
							           	id="comment"
							           	rows="4"
							           	className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
							           	placeholder={`Reply ${comment?.commenter?.name}...`}
							           	required
							           	onChange={(e) => setCommentText(e.target.value)}
							           	value={commentText}
						           	></textarea>
						       </div>
						       <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
						           <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
						               Post comment
						           </button>
						           <div className="flex pl-0 space-x-1 sm:pl-2">
						               <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
						                   <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
						                   <span className="sr-only">Attach file</span>
						               </button>
						               <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
						                   <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
						                   <span className="sr-only">Set location</span>
						               </button>
						               <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
						                   <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
						                   <span className="sr-only">Upload image</span>
						               </button>
						           </div>
						       </div>
						   </div>
						</form>
					</>
				))}
			</div>
		</>
	)
}

export default CommentsBody