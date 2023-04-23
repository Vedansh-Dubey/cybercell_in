import React from 'react'
import BlogCard from '../../Components/Blog/BlogCard'
import './BlogPage.css';
import RecentPost from '../../Components/Blog/RecentPost';
import FeaturedBlogs from '../../Components/Blog/FeaturedBlogs';
import { QueryClient, QueryClientProvider } from 'react-query';
const BlogPage = () => {
  const queryClient = new QueryClient();
  return (
    <div className="blogPage">
      <RecentPost />
      <div className='featuredandblogs'>
        <QueryClientProvider client={queryClient}>
          <BlogCard />
        </QueryClientProvider>
        <FeaturedBlogs />
      </div>
    </div>
  )
}

export default BlogPage