import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {

    const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className='bg-bg-secondary border border-border-color p-2 text-xl rounded-full text-text-primary hover:bg-bg-card-hover shadow-sm transition-colors cursor-pointer flex items-center justify-center'> 
        <IoArrowBackOutline />
    </button>
  )
}

export default BackButton