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
let latestButton = document.getElementById("latestButton") //select da riempire con le option
let hiddenTextField = document.getElementById("hiddenTextField") //select da riempire con le option
let displayList = document.getElementById("listaPrenotazioni") //select da riempire con le option

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
var postiMassimi = 4

porcoporcoPeople.forEach(nome => {
  let nameEntry = document.createElement("option")
  nameEntry.innerHTML = nome
  nameEntry.value = nome
  peopleSelection.appendChild(nameEntry)
})

const init = () => {
  let selezione = peopleSelection.value
  if (selezione === "") {
    result.innerHTML = "Pls, scegli il tuo nome dall'elenco"
    return
  }
  addPrenotazione(selezione, dweetName)
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
    // console.log(dweet.thing) // The generated name
    // console.log(dweet.content) // The content of the dweet
    // console.log(dweet.created) // The create date of the dweet

    let fullContent = ""
    Object.values(dweet.content).forEach(letter => {
      fullContent += letter // rimetto apposto il dweet che separa ogni lettera
    })

    //console.log("full contet: " + fullContent)
    // var actual_JSON = JSON.parse(JSON.parse(fullContent)) // old
    var actual_JSON = JSON.parse(JSON.parse(fullContent)) // new

    let personePrenotate = []
    //Object.seal(personePrenotate) // fissa la dimensione
    //console.log(personePrenotate)

    let postiObject = Object.values(actual_JSON)[0]
    console.log(postiObject)
  })
}

function addPrenotazione(nomeDaInserire, dweetName) {
  dweetio.get_latest_dweet_for(dweetName, function(err, dweet) {
    var dweet = dweet[0] // Dweet is always an array of 1
    // console.log(dweet.thing) // The generated name
    // console.log(dweet.content) // The content of the dweet
    // console.log(dweet.created) // The create date of the dweet

    let fullContent = ""
    Object.values(dweet.content).forEach(letter => {
      fullContent += letter // rimetto apposto il dweet che separa ogni lettera
    })

    //console.log("full contet: " + fullContent)
    // var actual_JSON = JSON.parse(JSON.parse(fullContent)) // old
    var actual_JSON = JSON.parse(fullContent) // new

    let personePrenotate = []

    let postiObject = Object.values(actual_JSON)[0]

    Object.values(postiObject).forEach(seat => {
      if (seat != "") {
        personePrenotate.push(seat)
      }
      // prende le persone già a bordo dall'ultimo dweet
    })

    let returnMessage = "Stato richiesta: "
    if (!personePrenotate.includes(nomeDaInserire)) {
      if (personePrenotate.length < postiMassimi) {
        personePrenotate.push(nomeDaInserire)
      } else {
        returnMessage += "Attualmente siamo al completo. "
      }
    } else {
      returnMessage += "Pare che tu abbia già un posto in macchina. "
    }
    if (returnMessage === "Stato richiesta: ") {
      returnMessage += "Prenotazione avvenuta :D " + yah
    }

    console.log("Pre: " + personePrenotate.length)
    console.log("Pre: " + personePrenotate)

    // for (
    //   let index = 0;
    //   index < postiMassimi - personePrenotate.length;
    //   index++
    // ) {
    //   personePrenotate.push("")
    // }

    result.innerHTML = returnMessage

    while (personePrenotate.length < 4) {
      personePrenotate.push("")
    }

    console.log("Post: " + personePrenotate.length)
    console.log("Post: " + personePrenotate)

    let toBeSent = {
      "troyota:": {
        posto1: personePrenotate[0] + "",
        posto2: personePrenotate[1] + "",
        posto3: personePrenotate[2] + "",
        posto4: personePrenotate[3] + ""
      }
    }

    // ^^^^^ esce undefined

    //toBeSent = JSON.parse(toBeSent)
    sendDweet(toBeSent)

    //console.log(toBeSent["troyota:"])
  })
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
latestButton.onclick = () => {
  getDweet(dweetName)
}
resetButton.onclick = autenticateMe
