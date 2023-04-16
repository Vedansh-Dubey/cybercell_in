import React from 'react'
import BlogDetails from '../../Components/Blog/BlogDetails'
import FeaturedBlogs from '../../Components/Blog/FeaturedBlogs'
import RecentPost from '../../Components/Blog/RecentPost'

const BlogDetailPage = () => {
    return (
        <div className="blogPage">
            <RecentPost />
            <div className='featuredandblogs'>
                <BlogDetails />
                <FeaturedBlogs />
            </div>
        </div>
    )
}

export default BlogDetailPage