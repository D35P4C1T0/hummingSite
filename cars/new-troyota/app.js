//  _____                _
//  /__   \___         __| | ___
//    / /\/ _ \ _____ / _` |/ _ \
//   / / | (_) |_____| (_| | (_) |
//   \/   \___/       \__,_|\___/

/*

- riempire il select coi nomi della gente
- controllare i posti liberi dal json
- dire se la prenotazione è avvenuta o meno 
- bottone reset che solo io posso attivare (tipo cosa a due fattori)

Piattaforma usata: JSONBin.io

*/

let peopleSelection = document.getElementById('people') //select da riempire con le option
let result = document.getElementById('risultato') //select da riempire con le option
let sendButton = document.getElementById('sendButton') //select da riempire con le option
let resetButton = document.getElementById('secretResetButton') //select da riempire con le option
let latestButton = document.getElementById('latestButton') //select da riempire con le option
let hiddenTextField = document.getElementById('hiddenTextField') //select da riempire con le option
let displayList = document.getElementById('listaPrenotazioni') //select da riempire con le option
let spinner = document.getElementById('spinner') //select da riempire con le option

let porcoporcoPeople = [
  'Chiara',
  'Lorenzo',
  'Claudio',
  'Coradi',
  'Abeni',
  'Alessia',
  'Martina',
  'Cami',
  'Nina',
  'Silvia',
  'Bianca',
  'Marta',
  'Mery',
  'Consiglio',
  'Elisa'
].sort()

// JSONBIN shit
let binID = '5e4a67849c65d21641ad4334'

let ApiKey = '$2b$10$5jJarHXmpjAHaQmODzpqgO1UnzNfsXrMGA8ZupcfZY1QP.TQHc8xS'

let nope = '🙅🏻‍♂️'
let yah = '🙋🏻‍♂️'
var postiMassimi = 4

porcoporcoPeople.forEach(nome => {
  let nameEntry = document.createElement('option')
  nameEntry.innerHTML = nome
  nameEntry.value = nome
  peopleSelection.appendChild(nameEntry)
})

let newData = JSON.parse(
  '{"troyota:": {"posto1": "Alvaro","posto2": "Giovanni","posto3": "","posto4": ""}}'
)

// fetchLatest(binID)
sendJSON(newData, binID)
//fetchLatest(binID)

const init = () => {
  let selezione = peopleSelection.value
  if (selezione === '') {
    result.innerHTML = "Pls, scegli il tuo nome dall'elenco"
    return
  }
}

function fetchLatest(binID) {
  let req = new XMLHttpRequest()

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      //console.log(req.responseText)
      console.log(JSON.parse(req.response))
    }
  }

  req.open('GET', 'https://api.jsonbin.io/b/' + binID + '/latest', true)
  req.send()
}

function resetToFirstVersion(binID) {
  let req = new XMLHttpRequest()

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      //console.log(req.responseText)
      //sendJSON(req.response)
    }
  }

  req.open('GET', 'https://api.jsonbin.io/b/' + binID, true)
  req.send()
}

function sendJSON(data, binID) {
  let req = new XMLHttpRequest()

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      //console.log(req.responseText)
      console.log(req.response)
    }
  }

  req.open('PUT', 'https://api.jsonbin.io/b/' + binID, true)
  req.setRequestHeader('Content-type', 'application/json')
  req.send(JSON.stringify(data))
}

const autenticateMe = () => {
  // manculetHash = 746614219
  // manculetHash deriva da "manculetvecio", la passphrase
  hiddenTextField.style = 'visibility: visible'
  hiddenTextField.value = ''
  let passphrase = ''
  hiddenTextField.onchange = () => {
    passphrase = hiddenTextField.value
    let manculetHash = stringToHash(passphrase)
    let secondaChiave = stringToHash('colCaspita')
    //console.log(manculetHash ^ secondaChiave)

    let cryptoResult = 904009744
    // cryptoresult = manculetHash ^ secondaChiave
    // manculetHash = cryptoResult ^ secondaChiave
    // secondaChivae = cryptoResult ^ manculetHash

    if ((manculetHash ^ secondaChiave) === 904009744) {
      console.log('okkaido')
      let defaultJson = JSON.parse(
        '{"troyota:": {"posto1": "","posto2": "","posto3": "","posto4": ""}}'
      )

      console.log(defaultJson)

      sendJSON(defaultJson, binID)
      alert('reset avvenuto')
    } else {
      hiddenTextField.style = 'visibility: hidden'
      return
    }
  }
}

function stringToHash(string) {
  var hash = 0
  if (string.length == 0) return hash
  for (i = 0; i < string.length; i++) {
    char = string.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash
}

resetButton.onclick = autenticateMe
