const bestemmiaButton = document.querySelector("#bestemmia");

const fetchBestemmia = () => {
  let APIurl = "http://bestemmie.org/api/random";
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  };

  fetch(APIurl)
    .then(data => data.json())
    .then(res => {
      console.log(res.bestemmia);
      let msg = new SpeechSynthesisUtterance();
      msg.text = res.bestemmia;
      window.speechSynthesis.speak(msg);
    });
}

bestemmiaButton.onclick = fetchBestemmia;