import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function App() {
  const [data, setData] = useState(undefined)

  useEffect(() => {
    axios.get("http://localhost:3000").then(response => setData(response?.data))
  }, [])


  return (
    <div className='flex h-screen w-screen justify-center items-center'>{data}</div>
  )
}
