import React from 'react'
import ListProduct from '../components/ListProduct'
import SlidingBanner from '../components/SlidingBanner'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <ListProduct/>
      <SlidingBanner/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Trending Watches"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Trending Mobiles"}/>
      <VerticalCardProduct category={"mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera & Accessories"}/>
      <VerticalCardProduct category={"televisions"} heading={"Telivisions"}/>
      <VerticalCardProduct category={"earphones"} heading={"Earphones(Wired)"}/>
      <VerticalCardProduct category={"speakers"} heading={"Speakers(Bluetooth)"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"printers"} heading={"Printers"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
      <VerticalCardProduct category={"processors"} heading={"Processors"}/>
    </div>
  )
}

export default Home