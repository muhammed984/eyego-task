const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
            res.send('Hello Eyego')
          })

  app.listen(port, () => {
              console.log(`this app listening on port ${port}`)
            })
