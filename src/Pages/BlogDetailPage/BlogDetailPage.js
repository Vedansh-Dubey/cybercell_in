import React from 'react'
import BlogDetails from '../../Components/Blog/BlogDetails'
import FeaturedBlogs from '../../Components/Blog/FeaturedBlogs'
import RecentPost from '../../Components/Blog/RecentPost'
import { QueryClient, QueryClientProvider } from 'react-query';

const BlogDetailPage = () => {
    const queryClient = new QueryClient();

    return (
        <div className="blogPage">
            <RecentPost />
            <div className='featuredandblogs'>
            <QueryClientProvider client={queryClient}>
                <BlogDetails />
                </QueryClientProvider>
                <FeaturedBlogs />
            </div>
        </div>
    )
}

export default BlogDetailPage