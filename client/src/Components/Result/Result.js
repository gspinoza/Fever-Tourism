import React, { useState, useEffect } from 'react'
import './Result.css'
import { string } from '../SearchBar/SearchBar'
import Search from 'antd/lib/transfer/search'
import axios from "axios"
//import { object } from './defaultlist'


function Result (props) {

  const { passData } = props

  const [objects, setObjects] = useState([])
  const [placeinfo, setPlaceinfo] = useState([])


  /*
  async function placedata (placeid) {
    await axios(`http://localhost:4000/axios/nyc/place/details/${placeid}`)
      .then(response => response.data)
      .then(result => {
        console.log(3)
        //console.log(result)
        var newobject = placeinfo
        newobject.push(result)
        console.log(newobject)
        setPlaceinfo(newobject)
      }
      )
      .catch(error => console.log('error', error))
  }
  */

  /*
  useEffect(() => {
    setPlaceinfo(object)
  }, [])
  */


  /*
  useEffect(() => {

    console.log(passData)
    setPlaceinfo([])
    passData.map((item) => {
      placedata(item.id)
    })

    
    for (let i = 0; i < 2; i++) {
      placedata(passData[i].id)
    }
    

  }, [passData])
  */


  console.log(passData)



  return (
    <div className='Result'>
      <ul>
        {passData.map(item =>
          <li key={item.id}>
            <h3 className='Result-Name'>{item.name}</h3>
            <div className='Result-Category'>{item.category.join(', ')}</div>
            <div className='Result-Rate'>Rating : {item.rate}</div>
          </li>
        )}
      </ul>
    </div>
  )
}
export default Result

