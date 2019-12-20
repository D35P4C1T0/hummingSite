const form = document.querySelector("#task-form")

// Aggiungi
form.addEventListener("submit", function(e) {
  const taskInput = document.querySelector("#task")
  if (taskInput.value === "") {
    alert("Compila il contenuto dell'attività")
  } else {
    const li = document.createElement("li")
    li.className = "collection-item greyyyy"
    li.setAttribute("id", "notaSingola")
    li.appendChild(document.createTextNode(taskInput.value))

    var currentdate = new Date()
    var datetime =
      " | Data: " +
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

    const date = document.createElement("p")
    date.className = "collection-item greyyyy date"
    li.appendChild(document.createTextNode(datetime))

    const notaRimuovi = document.createElement("a")
    notaRimuovi.className = "delete-item secondary-content"
    notaRimuovi.innerHTML = '<i class="fas fa-trash"></i>'
    li.appendChild(notaRimuovi)

    const notaNonsvolta = document.createElement("a")
    notaNonsvolta.className = "trash-item secondary-content"
    notaNonsvolta.innerHTML = '<i class="fas fa-remove"> </i>'
    li.appendChild(notaNonsvolta)

    const notaSvolta = document.createElement("a")
    notaSvolta.className = "done-item secondary-content"
    notaSvolta.innerHTML = '<i class="fas fa-check"> </i>'
    li.appendChild(notaSvolta)

    const taskList = document.querySelector(".collection")
    taskList.appendChild(li)
    taskList.className = "collection greyyyy"
    // pulizia input
    taskInput.value = ""
  }
  e.preventDefault()
  setFocus()
})

// rimuovi
const deleteNote = document.querySelector(".collection")
deleteNote.addEventListener("click", removeTask)
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Sicuro di voler rimuovere la nota?")) {
      e.target.parentElement.parentElement.remove()
      setFocus()
    }
  }
}

// filtra
const filter = document.querySelector("#filter")
filter.addEventListener("keyup", filterTasks)
function filterTasks(e) {
  const text = e.target.value.toLowerCase()
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block"
    } else {
      task.style.display = "none"
    }
  })
}

// pulisci tutto
const clearBtn = document.querySelector(".clear-tasks")
clearBtn.addEventListener("click", clearTasks)
function clearTasks() {
  if (
    confirm(
      "Confermi di voler rimuovere tutte le tue note in maniera definitiva?"
    )
  ) {
    const taskList = document.querySelector(".collection")
    taskList.innerHTML = ""
    setFocus()
  }
}

// fatto
const doneButton = document.querySelector(".collection")
doneButton.addEventListener("click", doneTask)
function doneTask(e) {
  if (e.target.parentElement.classList.contains("done-item")) {
    if (
      e.target.parentElement.parentElement.className !=
      "done collection-item fatto"
    ) {
      e.target.parentElement.parentElement.className =
        "done collection-item fatto"
    } else {
      e.target.parentElement.parentElement.className = "done collection-item"
    }
  }
}

// non fatto
const trash = document.querySelector(".collection")
trash.addEventListener("click", trashFunzione)
function trashFunzione(e) {
  if (e.target.parentElement.classList.contains("trash-item")) {
    if (
      e.target.parentElement.parentElement.className !=
      "done collection-item nonfatto"
    ) {
      e.target.parentElement.parentElement.className =
        "done collection-item nonfatto"
    } else {
      e.target.parentElement.parentElement.className = "done collection-item"
    }
  }
}

const prova = document.querySelector(".collection")
prova.addEventListener("click", provaf)

$(window).scroll(function() {
  if ($(window).scrollTop() >= 300) {
    $("nav").addClass("fixed-header")
    $("nav div").addClass("visible-title")
  } else {
    $("nav").removeClass("fixed-header")
    $("nav div").removeClass("visible-title")
  }
})

function setFocus(e) {
  $("#task").focus()
}
