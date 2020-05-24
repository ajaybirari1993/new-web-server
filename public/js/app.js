console.log("Script file loading from the client side");

const weatherEle = document.querySelector("form");
const searchBox = document.querySelector("input");

weatherEle.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = searchBox.value;
  console.log(location);
  document.getElementById("result").textContent = "Loading.....";
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      if (result.error) {
        console.log(result.error);
        document.getElementById("result").textContent = result.error;
      } else {
        console.log(result);
        document.getElementById(
          "result"
        ).textContent = `Location: ${result.address} and Temperature : ${result.temperature}`;
      }
    });
});
