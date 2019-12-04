const listaNomi = document.getElementById("listaNomi")
const nomeEstratto = document.getElementById("nomeEstratto")
const addNomeButton = document.getElementById("addNomeButton")
const fieldTextNome = document.getElementById("fieldTextNome")
const estraiButton = document.getElementById("estraiButton")

let people = []

const addToList = persona => {
  const li = document.createElement("li")
  li.innerHTML = persona
  listaNomi.appendChild(li)
}

const addNome = () => {
  const nomeInput = fieldTextNome.value
  console.log(nomeInput)
  //console.log(nomeInput.lenght)

  if (nomeInput == "") {
    // lenght == 0 non andava bene diobello
    fieldTextNome.placeholder = "Boh, scialla"
    return
  }
  if (!people.includes(nomeInput)) {
    people.push(nomeInput)
    console.log(people)
  }
  if (people.length > 0) {
    listaNomi.innerHTML = ""
    people.forEach(persona => addToList(persona))
  }
}

const estrai = () => {
  if (people.length % 2 != 0) {
    alert("Oh gnari, qua si deve essere in numeor pari!")
    return
  }
  let indice1 = Math.floor(Math.random() * people.length)
  let personaAlpha = people[indice1]
  people.splice(indice1, 1) // cancello la persona estratta
  let indice2 = Math.floor(Math.random() * people.length)
  let personaBeta = people[indice2]
  people.splice(indice2, 1)

  console.log("estratto1: " + personaAlpha)
  console.log("estratto2: " + personaBeta)

  if (people.length > 0) {
    listaNomi.innerHTML = ""
    people.forEach(persona => addToList(persona))
  }

  if (people.length == 0) {
    listaNomi.innerHTML = ""
  }

  //console.log("estratti: " + estratto1 + " " + estratto2)
  if (personaAlpha != undefined && personaBeta != undefined) {
    nomeEstratto.innerHTML =
      "Porca figa, tocca a " +
      personaBeta +
      " fare un regalo a " +
      personaAlpha +
      "!"
  } else {
    listaNomi.innerHTML = ""
  }
}

addNomeButton.onclick = addNome
fieldTextNome.onchange = addNome
estraiButton.onclick = estrai
