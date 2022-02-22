import 'antd/lib/checkbox/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/button/style/index.css';
import React, { useEffect, useState } from "react";
import { Form, Input, Checkbox, Button } from 'antd';
import { RiDeleteBinFill } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
import './App.scss';

function App() {
    const [list, setTodoList] = useState(null)

    const [listId, setListId] = useState(null)

    const [checkedId, setCheckedId] = useState({ list: [] })

    const [updating, setUpdating] = useState(false)

    const [name, setName] = useState('')

    const [checked, setChecked] = useState(0)


    useEffect(() => {
        let list = []
        fetch('/api/todos', { method: 'GET' })
            .then((res) => res.json())
            .then((json) => {

                list = (json.todos.filter(item => {return item.checked})).map(({ id }) => id);

                setCheckedId(prev => {
                    const newCheckedId = { ...prev }
                    newCheckedId.list = list
                    return newCheckedId
                })

                setTodoList(json.todos)

            })
            // .then(()=>{console.log(list)})
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


    const deleteTodoFormList = async (id) => {
        try {
            await fetch(`/api/todos/${id}`, { method: 'DELETE' })

            setTodoList(list.filter((m) => m.id !== id))
        } catch (err) {
            console.log(err)
        }
    }


    const setListToUpdate = (id) => {
        const newOne = list.find((m) => m.id === id)
        if (!newOne) return
        setUpdating(true)
        setListId(newOne.id)
        setName(newOne.name)
        setChecked(newOne.checked)
    }


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-8 col-12">
                    <h1 className="fw-normal text-left my-3">ToDo List</h1>
                    <div className="mt-3">
                        <Form>
                            <div className="row ustify-content-end">
                                <div className="col-xl-10 col-lg-10 col-md-9 col-sm-9 col-12 mb-3">
                                    <Input size='large' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="d-xl-none d-lg-none d-md-none d-sm-none col-9"></div>
                                <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-3 m">
                                    <Button size="large" onClick={submitForm} className="w-full float-right btn_add">{updating ? 'Update' : 'Add'}</Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                    {list?.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>name</th>
                                    <th className='text-right'>actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map(({ id, name, checked }) => (
                                    <tr key={id}>
                                        <td className='border-1 border-end-0'>
                                            <Checkbox defaultChecked={checked} onChange={e => {

                                                let newID = [id]

                                                let checkedIdList = checkedId.list

                                                let details

                                                if (e.target.checked && !checkedIdList.includes(id)) {

                                                    details = [...new Set(checkedIdList.concat(...newID))]

                                                }

                                                if (!e.target.checked && checkedIdList.includes(id)) {

                                                    let index = checkedIdList.indexOf(id)

                                                    delete checkedIdList[index]

                                                    details = checkedIdList.filter(i => i !== undefined)

                                                }

                                                // console.log(details)

                                                setCheckedId(prev => {
                                                    const newCheckedId = { ...prev }
                                                    newCheckedId.list = details
                                                    return newCheckedId
                                                })


                                            }} />
                                        </td>
                                        <td className={checkedId.list.includes(id) ? 'line-through' : ''}>{name}</td>
                                        <td className='border-1 border-start-0 text-right'>
                                            <Button
                                                className="me-0 me-xl-3 me-lg-3 me-md-3 me-sm-3 btn_update"
                                                style={{ color: "red" }}
                                                onClick={() => setListToUpdate(id)}
                                            >
                                                <GrDocumentUpdate />
                                            </Button>

                                            <Button
                                                className="btn_delete"
                                                onClick={() => deleteTodoFormList(id)}
                                            >
                                                <RiDeleteBinFill />
                                            </Button>
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
