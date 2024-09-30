import React from 'react'
import { MdArrowBackIos, MdArrowBackIosNew } from 'react-icons/md'
import { Link } from 'react-router-dom'
const Costum_header = ({title,classN}) => {
  return (
    <div className={`${classN}`}>
    <Link to={"/"}>
      <MdArrowBackIos size={40} style={{padding:'0 10'}}/>
    </Link>
    <h2>{title}</h2>
  </div>
  )
}

export default Costum_header