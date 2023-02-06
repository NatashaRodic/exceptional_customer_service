import { createFactory } from "react";
import "./style.css";
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

const initialStories = [
  {
    id: 1,
    text: "Chalk and cheese gouda stinking bishop babybel when the cheese comes out everybody's happy cheese triangles port-salut swiss.",
    source: "http://www.cheeseipsum.co.uk/",
    category: "Pets",
    votesLike: 25,
    votesDislike: 1,
    votesMindblowing: 2,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Queso stinking bishop brie swiss cheese and biscuits cauliflower cheese cheese triangles swiss. Monterey jack croque monsieur squirty cheese emmental caerphilly cheddar lancashire cottage cheese.",
    source: "http://www.cheeseipsum.co.uk/",
    category: "Requests",
    votesLike: 8,
    votesDislike: 0,
    votesMindblowing: 1,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Fromage frais feta chalk and cheese. Swiss fromage frais cheese and biscuits croque monsieur bavarian bergkase cheese strings red leicester goat. ",
    source: "http://www.cheeseipsum.co.uk/",
    category: "Packages",
    votesLike: 8,
    votesDislike: 3,
    votesMindblowing: 1,
    createdIn: 2015,
  },
];

function App() {
  return (
    <>
      {/* HEADER  */}
      <header className="header">
        <div className="logo">
          <img
            src="box_bozzuto.png"
            height="68"
            width="100"
            alt="Today I helped Logo"
          />
        </div>
        <div className="headerimages">
          <img
            src="person.png"
            height="100"
            width="200"
            alt="Today I helped Logo"
          />
          <button className="btn btn-large btn-open">Share a story!</button>
        </div>
      </header>
      <NewStoryForm />
      <main className="main">
        <CategoryFilter />
        <StoryList />
      </main>
    </>
  );
}
function NewStoryForm() {
  return <form className="story-form">Story Form</form>;
}
function CategoryFilter() {
  return <aside>Category filter</aside>;
}
function StoryList() {
  const stories = initialStories;
  return (
    <section>
      <ul className="story-list">
        {stories.map((story) => (
          <li className="story">
            <p>
              {story.text}
              <a className="source" href={story.source} target="_blank">
                (Source)
              </a>
            </p>
            <span className="category" style={{ backgroundColor: "#3b82f6" }}>
              {story.category}
            </span>
            <div className="buttons-like-dislike">
              <button>👍 {story.votesLike}</button>
              <button>👎 {story.votesDislike}</button>
              <button>🤯 {story.votesMindblowing}</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default App;
