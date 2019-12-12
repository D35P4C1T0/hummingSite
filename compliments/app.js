$(document).ready(function() {
  var isReading = false

  $("#compliment").click(function() {
    const compliment = tellACompliment()
  })

  function StartCallback() {
    isReading = true
  }

  function EndCallback() {
    isReading = false
  }
})

const tellACompliment = async () => {
  const data = await (await fetch("https://complimentr.com/api")).json()
  //console.log(data.compliment)
  //console.log("diocane, il contenuto è: " + json.compliment)
  // fetcho un complimento
  //console.log(compliment_obj.compliment)
  //return compliment_obj.compliment
  responsiveVoice.speak(data.compliment, "Italian Female")
}
