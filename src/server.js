import { createServer, Model } from 'miragejs'

createServer({
    models: {
        todo: Model.extend({}),
      },
      seeds(server) {

        server.create('todo', {
          name: 'Get backups MYSQL',
          checked: false,
        })
        server.create('todo', {
          name: 'Clean cache Prod. Server',
          checked: false,
        })
        server.create('todo', {
          name: 'Learn Tailwind',
          checked: false,
        })
      },
    routes(){
        this.namespace = 'api'

        this.get('/')
     
        this.get('/todos')
     
        this.get('/todos/:id')
     
        this.post('/todos', (schema, request) => {
          let attrs = JSON.parse(request.requestBody)
    
          return schema.todos.create(attrs)
        })
    
        this.patch('/todos/:id', (schema, request) => {
          let newAttrs = JSON.parse(request.requestBody)
          let id = request.params.id
          let todo = schema.todos.find(id)
    
          return todo.update(newAttrs)
        })
    
        this.patch('/todos/checked/:id', (schema, request) => {

          console.log(request.params)

          let newAttrs = JSON.parse(request.requestBody)

          console.log(newAttrs)
          let id = request.params.id
          let todo = schema.todos.find(id)

          console.log(todo)
          
          return todo.update(newAttrs)
        })
    
        this.del('/todos/:id')
    }
})