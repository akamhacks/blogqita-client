import React from 'react'
import { useParams, Link } from 'react-router-dom'

const ContainerButton = ({ pages }) => {
	const zonkPrevious = pages === '1'
	return (
		<div className="flex m-2 justify-center">
			<Link to={`/home?page=${ Number(pages) - 1 }`} className={`${
                      zonkPrevious ? "" : " hover:scale-110 focus:outline-none justify-centerrounded font-bold cursor-pointer bg-teal-100 hover:bg-teal-200 text-teal-700"} flex px-4 py-2 text-base rounded-r-none bg-gray-100 text-gray-700 border duration-200 ease-in-out border-gray-600 transition`}>
            	<div className="flex leading-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-left w-5 h-5">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Back</div>
            </Link>
            <Link to={`/home?page=${ Number(pages) + 1 }`} className="text-base  rounded-l-none border-l-0  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                <div className="flex leading-5">Next
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-right w-5 h-5 ml-1">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>
            </Link>
        </div>
	)
}

export default ContainerButton