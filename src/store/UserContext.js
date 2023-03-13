import React, { createContext, useState } from 'react'

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState()
	const [isLogin, setIslogin] = useState(Boolean(window.localStorage.getItem('IS_LOGIN_INFO')))
	const [searchValue, setSearchValue] = useState('')

	return (
		<UserContext.Provider value={{userInfo, setUserInfo, isLogin, setIslogin, searchValue, setSearchValue}}>
			{children}
		</UserContext.Provider>
	)
}