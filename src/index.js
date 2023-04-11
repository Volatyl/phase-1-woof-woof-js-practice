//display dogs on page load
window.addEventListener("DOMContentLoaded", () => {
  filterDogs();
  const filterBtn = document.getElementById("good-dog-filter");
  filterBtn.addEventListener("click", () => {
    filterBtnString = filterBtn.textContent;
    const status = filterBtnString.split(": ")[1];
    if (status === "OFF") {
      filterBtn.textContent = `Filter good dogs: ON`;
      filterDogs(true);
    } else if (status === "ON") {
      filterBtn.textContent = `Filter good dogs: OFF`;
      filterDogs(false);
    }
  });
});

//Function to display dogs
function displayDogs(dogs) {
  const dogBar = document.querySelector("#dog-bar");
  dogBar.innerHTML = "";
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
function filterDogs(filter) {
  fetch("http://localhost:3000/pups")
    .then((res) => res.json())
    .then((dogs) => {
      if (filter) {
        dogs = dogs.filter((dog) => (dog.isGoodDog === true ? dog : null));
        displayDogs(dogs);
      }
      displayDogs(dogs);
    })
    .catch((error) => console.error(error));
}

//Fuction to display dogs details
function dogDetails(dog) {
  const dogInfo = document.getElementById("dog-info");
  const description = dog.isGoodDog ? "Good Dog!" : "Bad Dog";
  dogInfo.innerHTML = `
    <img src="${dog.image}"/>
    <p>${dog.name}</p>
    <button class="toggle">${description}</button>
  `;
  const toggle = dogInfo.querySelector(".toggle");
  toggle.addEventListener("click", () => {
    toggleDog(dog, description);
  });
}

//Function to toggle dog description
function toggleDog(dog) {
  dog.isGoodDog = !dog.isGoodDog;
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isGoodDog: dog.isGoodDog,
    }),
  });
}
