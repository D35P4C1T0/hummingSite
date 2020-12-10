const bestemmiaButton = document.getElementById("bestemmia");

const fetchBestemmia = () => {
  let APIurl = "http://bestemmie.org/api/random";

  const options = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  axios
    .get(APIurl, options)
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
};

bestemmiaButton.onclick = fetchBestemmia;
