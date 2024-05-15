import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProduct from '../components/AdminProduct'

const AllProducts = () => {
  const [uploadToggle, setUploadToggle] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url, {
      method: 'get'
    })
    const dataResponse = await response.json()
    setAllProduct(dataResponse?.data || [])
  }
  useEffect(() => {
    fetchAllProduct()
  }, [])
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-4 rounded-full' onClick={() => setUploadToggle(true)} >Upload Product</button>
      </div>

      <div className='flex items-center gap-5 py-4 flex-wrap h-[calc(100vh-190px)] overflow-y-scroll'>
        {/* {all products list} */}
        {
          allProduct.map((product, index) => {
            return (
              <AdminProduct data={product} key={index+"allproduct"} fetchData={fetchAllProduct}/>
            )
          })
        }
      </div>
      {/* {upload product component} */}
      {
        uploadToggle && <UploadProduct onClose={() => setUploadToggle(false)} fetchData={fetchAllProduct}/>
      }
    </div>
  )
}

export default AllProducts