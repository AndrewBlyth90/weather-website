const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = ''

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  console.log(location);
  messageOne.textContent = "Finding weather for " + location;
  messageTwo.textContent = ''
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          console.log(data)
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecastData;
        }
      });
    }
  );
});
