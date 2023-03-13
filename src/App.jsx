import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import VerifyEmail from './pages/VerifyEmail'
import ResetReq from './pages/ResetReq'
import ResetForm from './pages/ResetForm'
import PostPage from './pages/PostPage'
import EditPost from './pages/EditPost'
import CreatePost from './pages/CreatePost'
import Setting from './pages/Setting'
import Authors from './pages/Authors'
import AuthorPage from './pages/AuthorPage'
import CategoriesPage from './pages/CategoriesPage'
import TagsPage from './pages/TagsPage'
import Header from './components/Header'
import NotFound from './components/NotFound'
import { UserContextProvider } from './store/UserContext'

const App = () => {
	return (
		<UserContextProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<IndexPage />} />
					<Route path={'/home'} element={<IndexPage />} />
					<Route path={'/login'} element={<LoginPage />} />
					<Route path={'/verify'} element={<VerifyEmail />} />
					<Route path={'/reset'} element={<ResetReq />} />
					<Route path={'/reset-form'} element={<ResetForm />} />
					<Route path={'/create'} element={<CreatePost />} />
					<Route path={'/account'} element={<Setting />} />
					<Route path={'/post'} element={<PostPage />} />
					<Route path={'/edit'} element={<EditPost />} />
					<Route path={'/tags'} element={<TagsPage />} />
					<Route path={'/authors'} element={<Authors />} />
					<Route path={'/author'} element={<AuthorPage />} />
					<Route path={'/categories'} element={<CategoriesPage />} />
				</Route>
			</Routes>
		</UserContextProvider>
	)
}

export default App