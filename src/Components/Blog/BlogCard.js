import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./BlogCard.scss";
import { createClient } from "contentful";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useQuery } from 'react-query'; // Import useQuery function from react-query


const BlogCard = () => {

    const spaceId = process.env.REACT_APP_SPACE_ID;
    const apiKey = process.env.REACT_APP_API_KEY;

    const [currentPage, setCurrentPage] = useState(1);

    // Replace useState with useQuery for blogPosts and postArray
    const { data: blogPosts } = useQuery(['blogPosts', currentPage], async () => {
        const client = createClient({ space: spaceId, accessToken: apiKey });
        const response = await client.getEntries({
            content_type: "blog",
            order: '-fields.title',
            limit: 5,
            skip: (currentPage - 1) * 5,
        });
        return response.items;
    });

    const { data: postArray } = useQuery('postArray', async () => {
        const client = createClient({ space: spaceId, accessToken: apiKey });
        const response2 = await client.getEntries();
        return response2.items;
    });

    const size = postArray?.length || 0;


    return (
        <div className="main-container">
            <div className='blog-card-container'>
                {blogPosts?.map((post) => (
                    <div className="blog-card" key={post.sys.id}>
                        <div className="meta">
                            <div className="photo" style={{ backgroundImage: `url(${post.fields.coverImage.fields.file.url})` }}></div>
                            <ul className="details">
                                <li className="author">{post.fields.author}</li>
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
                                <Link to={`/blogs/${post.sys.id}`}>Read More</Link>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <Stack spacing={2}>
                <Pagination
                    className='paginate' 
                    count={Math.ceil(size / 5)} 
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
