import React from 'react'
import BlogDetails from '../../Components/Blog/BlogDetails'
import FeaturedBlogs from '../../Components/Blog/FeaturedBlogs'
import RecentPost from '../../Components/Blog/RecentPost'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Helmet } from 'react-helmet';
const BlogDetailPage = () => {
    const queryClient = new QueryClient();

    return (
        <div className="blogPage">
            <Helmet>
                <title>Blogs | Cybercell</title>
                <meta name='keywords' content='Cybersecurity Blogs, Cybercell News, VAPT'/>
                <meta name="description" content="Discover in-depth insights, expert articles, featured blogs, and recent posts on the Blog Detail Page of CyberCell. Stay informed and empowered with our valuable content." />
            </Helmet>

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