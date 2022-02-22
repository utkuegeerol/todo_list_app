import { createServer } from "miragejs";
let TodoList = [
    {id:1, name:'Api check payment to subscriptions'},
    {id:2, name:'go out to lunch'},
    {id:3, name:'learn fake api'},
]


createServer({
    routes(){
        this.namespace = '/api'

        this.post("/todo_list", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            attrs.id = Math.floor(Math.random() * 100)
            TodoList.push(attrs)
            return { newRow: attrs }
          })


        this.get('/todo_list', ()=>{
            return{
                TodoList
            }
        })
    }
})