import React, { useState, useEffect } from 'react'
import './Result.css'
import { PushpinTwoTone } from '@ant-design/icons'

//import { object } from './defaultlist'



function Result (props) {

  const { passData, getResultPopup } = props
  const [showPin, setShowPin] = useState({})
  function popMap (item) {
    getResultPopup(item)
    setShowPin(item)
  }
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
              <li onClick={() => popMap(item)}>

                <h3 className='Result-Name'>{item.name}{showPin === item ? <PushpinTwoTone style={{ float: 'right' }} /> : null}</h3>
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

