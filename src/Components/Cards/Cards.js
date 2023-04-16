import React from 'react';
import './Cards.css';
import { useInView } from "react-intersection-observer";
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom';

const Card = ({ title, body }) => {
  const { ref, inView } = useInView({ threshold: 0 });
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };
  return (
    <motion.div ref={ref} className="card" variants={variants} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.10, duration: 0.75 }}>
      <div className="card-details">
        <p className="text-title">{title}</p>
        <hr className='hr1'/>
        <p className="text-body">{body}</p>
      </div>
      <Link to='/contact' className="card-button">More info</Link>
    </motion.div>
  );
};

export default Card;


