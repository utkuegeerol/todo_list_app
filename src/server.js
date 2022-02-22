import { createServer, Model } from 'miragejs'

createServer({
  models: {
    todo: Model.extend({}),
  },
  seeds(server) {

    server.create('todo', {
      name: 'Create simple GUI',
      checked: true,
    })
    server.create('todo', {
      name: 'Create git repo.',
      checked: true,
    })
    server.create('todo', {
      name: 'Should be created with Create-react-app',
      checked: true,
    })

    server.create('todo', {
      name: 'Project should be support GET/POST actions.',
      checked: true,
    })

    server.create('todo', {
      name: 'Use Material-UI for React or custom components.',
      checked: true,
    })

    server.create('todo', {
      name: 'Use Fake Backend Provider or mocked Json file.',
      checked: true,
    })

    server.create('todo', {
      name: 'Support fully responsive design.',
      checked: true,
    })

    server.create('todo', {
      name: 'Use Sass/Scss css pre-processor.',
      checked: true,
    })

    server.create('todo', {
      name: 'Use CDD (Component Driven Development) approach',
      checked: true,
    })

    
  },
  routes() {
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