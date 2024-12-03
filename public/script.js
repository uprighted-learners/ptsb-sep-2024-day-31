const API = "http://localhost:8080/api/animals"

// fetch all animals and display them
document.getElementById("fetchAnimals").addEventListener("click", async () => {
    try {
        const response = await fetch(API)
        const animal = await response.json()


        const animalList = document.getElementById("animalsList")
        animalList.innerHTML = ""

        animal.forEach(animal => {
            const li = document.createElement("li")
            li.innerHTML = animal.name
            animalList.appendChild(li)
        })
    } catch (error) {
        console.log(error)
    }
})

// search animals by name
document.getElementById("searchButton").addEventListener("click", async () => {
    try {
        const searchInput = document.getElementById("searchInput").value
        if (!searchInput) {
            alert("Please enter a name")
            return
        }

        const response = await fetch(`http://localhost:8080/api/search?name=${searchInput}`)
        const animal = await response.json()
        const animalList = document.getElementById("animalsList")
        animalList.innerHTML = ""
        animal.forEach(animal => {
            const li = document.createElement("li")
            li.innerHTML = animal.name
            animalList.appendChild(li)
        })
    } catch (error) {
        console.log(error)
    }
})

// add a new animal
document.getElementById("addAnimalForm").addEventListener("submit", async (event) => {
    event.preventDefault()
    try {
        // capture the values from the form
        const name = document.getElementById("animalName").value
        const type = document.getElementById("animalType").value
        const age = document.getElementById("animalAge").value

        // create a new animal object
        const animal = {
            name: name,
            type: type,
            age: age
        }

        // send the animal to the server
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animal)
        })

        const newAnimal = await response.json()
        console.log(newAnimal)

        document.getElementById("animalName").value = ""
        document.getElementById("animalType").value = ""
        document.getElementById("animalAge").value = ""
    }
    catch (error) {
        console.log(error)
    }
})