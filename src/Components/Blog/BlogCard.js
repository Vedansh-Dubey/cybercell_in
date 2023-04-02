import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./BlogCard.scss";
import { createClient } from "contentful";
import { useEffect } from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



const BlogCard = () => {

    const spaceId = process.env.REACT_APP_SPACE_ID;
    const apiKey = process.env.REACT_APP_API_KEY;

    const [currentPage, setCurrentPage] = useState(1);
    const [blogPosts, setBlogPosts] = useState([]);
    const [postArray, setPostArray] = useState([]);
    const client = createClient({ space: spaceId, accessToken: apiKey })
    useEffect(() => {
        const getEntries = async () => {
            try {
                const response2 = await client.getEntries()
                setPostArray(response2.items)
                const response = await client.getEntries({
                    limit: 6,
                    skip: (currentPage - 1) * 6,
                })
                setBlogPosts(response.items)
            } catch (error) {
                console.log(`Error fetching entries ${error}`);
            }
        };
        getEntries();
    }, [currentPage])

    const size = postArray.length;


    return (
        <div>
            <div className='blog-card-container'>
                {blogPosts?.map((post) => (
                    <div className="blog-card" key={post.sys.id}>
                        <div className="meta">
                            <div className="photo" style={{ backgroundImage: `url(${post.fields.coverImage.fields.file.url})` }}></div>
                            <ul className="details">
                                <li className="author"><a href="#">{post.fields.author}</a></li>
                                <li className="date">{new Intl.DateTimeFormat('en-GB', {
                                    month: 'long',
                                    day: '2-digit',
                                    year: 'numeric',
                                }).format(new Date(post.fields.datePublished))}</li>
                            </ul>
                        </div>
                        <div className="description">
                            <h1>{post.fields.title}</h1>
                            <p>{post.fields.coverText}</p>
                            <p className="read-more">
                                <Link to={`/blogs/BlogDetails/${post.sys.id}`}>Read More</Link>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <Stack spacing={2}>
                <Pagination
                    className='paginate' 
                    count={Math.ceil(size / 6)} 
                    color="primary" 
                    page={currentPage} 
                    onChange={(event, value) => {
                        setCurrentPage(value);
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                          });
                      }}  
                />
                </Stack>
        </div>
    )
}

export default BlogCard
