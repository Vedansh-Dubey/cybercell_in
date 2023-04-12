import React, { useEffect, useState } from 'react'
import { createClient } from "contentful";
import { Link, useParams } from "react-router-dom";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import './BlogDetails.css';


function BlogPost({ singleBlogPost }) {
  const options = {
    renderNode: {
      'embedded-asset-block': (node) => {
        const { fields } = node.data.target;
        return <img className="blog-img" src={fields.file.url} alt={fields.title} />;
      },
      'embedded-entry-block': (node) => {
        const { fields } = node.data.target;
        return <BlogPost singleBlogPost={fields} />;
      },
    },
  };

  return (
    <section className='contentSection'>
      {documentToReactComponents(singleBlogPost?.fields?.blogContent, options)}
    </section>
  );
}



const BlogDetails = () => {

  const [singleBlogPost, setSingleBlogPost] = useState({})

  let { id } = useParams();

  const spaceId = process.env.REACT_APP_SPACE_ID;
  const apiKey = process.env.REACT_APP_API_KEY;
  const client = createClient({ space: spaceId, accessToken: apiKey })

  useEffect(() => {
    const getEntryById = async () => {
      try {
        await client.getEntry(id).then((entries) => {
          setSingleBlogPost(entries)
        })
      } catch (error) {
        console.log(`Error fetching authors ${error}`);
      }
    };
    getEntryById()
  }, [id])

  let source = singleBlogPost?.fields?.coverImage?.fields?.file?.url;

  return (
    <div className="blogDetail_Wrapper">
      <div className="blogHeader">
        <img src={source} className='blogImage'></img>
        <div className='blogSubSection'>
          <h3 className='authorName'> <i className="fas fa-user"/>{singleBlogPost?.fields?.author}</h3>
          <h3 className='publishedOn'><i className="fas fa-calendar"/>{singleBlogPost?.fields?.datePublished}</h3>
        </div>
        <div className='blogContent'>
          <h1 className='blogTitle'>{singleBlogPost?.fields?.title} </h1>
          <section className='contentSection'>
          <BlogPost singleBlogPost={singleBlogPost}/>
          </section>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails