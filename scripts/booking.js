const containers = document.querySelectorAll(".div");
const backdrop = document.getElementById("backdrop");
const title = document.getElementById("title");
const homeButton = document.getElementById("back");
let clickedItem;
let finalPricing = 0;
let package, variety;
// Adding event listener for each item
containers.forEach((item) => {
  item.addEventListener("click", () => {
    // Hide all containers and show backdrop
    containers.forEach((div) => div.classList.add("hidden"));
    backdrop.classList.remove("hidden");
    title.classList.add("hidden");
    // Create order pop up of the clicked item to animate

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
    const order = clickedItem.querySelector("#order");
    order.addEventListener("click", () => {
      handleOrder(clickedItem, package, variety, finalPricing);
    });
    backdrop.classList.add("flex");
    homeButton.classList.remove("hidden");
    homeButton.classList.add("flex");
  });
});

// calculating and displaying final price
function calculatePrice(clickedItem) {
  const pricing = document.getElementById("pricing");

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
    pricing.innerHTML = finalPricing;
  }
  handleSelectionChange(clickedItem);
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
function isValidate(
  name,
  nameElement,
  nameRequired,
  contact,
  contactElement,
  contactRequired
) {
  let validationResult = true;
  if (name.trim() === "") {
    nameRequired.classList.remove("hidden");
    nameElement.focus();
    validationResult = false;
  } else {
    nameRequired.classList.add("hidden");
  }
  if (contact.trim() === "" || contact.length !== 10) {
    contactRequired.classList.remove("hidden");
    contactElement.focus();
    validationResult = false;
  } else {
    contactRequired.classList.add("hidden");
  }
  return validationResult;
}

function handleOrder(clickedItem, package, variety, finalPricing) {
  const itemElement = clickedItem.querySelector("#item-name");
  const brownie = itemElement.innerHTML.trim();
  const nameElement = clickedItem.querySelector("#name");
  const contactElement = clickedItem.querySelector("#contact");
  const nameRequired = clickedItem.querySelector("#name-required");
  const contactRequired = clickedItem.querySelector("#contact-required");
  const name = nameElement.value;
  const contact = contactElement.value;
  const validateResult = isValidate(
    name,
    nameElement,
    nameRequired,
    contact,
    contactElement,
    contactRequired
  );
  if (!validateResult) {
    return;
  } else {
    const data = {
      service_id: "service_b15bzmp",
      template_id: "template_ngmu1cg",
      user_id: "s5XZ01aMNP0iKSI17",
      template_params: {
        item_name: brownie,
        packaging: package.id,
        variety: variety.id,
        price: finalPricing,
        from_name: name,
        contact_number: contact,
      },
    };
    console.log(data);

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log("Success:", result);
        alert("User data submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error submitting user data.");
      });
  }
}
