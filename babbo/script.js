const listaAttivi = document.getElementById("listaAttivi")
//const listaPassivi = document.getElementById("listaPassivi")
const nomeEstratto = document.getElementById("nomeEstratto")
const addNomeButton = document.getElementById("addNomeButton")
const fieldTextNome = document.getElementById("fieldTextNome")
const estraiButton = document.getElementById("estraiButton")
const whoAmIPicker = document.getElementById("whoAmIPicker")

let personeAttive = []
let personePassive = []

const addToGivenList = (persona, lista) => {
  const li = document.createElement("li")
  li.innerHTML = persona
  lista.appendChild(li)
  // aggiunge già che c'è anche la persona al whoAmIPicker
}

const updateLists = (attive, passive) => {
  // riempie l'html coi nomi attuali
  listaAttivi.innerHTML = ""
  //listaPassivi.innerHTML = ""

  attive.forEach(persona => addToGivenList(persona, listaAttivi))
  //passive.forEach(persona => addToGivenList(persona, listaPassivi))
}

const updateWhoAmI = persona => {
  const option = document.createElement("option")
  option.value = persona
  option.innerHTML = persona
  whoAmIPicker.append(option)
}

const addNome = () => {
  const nomeInput = fieldTextNome.value
  console.log(nomeInput)
  fieldTextNome.value = ""
  //console.log(nomeInput.lenght)
  console.log("la lunghezza del nome pare essere " + nomeInput.length)

  if (nomeInput.length == 0) {
    console.log(
      "nome vuoto o irregolare, il nome in questione era: " +
        "(" +
        nomeInput +
        ")"
    )
    // lenght == 0 non andava bene diobello
    fieldTextNome.placeholder = "Boh, scialla"
    return
  }

  if (
    !personeAttive.includes(nomeInput) &&
    !personePassive.includes(nomeInput)
  ) {
    // non permette di inserire doppioni
    personeAttive.push(nomeInput)
    personePassive.push(nomeInput)
    nomeEstratto.innerHTML = nomeInput + " aggiunto alla lista!"
    updateWhoAmI(nomeInput)
    updateLists(personeAttive, personePassive)
  }
}

const estrai = () => {
  let donatoreSelezionato = whoAmIPicker.value
  let ricevente = pickRandom(donatoreSelezionato)

  //console.log("estratti: " + estratto1 + " " + estratto2)
  if (donatoreSelezionato != undefined && ricevente != undefined) {
    nomeEstratto.innerHTML =
      "Uè, tocca a " +
      donatoreSelezionato +
      " fare un regalo a " +
      ricevente +
      "!"
  }
}

addNomeButton.onclick = addNome
fieldTextNome.onchange = addNome
fieldTextNome.onclick = () => {
  nomeEstratto.innerHTML = ""
}
estraiButton.onclick = estrai

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

