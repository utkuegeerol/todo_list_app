import React, { useEffect, useState } from "react";


function App() {

    const [todo, setTodo] = useState([]);

    useEffect(() => {
        fetch('/api/todo_list')
            .then((res) => res.json())
            .then((json) => setTodo(json.TodoList))
            .catch((err) => console.log(err))
    }, [])




    return (
        <div className="container">

            <div className="row justify-content-center">


                {todo.length > 0 ? <>
                    <table className="table">
                        <tbody>
                            {todo.map((x, y) => <div key={y}>
                                {x.name}
                            </div>)}
                        </tbody>

                    </table>

                </> : <>
                    <p>No List</p>

                </>
                }

            </div>
        </div>

    );
}

export default App;
