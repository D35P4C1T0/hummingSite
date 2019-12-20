const taskName = document.getElementById("taskName")
const addTaskButton = document.getElementById("addTaskButton") //add button
const empyListButton = document.getElementById("empyListButton") //empty button
const filterSearchBar = document.getElementById("filterSearchBar")
const listaAttività = document.getElementById("listaAttività")

let tasks = []

// (unironically) todo: [ ] filter search;
//                      [ ] make tick/cross/bin toggles do stuff;

const addTask = () => {
  if (taskName.value == "") {
    console.log("testo vuotooo")
    return
  }

  //const descrizioneAttività = taskName.value
  const boxAttività = document.createElement("tr")
  boxAttività.id = "horizontal-list"

  const descrizioneAttività = document.createElement("td")
  descrizioneAttività.innerHTML = taskName.value
  boxAttività.appendChild(descrizioneAttività)

  const togglesList = document.createElement("tr")
  togglesList.id = "horizontal-list"

  var currentdate = new Date()
  var datetime =
    " Data: " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " - " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds()

  const date = document.createElement("td")
  date.innerHTML = datetime
  togglesList.appendChild(date)

  const tickToggle = document.createElement("td")
  tickToggle.innerHTML = '<a id="toggle"><i class="fas fa-check"></i></a>'
  togglesList.appendChild(tickToggle)

  const notDoneToggle = document.createElement("td")
  notDoneToggle.innerHTML = '<a id="toggle"><i class="fas fa-times"></i></a>'
  togglesList.appendChild(notDoneToggle)

  const removeNoteToggle = document.createElement("td")
  removeNoteToggle.innerHTML = '<a id="toggle"><i class="fas fa-trash"></i></a>'
  togglesList.appendChild(removeNoteToggle)

  const togglesListElement = document.createElement("td")
  togglesListElement.appendChild(togglesList)
  boxAttività.appendChild(togglesListElement)
  listaAttività.appendChild(boxAttività)

  let attività = new Map()
  attività.set("info", descrizioneAttività.innerHTML)
  attività.set("extra", togglesList)

  tasks.push(attività)
  console.log(tasks)
}

addTaskButton.onclick = addTask
empyListButton.onclick = () => {
  listaAttività.innerHTML = ""
}

filterSearchBar.oninput = e => {
  const toMatch = e.target.value
  //console.log("change " + toMatch)
  //UpdateList(toMatch)
}
