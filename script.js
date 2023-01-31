const initialFacts = [
  {
    id: 1,
    text: "Chalk and cheese gouda stinking bishop babybel when the cheese comes out everybody's happy cheese triangles port-salut swiss.",
    source: "http://www.cheeseipsum.co.uk/",
    category: "Mozzarella",
    votesInteresting: 25,
    votesMindblowing: 1,
    votesFalse: 2,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Queso stinking bishop brie swiss cheese and biscuits cauliflower cheese cheese triangles swiss. Monterey jack croque monsieur squirty cheese emmental caerphilly cheddar lancashire cottage cheese.",
    source: "http://www.cheeseipsum.co.uk/",
    category: "Parmesan",
    votesInteresting: 8,
    votesMindblowing: 0,
    votesFalse: 1,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Fromage frais feta chalk and cheese. Swiss fromage frais cheese and biscuits croque monsieur bavarian bergkase cheese strings red leicester goat. ",
    source: "http://www.cheeseipsum.co.uk/",
    category: "Cheddar",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
  {
    text: "Bozzuto",
  },
];

const CATEGORIES = [
  { name: "Mozzarella", color: "#3b82f6" },
  { name: "Parmesan", color: "#16a34a" },
  { name: "Cheddar", color: "#ef4444" },
  { name: "Brie", color: "#eab308" },
  { name: "Swiss", color: "#db2777" },
  { name: "Gruyere", color: "#14b8a6" },
  { name: "Feta", color: "#f97316" },
  { name: "Gouda", color: "#8b5cf6" },
];

/// Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".story-form");
const storyList = document.querySelector(".story-list");

// Create DOM elements: Render facts in list
storyList.innerHTML = "";
createStoryList(initialFacts);

function createStoryList(dataArray) {
  const htmlArr = dataArray.map(
    (story) => `<li class="story">
        <p>
        ${story.text}
          <a
          class="source"
          href="${story.source}"
          target="_blank"
          >(Source)</a
          >
          </p>
          <span class="category" style="background-color: #3b82f6"
          >${story.category}</span
          >
        </li>`
  );
  const noviS = htmlArr.join("");
  console.log(noviS);
  storyList.insertAdjacentHTML("afterbegin", noviS);
}

btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a story";
  }
});

// let votesLike = 25;
// let votesMindblowing = 5;
// votesLike++;
// let totalUpvotes = votesLike + votesMindblowing;

// console.log("Upvotes:", totalUpvotes);

function calcFactAge(year) {
  const currentYear = 2022;
  const age = currentYear - year;
  return age;
}

const age = calcFactAge(2017);

console.log(age);

const factObj = {
  text: "Lisbon is the capital city of Portugal",
  population: "Population is 2000000",
};
console.log(factObj.population);

const allcategories = CATEGORIES.map((category) => category.name);
console.log(allcategories);

// const initialFacts = [
//   {
//     id: 1,
//     text: "Chalk and cheese gouda stinking bishop babybel when the cheese comes out everybody's happy cheese triangles port-salut swiss.",
//     source: "http://www.cheeseipsum.co.uk/",
//     category: "Mozzarella",
//     votesInteresting: 25,
//     votesMindblowing: 1,
//     votesFalse: 2,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Queso stinking bishop brie swiss cheese and biscuits cauliflower cheese cheese triangles swiss. Monterey jack croque monsieur squirty cheese emmental caerphilly cheddar lancashire cottage cheese.",
//     source: "http://www.cheeseipsum.co.uk/",
//     category: "Parmesan",
//     votesInteresting: 8,
//     votesMindblowing: 0,
//     votesFalse: 1,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Fromage frais feta chalk and cheese. Swiss fromage frais cheese and biscuits croque monsieur bavarian bergkase cheese strings red leicester goat. ",
//     source: "http://www.cheeseipsum.co.uk/",
//     category: "Cheddar",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];
