import React, { useState, useEffect } from 'react'
import './Result.css'
import { string } from '../SearchBar/SearchBar'
import Search from 'antd/lib/transfer/search'
import axios from "axios"
//import { object } from './defaultlist'


function Result (props) {

  const { passData } = props

  return (
    <div className='Result'>
      Result
      <div className='Result-List'>
        <ul>
          {passData.map(item =>
            <li key={item.id}>
              <h3 className='Result-Name'>{item.name}</h3>
              <div className='Result-Category' >{item.category.join(', ')}</div>
            </li>)
          }

        </ul>
      </div>
    </div>
  )
}
export default Result

