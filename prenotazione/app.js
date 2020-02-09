//  _____                _
//  /__   \___         __| | ___
//    / /\/ _ \ _____ / _` |/ _ \
//   / / | (_) |_____| (_| | (_) |
//   \/   \___/       \__,_|\___/

/*

- riempire il select coi nomi della gente - FATTO
- controllare i posti liberi dal json - mannaggia alle callback
- dire se la prenotazione è avvenuta o meno 
- bottone reset che solo io posso attivare (tipo cosa a due fattori) - Fatto

*/

let peopleSelection = document.getElementById("people") //select da riempire con le option
let result = document.getElementById("risultato") //select da riempire con le option
let sendButton = document.getElementById("sendButton") //select da riempire con le option
let resetButton = document.getElementById("secretResetButton") //select da riempire con le option
let hiddenTextField = document.getElementById("hiddenTextField") //select da riempire con le option

let porcoporcoPeople = [
  "Chiara",
  "Lorenzo",
  "Claudio",
  "Coradi",
  "Abeni",
  "Alessia",
  "Martina",
  "Cami",
  "Nina",
  "Silvia",
  "Bianca",
  "Marta",
  "Mery",
  "Consiglio",
  "Elisa"
].sort()

var dweetName = "PorcoPorcoBooking"
let nope = "🙅🏻‍♂️"
let yah = "🙋🏻‍♂️"

let pollo = "stadiobase"
var lastSavedJson

porcoporcoPeople.forEach(nome => {
  let nameEntry = document.createElement("option")
  nameEntry.innerHTML = nome
  nameEntry.value = nome
  peopleSelection.appendChild(nameEntry)
})

const init = () => {
  //////////////////////////////////
  let selezione = peopleSelection.value
  if (selezione === "") {
    result.innerHTML = "Pls, scegli il tuo nome dall'elenco"
    return
  }
  //////////////////////////////////
  let postiOccupati = []

  getDweet(dweetName)
  // postiSalvati = Object.values(lastSavedJson)[0]
  // Object.values(postiSalvati).forEach(element => {
  //   postiOccupati.push(element)
  // })

  //sendDweet(lastSavedJson)

  // console.log("candio " + JSON.stringify(sampleJson))
}

function sendDweet(jsonObject) {
  dweetio.dweet_for(dweetName, JSON.stringify(jsonObject), function(
    err,
    dweet
  ) {
    console.log(dweet.thing) // "my-thing"
    console.log(dweet.content) // The content of the dweet
    console.log(dweet.created) // The create date of the dweet
  })
}

function getDweet(dweetName) {
  dweetio.get_latest_dweet_for(dweetName, function(err, dweet) {
    var dweet = dweet[0] // Dweet is always an array of 1
    console.log(dweet.thing) // The generated name
    console.log(dweet.content) // The content of the dweet
    console.log(dweet.created) // The create date of the dweet

    let fullContent = ""
    Object.values(dweet.content).forEach(letter => {
      fullContent += letter // rimetto apposto il dweet che separa ogni lettera
    })

    //console.log("full contet: " + fullContent)
    let actual_JSON = JSON.parse(fullContent) // main json
    //console.log(actual_JSON)
    //lastSavedJson = actual_JSON
    setLastJson(actual_JSON)
    //console.log(lastSavedJson)
  })
}
function setLastJson(newestJson) {
  lastSavedJson = newestJson
  console.log("Ultimo json da dweet preso e aggiornato")
}
const autenticateMe = () => {
  // manculetHash = 746614219
  // manculetHash deriva da "manculetvecio", la passphrase
  hiddenTextField.style = "visibility: visible"
  let passphrase = ""
  hiddenTextField.onchange = () => {
    passphrase = hiddenTextField.value
    //console.log("pollo")
    let manculetHash = stringToHash(passphrase)
    let secondaChiave = stringToHash("colCaspita")
    //console.log(manculetHash ^ secondaChiave)

    let cryptoResult = 904009744
    // cryptoresult = manculetHash ^ secondaChiave
    // manculetHash = cryptoResult ^ secondaChiave
    // secondaChivae = cryptoResult ^ manculetHash

    if ((manculetHash ^ secondaChiave) === 904009744) {
      console.log("okkaido")
      let defaultJson = {
        "troyota:": { posto1: "", posto2: "", posto3: "", posto4: "" }
      }
      hiddenTextField.value = "Reset avvenuto"
      sendDweet(JSON.stringify(defaultJson))
      // loggato
    } else {
      hiddenTextField.style = "visibility: hidden"
      return
    }
  }

  //console.log("passphrase= " + passphrase)
}

function loadJSON(callback) {
  var xobj = new XMLHttpRequest()
  xobj.overrideMimeType("application/json")
  xobj.open("GET", "./car.json", true) // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText)
    }
  }
  xobj.send(null)
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

sendButton.onclick = init
resetButton.onclick = autenticateMe
