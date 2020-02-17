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

Piattaforma usata per storare il json: JSONBin.io

*/

let peopleSelection = document.getElementById("people") //select da riempire con le option
let result = document.getElementById("risultato") //select da riempire con le option
let sendButton = document.getElementById("sendButton") //select da riempire con le option
let resetButton = document.getElementById("secretResetButton") //select da riempire con le option
let latestButton = document.getElementById("latestButton") //select da riempire con le option
let hiddenTextField = document.getElementById("hiddenTextField") //select da riempire con le option
let displayList = document.getElementById("listaPrenotazioni") //select da riempire con le option
let spinner = document.getElementById("spinner") //select da riempire con le option

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

// JSONBIN shit
let binID = "5e4a67849c65d21641ad4334"
let ApiKey = "$2b$10$5jJarHXmpjAHaQmODzpqgO1UnzNfsXrMGA8ZupcfZY1QP.TQHc8xS"

let nope = "🙅🏻‍♂️"
let yah = "🙋🏻‍♂️"
var postiMassimi = 4

porcoporcoPeople.forEach(nome => {
  let nameEntry = document.createElement("option")
  nameEntry.innerHTML = nome
  nameEntry.value = nome
  peopleSelection.appendChild(nameEntry)
})

let newData = JSON.parse(
  '{"troyota:": {"posto1": "","posto2": "","posto3": "","posto4": ""}}'
)

// fetchLatest(binID)
// sendJSON(newData, binID)

function selectionGrabber() {
  let selezione = peopleSelection.value
  if (selezione === "") {
    result.innerHTML = "Pls, scegli il tuo nome dall'elenco"
    return
  }
  return selezione
}

function fetchLatest(binID) {
  let req = new XMLHttpRequest()

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      //console.log(req.responseText)
      console.log(JSON.parse(req.response))

      var actual_JSON = JSON.parse(req.response) // new
      let personePrenotate = []
      let postiObject = Object.values(actual_JSON)[0]
      console.log(postiObject)

      Object.values(postiObject).forEach(seat => {
        if (seat != "") {
          personePrenotate.push(seat)
        }
      })

      if (personePrenotate.length > 0) {
        displayList.innerHTML = ""
        personePrenotate.forEach(persona => {
          let entry = document.createElement("li")
          entry.innerHTML = persona
          displayList.appendChild(entry)
        })
      } else {
        result.innerHTML = "Tutti i posti disponibili!"
      }
    }
  }

  req.open("GET", "https://api.jsonbin.io/b/" + binID + "/latest", true)
  req.send()
}

function resetToFirstVersion(binID) {
  let req = new XMLHttpRequest()

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      //console.log(req.responseText)
      //console.log(JSON.parse(req.response))
      console.log(JSON.parse(req.response))
      sendJSON(JSON.parse(req.response), binID)
    }
  }

  req.open("GET", "https://api.jsonbin.io/b/" + binID, true)
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

  req.open("PUT", "https://api.jsonbin.io/b/" + binID, true)
  req.setRequestHeader("Content-type", "application/json")
  req.send(JSON.stringify(data))
}

const autenticateMe = () => {
  hiddenTextField.style = "visibility: visible"
  hiddenTextField.value = ""
  let passphrase = ""
  hiddenTextField.onchange = () => {
    passphrase = hiddenTextField.value
    let sha256Passphrase = sha256(passphrase)
    let sha256SecondaChiave = sha256("colCaspita")

    // sha colCaspita = 785a5c4e9cce6f551e433a73716e6121f7dbc4174b39e735a7b36aa18c83a0b9
    // sha della password = 556fee96e8c53efd8407022c3028d77c3125c4c11ccdd59e6177c1c20b334f89

    // tanto anche se vedi l'hash non puoi farci nulla, non credo tu riesca a fare il reverse
    // engineering e trovare la password :D In tal caso contattami se riesci :D

    let cryptoresult = XOR_hex(sha256Passphrase, sha256SecondaChiave)

    // XOR cheatsheet:
    // manculetHash = cryptoResult ^ secondaChiave
    // secondaChivae = cryptoResult ^ manculetHash

    // Quello nell'if è lo XOR bitwise dei caratteri dei due hash e convertito
    // in hex, solo perchè mi annoiavo a fare un sistema troppo semplice.
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

    if (
      cryptoresult ===
      "2d35b2d8740b51a89a44385f4146b65dc6fe00d657f432abc6c4ab6387b0ef30"
    ) {
      console.log("okkaido")
      resetToFirstVersion(binID)
      alert("reset avvenuto")
    } else {
      hiddenTextField.style = "visibility: hidden"
      return
    }
  }
}

