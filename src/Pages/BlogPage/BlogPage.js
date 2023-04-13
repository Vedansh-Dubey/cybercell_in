import React from 'react'
import BlogCard from '../../Components/Blog/BlogCard'
import './BlogPage.css';
import RecentPost from '../../Components/Blog/RecentPost';
const BlogPage = () => {
  return (
    <div className="blogPage">
              <RecentPost/>
              <BlogCard/>
    </div>
  )
}

export default BlogPage