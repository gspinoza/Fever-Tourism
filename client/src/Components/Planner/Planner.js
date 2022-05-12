import React, { useRef } from 'react'
import './Planner.css'
import { Drawer, Modal, Input, message, Empty } from 'antd'
import { useState } from 'react'
import { EditTwoTone, PlusCircleTwoTone, DeleteTwoTone } from '@ant-design/icons'
import ReactToPrint from 'react-to-print'

const { TextArea } = Input


function Planner (props) {
  const componentRef = useRef()
  const { passPlannerList, showPlanner, addPlanner } = props

  const [noteVisible, setNoteVisible] = useState(false)
  const [current, setCurrent] = useState({})
  const [note, setNote] = useState('')
  const [value, setValue] = useState(0) // used for force rerender the component
  const [noteReplace, setNoteReplace] = useState('')

  function closePlanner () {
    showPlanner(false)
  }

  function addNote (item) {
    setCurrent(item)
    setNoteVisible(true)
  }

  function saveNote () {
    setNoteVisible(false)
    var temp = passPlannerList

    temp.map((object) => {
      if (object === current) {
        var noteTemp
        if (object.notes === undefined) {
          noteTemp = []
          noteTemp.push(note)
          object.notes = noteTemp
        }
        else {
          if (noteReplace !== '') {
            for (let i = 0; i < object.notes.length; i++) {
              if (object.notes[i] === noteReplace) {
                object.notes[i] = note
                success('Note changed')
              }
            }
          }
          else {
            object.notes.push(note)
            success('Note added')
          }
        }
      }
    })

    addPlanner(temp)
    setNote('')
    setNoteReplace('')
  }

  function delNote (item, n) {
    setValue(value + 1)

    var temp = passPlannerList
    temp.map((object) => {
      if (object === item) {
        object.notes = object.notes.filter((result) => result !== n)
      }
    })
    addPlanner(temp)
    success('Note deleted')

  }

  function success (msg) {
    message.success({
      content: msg,
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    })
  };


  function editNote (item, n) {
    setCurrent(item)
    setNoteVisible(true)
    setNoteReplace(n)
  }

  const handleCancel = () => {
    setNoteVisible(false)
  }


  return (
    <div className="Planner">
      <Drawer
        title="Planner"
        placement='left'
        onClose={closePlanner}
        closable={true}
        visible={true}
      >
        <ReactToPrint
          trigger={() => <button className='Planner-button'>Print Planner</button>}
          content={() => componentRef.current}
        />

        <div ref={componentRef}>
          {passPlannerList.length === 0 ? <><br /><br /><br /><Empty description={'No Item'} /> </> :
            <ol style={{ font: '5rem' }}>
              {passPlannerList.map(item =>
                <li style={{ borderTop: '#eee 1px solid', font: '5rem' }}>
                  <h2>{item.name}</h2>
                  <h3 style={{ fontWeight: 'bold' }}>Address :</h3>
                  <div>{item.address}</div><br />
                  {item.notes === undefined ?
                    <div>Add Note<PlusCircleTwoTone
                      style={{ float: 'right', fontSize: '22px' }}
                      onClick={() => addNote(item)}
                      twoToneColor='#2ea654'
                    /></div> :
                    <>
                      <div>Note : <PlusCircleTwoTone
                        style={{ float: 'right', fontSize: '22px' }}
                        onClick={() => addNote(item)}
                        twoToneColor='#2ea654'
                      /></div>
                      <ul>{item.notes.map((n) =>
                        <li style={{ padding: '5px' }}>{n}
                          <DeleteTwoTone
                            style={{ paddingRight: '20%', float: 'right' }}
                            onClick={() => delNote(item, n)}
                            twoToneColor='#f54242'
                          />
                          <EditTwoTone style={{ paddingRight: '5%', float: 'right' }} onClick={() => editNote(item, n)} />
                        </li>
                      )}
                      </ul>
                    </>}
                  <br />
                  <Modal title="Add Note" visible={noteVisible} onOk={saveNote} onCancel={handleCancel}>
                    <TextArea
                      placeholder="Add your note here..."
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </Modal>
                </li>
              )}
            </ol>}
        </div>
      </Drawer>
    </div>
  )
}
export default Planner