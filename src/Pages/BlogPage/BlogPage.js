import React from 'react'
import BlogCard from '../../Components/Blog/BlogCard'
import './BlogPage.css';
import RecentPost from '../../Components/Blog/RecentPost';
import FeaturedBlogs from '../../Components/Blog/FeaturedBlogs';
const BlogPage = () => {
  return (
    <div className="blogPage">
              <RecentPost/>
              <div className='featuredandblogs'>
              <BlogCard/>
              <FeaturedBlogs/>
              </div>
    </div>
  )
}

export default BlogPage