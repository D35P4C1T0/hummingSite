const listaAttivi = document.getElementById("listaAttivi")
const listaPassivi = document.getElementById("listaPassivi")
const nomeEstratto = document.getElementById("nomeEstratto")
const addNomeButton = document.getElementById("addNomeButton")
const fieldTextNome = document.getElementById("fieldTextNome")
const estraiButton = document.getElementById("estraiButton")

let personeAttive = []
let personePassive = []

const addToActiveList = persona => {
  const li = document.createElement("li")
  li.innerHTML = persona
  listaAttivi.appendChild(li)
}
const addToPassiveList = persona => {
  const li = document.createElement("li")
  li.innerHTML = persona
  listaPassivi.appendChild(li)
}

const addNome = () => {
  const nomeInput = fieldTextNome.value
  console.log(nomeInput)
  fieldTextNome.value = ""
  //console.log(nomeInput.lenght)

  if (nomeInput == "") {
    // lenght == 0 non andava bene diobello
    fieldTextNome.placeholder = "Boh, scialla"
    return
  }
  if (
    !personeAttive.includes(nomeInput) &&
    !personePassive.includes(nomeInput)
  ) {
    personeAttive.push(nomeInput)
    personePassive.push(nomeInput)
    //console.log(personeAttive)
  }
  if (personeAttive.length > 0 && personePassive.length > 0) {
    listaAttivi.innerHTML = ""
    listaPassivi.innerHTML = ""
    personeAttive.forEach(persona => addToActiveList(persona))
    personePassive.forEach(persona => addToPassiveList(persona))
  }
}

const estrai = () => {
  if (personeAttive.length == 0 || personePassive.length == 0) {
    nomeEstratto.innerHTML = "Buoni Regali!"
    return
  }

  let randomAttivoIndex = Math.floor(Math.random() * personeAttive.length)
  let randomPassivoIndex = Math.floor(Math.random() * personePassive.length)
  let personaAlpha = personeAttive[randomAttivoIndex]
  let personaBeta = personePassive[randomPassivoIndex]
  while (personaAlpha == personaBeta) {
    // per non avere due persone uguali. Se sono già diversi, non entra neanche nel loop
    console.log("caso particolare, riestraggo")
    personaAlpha = personeAttive[randomAttivoIndex]
    personaBeta = personePassive[randomPassivoIndex]
    randomAttivoIndex = Math.floor(Math.random() * personeAttive.length)
    randomPassivoIndex = Math.floor(Math.random() * personePassive.length)
  }

  personeAttive.splice(randomAttivoIndex, 1) // cancello la persona estratta
  personePassive.splice(randomPassivoIndex, 1)

  console.log("estratto1: " + personaAlpha)
  console.log("estratto2: " + personaBeta)

  if (personeAttive.length > 0 && personePassive.length > 0) {
    listaAttivi.innerHTML = ""
    listaPassivi.innerHTML = ""
    personeAttive.forEach(persona => addToActiveList(persona))
    personePassive.forEach(persona => addToPassiveList(persona))
  }

  if (personeAttive.length == 0 && personePassive.length == 0) {
    listaAttivi.innerHTML = ""
    listaPassivi.innerHTML = ""
  }

  //console.log("estratti: " + estratto1 + " " + estratto2)
  if (personaAlpha != undefined && personaBeta != undefined) {
    nomeEstratto.innerHTML =
      "Porca figa, tocca a " +
      personaAlpha +
      " fare un regalo a " +
      personaBeta +
      "!"
  } else {
    listaAttivi.innerHTML = ""
    listaPassivi.innerHTML = ""
  }
}

addNomeButton.onclick = addNome
fieldTextNome.onchange = addNome
estraiButton.onclick = estrai
