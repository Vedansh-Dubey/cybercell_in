import React from 'react'
import BlogCard from '../../Components/Blog/BlogCard'
import './BlogPage.css';
import CardSlider from '../../Components/Blog/BlogCarousel';
import { SimpleSlider } from '../../Components/Blog/Slider/slider';
const BlogPage = () => {
  return (
    <div className="blogPage">
              <SimpleSlider/>
              <BlogCard/>
    </div>
  )
}

export default BlogPage