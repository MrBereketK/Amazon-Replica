import React from 'react'
import Layout from '../../src/Components/Layout/Layout'
import Carousel from "../../src/Components/Carousel/Carousel";
import Category from '../../src/Components/Category/Category'
import Product from '../../src/Components/Product/Product'

const Landing = () => {
  return (
    <Layout>
      <Carousel />
      <Category />
      <Product />
    </Layout>
  )
}

export default Landing
