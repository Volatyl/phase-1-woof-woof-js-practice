//display dogs on page load
window.addEventListener("DOMContentLoaded", () => {
  filterDogs();
});

//Function to display dogs
function displayDogs(dogs) {
  const dogBar = document.querySelector("#dog-bar");
  dogs.forEach((dog) => {
    const dogName = document.createElement("span");
    dogName.textContent = dog.name;
    dogBar.appendChild(dogName);
    dogName.addEventListener("click", () => {
      dogDetails(dog);
    });
  });
}
//Function to filter dogs
function filterDogs() {
  fetch("http://localhost:3000/pups")
    .then((res) => res.json())
    .then((dogs) => {
      console.log(dogs);
      displayDogs(dogs);
    })
    .catch((error) => console.error(error));
}

//Fuction to display dogs details
function dogDetails(dog) {
  const dogInfo = document.getElementById("dog-info");
  const behaviour = dog.isGoodDog ? "Good Dog!" : "Bad Dog";
  dogInfo.innerHTML = `
    <img src="${dog.image}"/>
    <p>${dog.name}</p>
    <button>${behaviour}</button>
  `;
}
