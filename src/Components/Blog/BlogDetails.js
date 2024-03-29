import React from 'react'
import { createClient } from "contentful";
import {useParams } from "react-router-dom";
import { documentToReactComponents} from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import './BlogDetails.css';
import { useQuery } from 'react-query';
function BlogPost({ singleBlogPost }) {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
      [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,
      [BLOCKS.HEADING_5]: (node, children) => <h5>{children}</h5>,
      [BLOCKS.HEADING_6]: (node, children) => <h6>{children}</h6>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { url, fileName, contentType } = node.data.target.fields.file;
        return <img className='blog-img' src={url} alt={fileName} contentType={contentType} />;
      },
      [BLOCKS.UL_LIST]: (node, children) => <ul className='details-ul'>{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (node, children) => <blockquote>{children}</blockquote>,
      [BLOCKS.HR]: () => <hr />,
      [INLINES.HYPERLINK]: (node, children) => (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
  };

  return (
    <section className='contentSection'>
      {documentToReactComponents(singleBlogPost?.fields?.blogContent, options)}
    </section>
  );
}



const BlogDetails = () => {
  const { id } = useParams();
  const spaceId = process.env.REACT_APP_SPACE_ID;
  const apiKey = process.env.REACT_APP_API_KEY;
  const client = createClient({ space: spaceId, accessToken: apiKey });

  const {
    isError,
    data: singleBlogPost,
    error,
  } = useQuery(['blogPost', id], () => client.getEntry(id), {
    staleTime: 600000, // Cache duration in milliseconds (10 minutes)
  });

  let source = singleBlogPost?.fields?.coverImage?.fields?.file?.url;


  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="blogDetail_Wrapper">
      <div className="blogHeader">
        <img src={source} className='blogImage' alt='Blog'></img>
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