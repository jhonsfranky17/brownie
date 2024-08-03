const containers = document.querySelectorAll(".div");
const backdrop = document.getElementById("backdrop");
const title = document.getElementById("title");
const homeButton = document.getElementById("back");

// Adding event listener for each item
containers.forEach((item) => {
  item.addEventListener("click", () => {
    // Hide all containers and show backdrop
    containers.forEach((div) => div.classList.add("hidden"));
    backdrop.classList.remove("hidden");
    title.classList.add("hidden");
    // Create order pop up of the clicked item to animate
    let clickedItem;
    if (item.classList.contains("white"))
      clickedItem = document.getElementById("white");
    if (item.classList.contains("classic"))
      clickedItem = document.getElementById("classic");
    if (item.classList.contains("roasted"))
      clickedItem = document.getElementById("roasted");
    if (item.classList.contains("bliss"))
      clickedItem = document.getElementById("bliss");

    clickedItem.classList.remove("hidden");
    clickedItem.classList.add("pop-in", "fixed", "flex");
    backdrop.appendChild(clickedItem);
    calculatePrice(clickedItem);
    backdrop.classList.add("flex");
    homeButton.classList.remove("hidden");
    homeButton.classList.add("flex");
  });
});

// calculating and displaying final price
function calculatePrice(clickedItem) {
  const pricing = document.getElementById("pricing");
  let finalPricing = 0;
  let package, variety;
  if (clickedItem.id === "white") {
    package = clickedItem.querySelector(
      `input[name="packaging-white"]:checked`
    );
    variety = clickedItem.querySelector(
      `input[name="varieties-white"]:checked`
    );
    finalPricing = +package.value + +variety.value;
    pricing.innerHTML = finalPricing;
  } else if (clickedItem.id === "classic") {
    package = clickedItem.querySelector(
      `input[name="packaging-classic"]:checked`
    );
    variety = clickedItem.querySelector(
      `input[name="varieties-classic"]:checked`
    );
    finalPricing = +package.value + +variety.value;
    pricing.innerHTML = finalPricing;
  } else if (clickedItem.id === "roasted") {
    package = clickedItem.querySelector(
      `input[name="packaging-roasted"]:checked`
    );
    variety = clickedItem.querySelector(
      `input[name="varieties-roasted"]:checked`
    );
    finalPricing = +package.value + +variety.value;
    pricing.innerHTML = finalPricing;
  } else if (clickedItem.id === "bliss") {
    package = clickedItem.querySelector(
      `input[name="packaging-bliss"]:checked`
    );
    variety = clickedItem.querySelector(
      `input[name="varieties-bliss"]:checked`
    );
    finalPricing = +package.value + +variety.value;
    console.log(finalPricing);
    pricing.innerHTML = finalPricing;
  }
  handleSelectionChange(clickedItem);
  const order = clickedItem.querySelector("#order");

  order.addEventListener("click", () => {
    handleOrder(clickedItem, package, variety);
  });
}

// function to add event listeners

function handleSelectionChange(clickedItem) {
  let package, variety;
  if (clickedItem.id === "white") {
    package = clickedItem.querySelectorAll(`input[name="packaging-white"]`);
    variety = clickedItem.querySelectorAll(`input[name="varieties-white"]`);
  } else if (clickedItem.id === "classic") {
    package = clickedItem.querySelectorAll(`input[name="packaging-classic"]`);
    variety = clickedItem.querySelectorAll(`input[name="varieties-classic"]`);
  } else if (clickedItem.id === "roasted") {
    package = clickedItem.querySelectorAll(`input[name="packaging-roasted"]`);
    variety = clickedItem.querySelectorAll(`input[name="varieties-roasted"]`);
  } else if (clickedItem.id === "bliss") {
    package = clickedItem.querySelectorAll(`input[name="packaging-bliss"]`);
    variety = clickedItem.querySelectorAll(`input[name="varieties-bliss"]`);
  }

  package.forEach((button) => {
    if (button.checked) {
      button.parentElement.classList.add("selected");
    } else {
      button.parentElement.classList.remove("selected");
    }
    button.addEventListener("change", () => {
      if (button.checked) {
        button.parentElement.classList.add("selected");
      } else {
        button.parentElement.classList.remove("selected");
      }
      calculatePrice(clickedItem);
    });
  });

  variety.forEach((button) => {
    if (button.checked) {
      button.parentElement.classList.add("selected");
    } else {
      button.parentElement.classList.remove("selected");
    }
    button.addEventListener("change", () => {
      if (button.checked) {
        button.parentElement.classList.add("selected");
      } else {
        button.parentElement.classList.remove("selected");
      }
      calculatePrice(clickedItem);
    });
  });
}

function handleOrder(clickedItem, package, variety) {
  const itemElement = clickedItem.querySelector("#item-name");
  const brownie = itemElement.innerHTML;
  const nameElement = clickedItem.querySelector("#name");
  const contactElement = clickedItem.querySelector("#contact");
  const name = nameElement.value;
  const contact = contactElement.value;
  console.log(brownie);
  console.log(package.id);
  console.log(variety.id);
  console.log(name);
  console.log(contact);
}
