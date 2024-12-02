const express = require('express')
const app = express()
const PORT = 8080

app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

let animals = [
    {
        id: 1,
        name: "Rover",
        type: "Dog",
        age: 7
    },
    {
        id: 2,
        name: "Spot",
        type: "Cat",
        age: 3
    },
    {
        id: 3,
        name: "Fluffy",
        type: "Rabbit",
        age: 2
    },
    {
        id: 4,
        name: "Goldie",
        type: "Fish",
        age: 1
    }
]

// GET - /api/animals - get all animals in the array
app.get("/api/animals", (req, res) => {
    try {
        res.send(animals)
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})