function pickRandom(personaDonatore) {
  // todo: ficcarci qui la roba dell'estrazione random, però shuffolando solo il secondo array
  // Il primo array sarà fermo, non verrà modificato se non una volta che la persona estrae il suo ricevente
  // il secondo array verrà shuffolato ad ogni estrazione, ulteriormente se si pesca la stessa persona che sta estraendo.

  if (!personeAttive.includes(personaDonatore)) {
    console.log(
      "vuoi fare estrarre una persona che non è in lista, bro. È " +
        personaDonatore
    )
    if (personaDonatore.length == 0) {
      nomeEstratto.innerHTML =
        "Sei pregato di selezionare una persona valida 🛐"
      return
    }
    nomeEstratto.innerHTML =
      personaDonatore + " sa già a chi fare il regalo! Tocca al prossimo. ☃️"
    return
  }

  // caso particolare
  if (personeAttive.length == 2) {
    let donatoreSelezionato = personeAttive[0]
    let donatoreAlternativo = personeAttive[1]

    if (donatoreSelezionato != personaDonatore) {
      // forzo il donatore alternativo come il restante donatore rimasto
      donatoreSelezionato = personeAttive[1]
      donatoreAlternativo = personeAttive[0]
    }

    let tempPersoneAttive = [...personeAttive]
    let tempPersonePassive = [...personePassive]

    if (tempPersonePassive.includes(donatoreSelezionato)) {
      console.log("donatore selezionato si rispecchia nei passivi")
      // quando l'estratto si ritrova nei passivi
      tempPersonePassive.splice(
        tempPersonePassive.indexOf(donatoreSelezionato),
        1
      )
      personeAttive.splice(personeAttive.indexOf(donatoreSelezionato), 1) // cancello il donatore che ha trovato il suo ricevente
      personePassive.splice(personePassive.indexOf(tempPersonePassive[0]), 1) // cancello il ricevente a cui è stato affidato un donatore
      console.log("in teoria dovrebbe uscire " + tempPersonePassive[0])

      return tempPersonePassive[0] // cancello l'altro match

      // ti prego non toccare, è sketcy, lo so, ma sembra funzionare. Se sai come farmi sentire stupido
      // realizzando un algoritmo migliore, ti supplico di farlo.
    }

    if (tempPersonePassive.includes(donatoreAlternativo)) {
      console.log("donatore alternativo si rispecchia nei passivi") // ritorno quello alternativo
      // quando l'estratto non si ritrova nei passivi ma l'altro attivo sì
      personeAttive.splice(personeAttive.indexOf(donatoreSelezionato), 1) // cancello il donatore che ha trovato il suo ricevente
      personePassive.splice(personePassive.indexOf(donatoreAlternativo), 1) // cancello il ricevente a cui è stato affidato un donatore
      console.log(
        "in teoria dovrebbe uscire " +
          tempPersonePassive[tempPersonePassive.indexOf(donatoreAlternativo)]
      )
      return tempPersonePassive[tempPersonePassive.indexOf(donatoreAlternativo)]
      // return tempPersonePassive[0] // cancello l'altro match

      // ti prego non toccare, è sketcy, lo so, ma sembra funzionare. Se sai come farmi sentire stupido
      // realizzando un algoritmo migliore, ti supplico di farlo.
    }

    // let alpha_match = a_alpha == p_alpha ? true : false // 4 -> 3
    // let beta_match = a_alpha == p_beta ? true : false // 4 -> 5
    // let gamma_match = a_beta == p_alpha ? true : false // 5 -> 3
    // let delta_match = a_beta == p_beta ? true : false // 5 -> 5
    // not my proudest code
    // spesso capitava "A,B" attive e "C,B" passive. Ora impedisco che A si prenda C e B rimanga con B.
  }

  if (personePassive.length == 1 && personeAttive.length == 1) {
    if (personeAttive[0] == personePassive[0]) {
      // puta meirda, menata bro, abort abort
      return
    }
  }

  let personaEstratta = personaDonatore // lo faccio solo per entrare poi nel while
  while (personaEstratta == personaDonatore) {
    // per non avere due persone uguali.
    console.log("Mo sto estraendo")
    let estrattoIndex = Math.floor(Math.random() * personePassive.length)
    personaEstratta = personePassive[estrattoIndex]
    shuffleArray(personePassive)
    // shuffle che non si sa mai, potrebbe impiegare un casino con liste di persone da 1000 o più persone, don't quote me on that
  }

  // si prosegue solo se il donatore ha trovato un match. Le condizioni prima del while servono a non cadere in un loop infinito dove si riestrae a go-go

  console.log("Donatore: " + personaDonatore)
  console.log("Estratta: " + personaEstratta)
  // da fare quando estre e non si sono problemi
  personeAttive.splice(personeAttive.indexOf(personaDonatore), 1) // cancello il donatore che ha trovato il suo ricevente

  // da fare quando estrae ed è non ci sono problemi
  personePassive.splice(personePassive.indexOf(personaEstratta), 1) // cancello il ricevente a cui è stato affidato un donatore

  return personaEstratta
}
