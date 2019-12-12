const card = document.getElementById("card")

sayACompliment = async () => {
  console.log("ti dico un complimento")
  const compliment_obj = await fetch("https://complimentr.com/api").then(r =>
    r.json()
  )
  // fetcho un complimento

  let message = compliment_obj.compliment
}

card.onclick = sayACompliment
