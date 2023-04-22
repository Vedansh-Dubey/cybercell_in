import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./BlogCard.scss";
import { createClient } from "contentful";
import { useEffect } from 'react';
import './FeaturedBlogs.css';

const FeaturedBlogs = () => {

    const spaceId = process.env.REACT_APP_SPACE_ID;
    const apiKey = process.env.REACT_APP_API_KEY;
    const [blogPosts, setBlogPosts] = useState([]);
    const client = createClient({ space: spaceId, accessToken: apiKey });

    useEffect(() => {
        const getEntries = async () => {
            try {
                const response = await client.getEntries({
                    limit: 4,
                    content_type: "blog",
                    "fields.featuredPost": "yes",
                })
                console.log(blogPosts)
                setBlogPosts(response.items)
            } catch (error) {
                console.log(`Error fetching entries ${error}`);
            }
        };
        getEntries();
    }, [])

    function handleScrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

    return (
        <div className="featuredPostWrapper">
            <h2 className="featuredPostWrapperHeading">Featured Blogs</h2>
            <hr className='featured-hr'/>
            <div className='postWrapperfeatured'>
                {blogPosts.map((post, index) => (
                     <Link key={index} className='blogClick' to={`/blogs/${post.sys.id}`} onClick={handleScrollToTop}> 
                    <div className="featuredPost" >
                        <img className='bg-image' src={post?.fields?.coverImage?.fields?.file?.url} alt={post.fields.title}></img>
                        <h2 className="recentPostHeading">{post.fields.title}</h2>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default FeaturedBlogs;