function addPrenotazione(nomeDaInserire, binID) {
  spinner.className = "loader"
  let req = new XMLHttpRequest()

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      //console.log(req.responseText)
      console.log(JSON.parse(req.response))

      var actual_JSON = JSON.parse(req.response) // new

      let personePrenotate = []

      let postiObject = Object.values(actual_JSON)[0]
      console.log(postiObject)

      Object.values(postiObject).forEach(seat => {
        if (seat != "") {
          personePrenotate.push(seat)
        }
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
        returnMessage += "Prenotazione avvenuta " + yah
      }

      console.log("Pre: " + personePrenotate.length)
      console.log("Pre: " + personePrenotate)

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

      sendJSON(toBeSent, binID)

      spinner.className = "loaderDisabled"
    }
  }
  req.open("GET", "https://api.jsonbin.io/b/" + binID + "/latest", true)
  req.send()
}

function XOR_hex(a, b) {
  var res = "",
    i = a.length,
    j = b.length
  while (i-- > 0 && j-- > 0)
    res =
      (parseInt(a.charAt(i), 16) ^ parseInt(b.charAt(j), 16)).toString(16) + res
  return res
}

function sha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount))
  }

  var mathPow = Math.pow
  var maxWord = mathPow(2, 32)
  var lengthProperty = "length"
  var i, j // Used as a counter across the whole file
  var result = ""

  var words = []
  var asciiBitLength = ascii[lengthProperty] * 8

  //* caching results is optional - remove/add slash from front of this line to toggle
  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
  // (we actually calculate the first 64, but extra values are just ignored)
  var hash = (sha256.h = sha256.h || [])
  // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
  var k = (sha256.k = sha256.k || [])
  var primeCounter = k[lengthProperty]
  /*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

  var isComposite = {}
  for (var candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0
    }
  }

  ascii += "\x80" // Append Ƈ' bit (plus zero padding)
  while ((ascii[lengthProperty] % 64) - 56) ascii += "\x00" // More zero padding
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i)
    if (j >> 8) return // ASCII check: only accept characters in range 0-255
    words[i >> 2] |= j << (((3 - i) % 4) * 8)
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0
  words[words[lengthProperty]] = asciiBitLength

  // process each chunk
  for (j = 0; j < words[lengthProperty]; ) {
    var w = words.slice(j, (j += 16)) // The message is expanded into 64 words as part of the iteration
    var oldHash = hash
    // This is now the undefinedworking hash", often labelled as variables a...g
    // (we have to truncate as well, otherwise extra entries at the end accumulate
    hash = hash.slice(0, 8)

    for (i = 0; i < 64; i++) {
      var i2 = i + j
      // Expand the message into 64 words
      // Used below if
      var w15 = w[i - 15],
        w2 = w[i - 2]

      // Iterate
      var a = hash[0],
        e = hash[4]
      var temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + // S1
        ((e & hash[5]) ^ (~e & hash[6])) + // ch
        k[i] +
        // Expand the message schedule if needed
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
              (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) + // s0
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | // s1
              0)
      // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
      var temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + // S0
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])) // maj

      hash = [(temp1 + temp2) | 0].concat(hash) // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
      hash[4] = (hash[4] + temp1) | 0
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      var b = (hash[i] >> (j * 8)) & 255
      result += (b < 16 ? 0 : "") + b.toString(16)
    }
  }
  return result
}

resetButton.onclick = autenticateMe
latestButton.onclick = () => {
  fetchLatest(binID)
}

sendButton.onclick = () => {
  if (selectionGrabber() != undefined) {
    addPrenotazione(selectionGrabber(), binID)
  }
}
