import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./BlogCard.scss";
import { createClient } from "contentful";
import { useEffect } from 'react';
import './RecentPost.css';

const RecentPost = () => {

    const spaceId = process.env.REACT_APP_SPACE_ID;
    const apiKey = process.env.REACT_APP_API_KEY;
    const [blogPosts, setBlogPosts] = useState([]);
    const client = createClient({ space: spaceId, accessToken: apiKey })
    useEffect(() => {
        const getEntries = async () => {
            try {
              const response = await client.getEntries({
                content_type: 'blog',
                order: '-fields.datePublished',
                limit: 4,
              });
              setBlogPosts(response.items);
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
        <div className="recentPostWrapper">
            <h2 className="recentPostWrapperHeading">Recent Publishes</h2>
            <hr className='hr'/>
            <div className='postWrapper'>
                {blogPosts.map((post, index) => (
                  <Link className='blogClick'  key={index} to={`/blogs/${post.sys.id}`} onClick={(handleScrollToTop)}>
                    <div className="recentPost">
                        <img className='bg-image' src={post?.fields?.coverImage?.fields?.file?.url} alt={post.fields.title}></img>
                        <h2 className="recentPostHeading">{post.fields.title}</h2>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );

}

export default RecentPost