import React from 'react'
import { Link } from 'react-router-dom'

export default function LayoutProduct() {
  return (
      <nav>
          <ul>
              <li><Link to={"/adddd-product"}>Add product</Link></li>
              <li><Link to={"/update-product"}>Update product</Link></li>
              <li><Link to={"/delete-product"}>Delete product</Link></li>
          </ul>
      </nav>
  )
}
