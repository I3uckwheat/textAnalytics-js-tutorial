document.getElementById("analyzeButton").addEventListener("click", analyze);

function analyze(){
  const reqBody = {
    "documents": [
      {
        "language":"en",
        "id": 1,
        "text": document.getElementById("input").value
      }
    ]
  }

  const myHeader = new Headers({
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": "9ab6f5a83b934a84bbab25edaa5c2418"
  });

  const initObject = {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: myHeader
  }

  const request = new Request("https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases", initObject)

  const output = document.getElementById("output");

  fetch(request).then(response => {
    if(response.ok) {
      return response.json();
    } else {
    return Promise.reject(new Error(response.statusText))}
  }).then(response => {
    output.innerHTML = "Total Key Phrases: " +
    response.documents[0].keyPhrases.length +
    "</br>" +
    response.documents[0].keyPhrases;
  }).catch(error => {
    alert(error);
    output.innerHTML = "";
  })
}
