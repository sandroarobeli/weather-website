/*   CLIENT SIDE JAVASCRIPT   */
// BECAUSE THIS PARTICULAR APP.JS FILE IS TIED TO INDEX.HTML
// THAT THE USED GETS TO SEE AND INTERACT WITH

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;
  const url = `http://127.0.0.1:8000/weather?address=${location}`;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(url).then((response) => {
    response.json().then(({ error, location, forecast }) => {
      if (error) {
        messageOne.textContent = error;
      } else {
        messageOne.textContent = `For: ${location}`;
        messageTwo.textContent = forecast;
      }
    });
  });
});
