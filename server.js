const express = require('express')
const app = express()
const PORT = 8080

// parse body requests
app.use(express.json())

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

// GET - /api/animals/:id - get animal by id
app.get("/api/animals/:id", (req, res) => {
    try {
        // capture the id of the animal we want to get
        const id = req.params.id

        // find the animal in the array
        const animal = animals.find(
            animal => animal.id === Number(id)
        )

        // validation to check if the animal exists
        if (!animal) {
            res.status(404).send("Animal not found")
        } else {
            res.send(animal)
        }
    } catch (error) {
        console.log(error)
    }
})

// POST - /api/animals - create a new animal
app.post("/api/animals", (req, res) => {
    try {
        // capture the body of the request
        const animal = req.body

        // validation to check it object has a name, type, and age
        if (!animal.name || !animal.type || !animal.age) {
            res.status(400).send("Please provide name, type, and age")
        } else {
            // increment the id of the animal
            animal.id = animals.length + 1
            // add the animal to the array
            animals.push(animal)
        }

        // send the animal back to the client
        res.send(animal)
    } catch (error) {
        console.log(error)
    }
})

// PUT - /api/animals/:id  - update animal by id
app.put("/api/animals/:id", (req, res) => {
    try {
        // capture the id of the animal we want to update
        const id = req.params.id;

        // find the animal in the array
        const animal = animals.find(
            animal => animal.id === Number(id)
        )

        // validation to check if the animal exists
        if (!animal) {
            res.status(404).send("Animal not found")
        } else {
            // update the animal
            animal.name = req.body.name
            animal.type = req.body.type
            animal.age = req.body.age
            res.send(animal)
        }
    } catch (error) {
        console.log(error)
    }
})

// DELETE - /api/animals -  delete all animals
app.delete("/api/animals", (request, response) => {
    try {
        animals = []
        response.send(animals)
    } catch (error) {
        console.log(error)
    }
})

// DELETE - /api/animals/:id - delete animal by id
app.delete("/api/animals/:id", (req, res) => {
    try {
        // capture the id of the animal we want to delete
        const id = req.params.id

        // find the animal in the array
        const animal = animals.find(
            animal => animal.id === Number(id)
        )

        // validation to check if the animal exists
        if (!animal) {
            res.status(404).send("Animal not found")
        } else {
            // remove the animal from the array
            animals = animals.filter(
                animal => animal.id !== Number(id)
            )
        }
        res.send(animals)
    } catch (error) {
        console.log(error)
    }
})


// listen on port 8080  
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})