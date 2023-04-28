const country = document.getElementById("country");
const state = document.getElementById("state");

// *****************************************
//      Api fetch for country and state
// *****************************************
const api_url =
  "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json";
async function getapi(url) {
  const response = await fetch(url);
  var data = await response.json();
  return data;
}
// *****************************************
//           country list
// *****************************************
async function showCountry() {
  const data = await getapi(api_url);
  data.map((item) => {
    const newOption = document.createElement("option");
    newOption.value = item.name;
    newOption.text = item.name;
    country.appendChild(newOption);
  });
}
showCountry();
// *****************************************
//           state list
// *****************************************
state.style.visibility = "hidden";
async function showState(cname) {
  const data = await getapi(api_url);
  const stateData = data.filter((item) => {
    return item.name == cname;
  });
  state.innerHTML = "";
  const newOption = document.createElement("option");
  newOption.value = "";
  newOption.text = "";
  state.appendChild(newOption);
  if (stateData[0].states.length == 0) {
    state.style.visibility = "hidden";
  } else {
    state.style.visibility = "visible";
    stateData[0].states.map((item) => {
      let newOption = document.createElement("option");
      newOption.value = item.name;
      newOption.text = item.name;
      state.appendChild(newOption);
    });
  }
}

// *****************************************
//            Form validation
// *****************************************
const validation = (value) => {
  if (value.name.length == 0) {
    return JSON.stringify({
      Name: { error: "Name feild can not be empty." },
    });
  } else if (value.name.length < 3 || value.name.length > 11) {
    return JSON.stringify({
      Name: { error: "length should be in between 4-10 characters." },
    });
  } else if (value.number.length != 10) {
    return JSON.stringify({
      Number: { error: "Mobile num should be of 10 digits." },
    });
  } else if (value.country.length == 0) {
    return JSON.stringify({
      Country: { error: "Country feild can not be empty." },
    });
  } else if (
    document.getElementById("state").childElementCount > 1 &&
    value.state.length == 0
  ) {
    return JSON.stringify({
      State: { error: "State feild can not be empty." },
    });
  } else if (value.email.length == 0) {
    return JSON.stringify({
      Email: { error: "Email feild can not be empty." },
    });
  }

  return JSON.stringify({ Sucess: "All feilds are valid." });
};
// *****************************************
//       Submit button function call
// *****************************************

function handleSubmit(event) {
  // prevent to refresh the page on submit
  event.preventDefault();
  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());
  // form validation call on form data
  const validationResult = validation(value);
  // sending message to parent of this iframe
  window.parent.postMessage(validationResult, "*");
}

document.querySelector("form").addEventListener("submit", handleSubmit);
