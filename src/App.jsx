import 'antd/lib/checkbox/style/index.css';
import React, { useEffect, useState } from "react";
import { Form, Input, Checkbox, Button } from 'antd';
import { RiDeleteBinFill } from "react-icons/ri";



function App() {
  const [list, setTodoList] = useState(null)
  
  const [listId, setListId] = useState(null)
  
  const [updating, setUpdating] = useState(false)

  const [name, setName] = useState('')
  
  const [checked, setChecked] = useState(0)


  useEffect(() => {
    fetch('/api/todos',{method:'GET'})
      .then((res) => res.json())
      .then((json) => setTodoList(json.todos))
      .catch((err) => console.log(err))
  }, [])


  const createTodoList = async () => {
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ name, checked }),
      })
      const json = await res.json()

      setTodoList([...list, json.todo])
      setName('')
      setChecked(0)
    } catch (err) {
      console.log(err)
    }
  }


  const updateTodoList = async () => {
    try {
      const res = await fetch(`/api/todos/${listId}`, {
        method: 'PATCH',
        body: JSON.stringify({ name, checked }),
      })
      const json = await res.json()

      const rowCopy = [...list]
      const index = list.findIndex((m) => m.id === listId)
      rowCopy[index] = json.todo

      setTodoList(rowCopy)
      setName('')
      setChecked(0)
      setUpdating(false)
      setListId(null)
    } catch (err) {
      console.log(err)
    }
  }


  const submitForm = async (event) => {

    event.preventDefault()

    if (updating) {
      updateTodoList()
    } else {
      createTodoList()
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col">
          <h1 className="fw-normal text-left my-3">ToDo List</h1>
          <div className="my-4">
            <form onSubmit={submitForm}>
              <div className="row">
                <div className="col-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
        
                <div className="col-2">
                  <button type="submit" className="btn btn-success">
                    {updating ? 'Update' : 'Add'}
                  </button>
                </div>
              </div>
            </form>
          </div>
          {list?.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map(({ id, name, checked }) => (
                  <tr key={id}>
                    <td>
                        <Checkbox/>
                    </td>
                    <td>{name}</td>
                    <td>
                   
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : list ? (
            <p>No list</p>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </div>

    </div>

  );
}

export default App;
