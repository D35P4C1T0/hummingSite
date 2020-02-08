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

*/

let porcoporcoPeople = [
  "Chiara",
  "Lorenzo",
  " Claudio",
  "Cora",
  "Abe",
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
]

let peopleSelection = document.getElementById("people") //select da riempire con le option
let result = document.getElementById("risultato") //select da riempire con le option
let sendButton = document.getElementById("sendButton") //select da riempire con le option

let nope = "🙅🏻‍♂️"
let yah = "🙋🏻‍♂️"

let dweetName = "PorcoPorcoBooking"

const startOmegalul = () => {
  loadJSON(function(response) {
    // Parse JSON string into object
    sampleJson = JSON.parse(response)
    //console.log(lastFetch)
    //lastFetch = actual_JSON

    init(sampleJson)
    getDweet()
  })
}

const init = sampleJson => {
  dweetio.dweet_for(dweetName, JSON.stringify(sampleJson), function(
    err,
    dweet
  ) {
    console.log(dweet.thing) // "my-thing"
    console.log(dweet.content) // The content of the dweet
    console.log(dweet.created) // The create date of the dweet
  })
}

const getDweet = () => {
  dweetio.get_latest_dweet_for(dweetName, function(err, dweet) {
    var dweet = dweet[0] // Dweet is always an array of 1
    console.log(dweet.thing) // The generated name
    console.log(dweet.content) // The content of the dweet
    console.log(dweet.created) // The create date of the dweet

    let fullContent = ""
    Object.values(dweet.content).forEach(letter => {
      fullContent += letter // rimetto apposto il dweet che separa ogni lettera
    })

    console.log("full contet: " + fullContent)
    let actual_JSON = JSON.parse(fullContent) // main json
    console.log(actual_JSON)
  })
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

sendButton.onclick = startOmegalul
