const app = require('./app/app')
const port = 8000

app.listen(port, () =>{
  console.log(`Server running on port http://localhost:${port}`)
})