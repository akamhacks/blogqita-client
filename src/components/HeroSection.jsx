import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative, Autoplay } from "swiper";
import moment from 'moment'
import { Link } from 'react-router-dom'
import { BsCalendar2Day } from 'react-icons/bs'
import { HiOutlineClock } from 'react-icons/hi'

const HeroSection = ({ posts }) => {
	return (
		<div>
			<Swiper
				grabCursor={true}
				loop={true}
				effect={"creative"}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				creativeEffect={{
					prev: {
						shadow: true,
						origin: "left center",
						translate: ["-5%", 0, -200],
						rotate: [0, 100, 0],
					},
					next: {
						origin: "right center",
						translate: ["5%", 0, -200],
						rotate: [0, -100, 0],
					},
				}}
				modules={[EffectCreative, Autoplay]}
				className="h-128 flex-1 left-0"
			>
				{posts.map(post => (
					<SwiperSlide>
						<div className="flex gap-2 max-md:flex-col-reverse rounded-lg">
							<div className="ml-4 flex-1 text-left mb-0 relative">
								<Link to={`/post?id=${post._id}`} className="text-4xl font-bold hover:underline">{ post.title }</Link>
								<p className="font-mono text-gray-500 mt-6 mb-4"> Lorem, ipsum, dolor sit amet consectetur adipisicing elit. Quaerat totam ea sunt eaque corporis aliquid. Iure blanditiis voluptate doloremque eius.</p>
								<span className="flex text-gray-400">
									<BsCalendar2Day className="h-5" />
									<time className="ml-1">{moment(post.createdAt).format('MMM DD, YYYY HH:mm')}</time>
									<HiOutlineClock className="h-5 ml-4" />
									<p className="ml-1">4 min read</p>
								</span>
								<p className="text-gray-400">{post.count && `Dikunjungi ${post.count} kali` }</p>
								<a href="/" className="font-bold text-gray-500">Writed By : <span className="text-gray-600">@{ post.author.name }</span></a>
								<div className="flex flex-wrap gap-3 container md:w-9/12 mt-3">
									{post.categories.map(category => <span className="bg-gray-600 hover:bg-gray-900 duration-300 rounded-full px-4 py-2 font-light font-mono text-white text-sm"><a href={`/tags/${category}`}>#{category} </a></span>)}
								</div>
							</div>
							<div className="flex-1">
								<div className="bg-white aspect-video rounded-2xl p-4">
									<Link to={`/post?id=${post._id}`} className="block overflow-hidden rounded-lg">
										<img
											src={`http://localhost:4000/${post.cover}`}
											className="w-full h-full object-cover group-hover:ease-in-out transition duration-500 hover:scale-[1.03]"
											onError={event => {
												event.target.src = "http://localhost:4000/uploads/null.png"
												event.onerror = null
											}}
										/>
									</Link>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)	
}

export default HeroSection