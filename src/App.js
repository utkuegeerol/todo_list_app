import React,{useEffect,useState} from "react";


function App() {

  const [todo,setTodo] = useState(null);
  
  useEffect(()=>{
    fetch('/api/todo_list')
    .then(res=>res.json())
    .then(json=>setTodo(json.todo))
    .catch(err=>console.log(err))
  },[])




  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col">

        </div>
      </div>
    </div>

  );
}

export default App;
