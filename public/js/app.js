console.log("client side javscript is working");

const form = document.querySelector("form");
const input = document.querySelector("#searchinput");
const message1 = document.querySelector("#errorparagraph");
const message2 = document.querySelector("#successparagraph");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const userinput = input.value;

  console.log(input.value);
  fetch(`http://localhost:3000/weather?address=${userinput}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          message1.textContent = data.error;
          console.log(data.error);
        } else {
          //  const showdata = JSON.stringify(data.forecast);
          message2.textContent = `The Temperature right now in ${data.forecast.name} is ${data.forecast.temperature} degree Celsius`; //only visible to public
          console.log(data.forecast);
        }
      });
    }
  );
});

// fetch("http://localhost:3000/weather?address=delhi").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(chalk.reds.inverse(data.error));
//     } else {
//       console.log(chalk.green.inverse(data));
//     }
//   });
// });
