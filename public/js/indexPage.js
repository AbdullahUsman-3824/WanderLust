// Array of filter options with their respective names, IDs, and icon classes
const filterOptions = [
  { name: "Trending", id: "trending", iconClass: "fa-solid fa-fire" },
  { name: "Bed Room", id: "bedRoom", iconClass: "fa-solid fa-bed" },
  {
    name: "Amazing Views",
    id: "amazingViews",
    iconClass: "fa-solid fa-mountain-city",
  },
  { name: "Arctic", id: "arctic", iconClass: "fa-regular fa-snowflake" },
  {
    name: "Amazing Pools",
    id: "amazingPools",
    iconClass: "fa-solid fa-water-ladder",
  },
  { name: "Castle", id: "castle", iconClass: "fa-brands fa-fort-awesome" },
  { name: "Mountains", id: "mountains", iconClass: "fa-solid fa-mountain" },
  { name: "BreakFast", id: "breakfast", iconClass: "fa-solid fa-mug-hot" },
  { name: "Farms", id: "farms", iconClass: "fa-solid fa-cow" },
  { name: "Camping", id: "camping", iconClass: "fa-solid fa-tent" },
  { name: "Ski-in/out", id: "skiing", iconClass: "fa-solid fa-person-skiing" },
  { name: "Beach", id: "beach", iconClass: "fa-solid fa-umbrella-beach" },
  { name: "Adapted", id: "adapted", iconClass: "fa-solid fa-wheelchair-move" },
];

// Selecting the container for filter icons and arrows
const iconContainer = document.getElementsByClassName("filter-options")[0];
const scrollArrowLeft = document.querySelector(".scroll-arrow-left");
const scrollArrowRight = document.querySelector(".scroll-arrow-right");

// Dynamically creating filter elements and appending them to the icon container
for (const item of filterOptions) {
  let filter = document.createElement("div");
  filter.setAttribute("id", item.id);
  filter.classList.add("filter");
  filter.innerHTML = `
    <div class="filter-icon">
      <i class="${item.iconClass}"></i>
    </div>
    <p class="filter-text">${item.name}</p>`;
  iconContainer.appendChild(filter);
}

// Function to update visibility of scroll arrows based on scroll position
function updateArrows() {
  if (iconContainer.scrollLeft === 0) {
    scrollArrowLeft.style.display = "none";
  } else {
    scrollArrowLeft.style.display = "flex";
  }
  if (
    iconContainer.scrollLeft + iconContainer.clientWidth >=
    iconContainer.scrollWidth
  ) {
    scrollArrowRight.style.display = "none";
  } else {
    scrollArrowRight.style.display = "flex";
  }
}

// Functions for scrolling filters left and right
function filterScrollLeft() {
  iconContainer.scrollBy({
    left: -200,
    behavior: "smooth",
  });
}

function filterScrollRight() {
  iconContainer.scrollBy({
    left: 200,
    behavior: "smooth",
  });
}

// Event listeners for scroll and window resize to update arrow visibility
iconContainer.addEventListener("scroll", updateArrows);
window.addEventListener("resize", updateArrows);
updateArrows();

// Handling tax switch functionality
const taxSwitch = document.getElementById("flexSwitchCheckDefault");
const taxText = document.getElementsByClassName("gst");

taxSwitch.addEventListener("click", () => {
  if (!taxSwitch.checked) {
    Array.from(taxText).forEach((element) => {
      element.style.display = "none";
    });
  } else {
    Array.from(taxText).forEach((element) => {
      element.style.display = "inline";
    });
  }
});
