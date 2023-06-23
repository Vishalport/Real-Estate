import React from 'react'

export default function Footer() {
  return (
    <div className='text-center p-4 bg-dark text-light mt-4'>
        <h4 className='mt-4'>Realist App - to Buy or Rent the Property</h4>
        <p className='mt-3'>
            &COPY : {new Date().getFullYear()} All rights reserved
        </p>
    </div>
  )
}
