import React, { useEffect, useState } from "react";
import { Checkbox, Input, Button, form } from "antd";
import { RiDeleteBinFill } from "react-icons/ri";


function App() {

    const [todo, setTodo] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        fetch('/api/todo_list')
            .then((res) => res.json())
            .then((json) => setTodo(json.TodoList))
            .catch((err) => console.log(err))
    }, [])


    const submitForm = async (event) => {
        event.preventDefault();
        try {

            const res = await fetch('/api/todo_list', {
                method: 'POST',
                body: JSON.stringify({ name })
            })

            const json = await res.json()

            console.log(json)

            setTodo([...todo, json.newRow])

            setName('')

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="container">

            <div className="row justify-content-center">
                <div className="col">
                    <h1 className="fw-normal my-3">
                        ToDo List
                    </h1>
                    {todo.length > 0 ? <>
                        <table className="table">
                            <tbody className="">

                                <tr>
                                    <td colSpan={3} className="p-3 border-bottom-1">

                                        <form onSubmit={submitForm}>
                                            <div className="row">
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <button type="submit" className="btn btn-success">Add</button>
                                                </div>
                                            </div>
                                        </form>
                                    </td>
                                </tr>
                                {todo.map((x, y) => <tr key={y}>

                                    <td className="p-3 border-1 border-end-0">
                                        {y}
                                    </td>
                                    <td className="p-3">
                                        {x.name}
                                    </td>
                                    <td className="p-3 border-1 border-start-0 text-center">
                                        <RiDeleteBinFill className="text-danger" />
                                    </td>

                                </tr>)}
                            </tbody>

                        </table>

                    </> : <>
                        <p>No List</p>

                    </>
                    }
                </div>



            </div>
        </div>

    );
}

export default App;
