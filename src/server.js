import { createServer, Model } from 'miragejs'

createServer({
    models: {
        todo: Model.extend({}),
      },
      seeds(server) {

        server.create('todo', {
          name: 'Get backups MYSQL',
          checked: 0,
        })
        server.create('todo', {
          name: 'Clean cache Prod. Server',
          checked: 0,
        })
        server.create('todo', {
          name: 'Learn Tailwind',
          checked: 0,
        })
      },
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