import React, { useState, useEffect } from 'react'
import './Result.css'
import { string } from '../SearchBar/SearchBar'
import Search from 'antd/lib/transfer/search'
import axios from "axios"
//import { object } from './defaultlist'



function Result (props) {

  const { passData } = props

  console.log(passData)
  if (passData.length === 1 && passData[0] === 'no result') {
    return (
      <div className='Result'>
        Result
        <div className='Result-List'>
          <ul>
            No Result
          </ul>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='Result'>
        Result
        <div className='Result-List'>
          <ul>
            {passData.map(item =>
              <li>
                <h3 className='Result-Name'>{item.name}</h3>
                <div className='Result-Category' >{item.category.join(', ')}</div>
              </li>)
            }

          </ul>
        </div>
      </div>
    )
  }
}
export default Result

