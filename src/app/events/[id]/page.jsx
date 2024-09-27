import React from 'react'
import Navbar from '../../../components/navbar/page'

const page = ({params}) => {

  return (
    <div>
             <Navbar />
<p>{params.id}</p>
    </div>
  )
}

export default page
