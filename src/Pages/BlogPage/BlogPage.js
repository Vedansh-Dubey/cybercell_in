import React from 'react'
import BlogCard from '../../Components/Blog/BlogCard'
import './BlogPage.css';
import RecentPost from '../../Components/Blog/RecentPost';
import FeaturedBlogs from '../../Components/Blog/FeaturedBlogs';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Helmet } from 'react-helmet';

const BlogPage = () => {
  const queryClient = new QueryClient();
  return (
    <div className="blogPage">
       <Helmet>
                <title>Blogs | Cybercell</title>
                <meta name="description" content="Discover in-depth insights, expert articles, featured blogs, and recent posts on the Blog Detail Page of CyberCell. Stay informed and empowered with our valuable content." />
                <link rel="canonical" href="https://cybercell.in/blogs" />
            </Helmet>
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