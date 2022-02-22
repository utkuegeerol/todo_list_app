import { createServer } from "miragejs";

createServer({
    routes(){
        this.namespace = '/api'

        this.get('/todo_list', ()=>{
            return{
                todo:[
                    {id:1, name:'Api check payment to subscriptions'},
                    {id:2, name:'go out to lunch'},
                    {id:3, name:'learn fake api'},
                ]
            }
        })
    }
})