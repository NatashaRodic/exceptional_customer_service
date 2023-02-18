import { createFactory, useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

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
    category: "Packa  ges",
    votesLike: 8,
    votesDislike: 3,
    votesMindblowing: 1,
    createdIn: 2015,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getStories() {
      setIsLoading(true);
      const { data: stories, error } = await supabase
        .from("stories")
        .select("*");
      setStories(stories);
      setIsLoading(false);
    }
    getStories();
  }, []);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? (
        <NewStoryForm setStories={setStories} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter />
        {isLoading ? <Loader /> : <StoryList stories={stories} />}

        <StoryList stories={stories} />
      </main>
    </>
  );
}
function Loader() {
  return <p className="loading">Loading...</p>;
}
function Header({ showForm, setShowForm }) {
  const appTitle = "Bozzuto Experience";
  return (
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
        <button
          className="btn btn-large btn-open"
          onClick={() => setShowForm((show) => !show)}
        >
          {showForm ? "Close" : "Share a fact"}
        </button>
      </div>
    </header>
  );
}

const CATEGORIES = [
  { name: "Pets", color: "#3b82f6" },
  { name: "Packages", color: "#16a34a" },
  { name: "Requests", color: "#ef4444" },
  { name: "Brie", color: "#eab308" },
  { name: "Swiss", color: "#db2777" },
  { name: "Gruyere", color: "#14b8a6" },
  { name: "Feta", color: "#f97316" },
  { name: "Gouda", color: "#8b5cf6" },
];
function NewStoryForm({ setStories, setShowForm }) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(text, name, category);
    if (text && name && category && textLength <= 200) {
      const newStory = {
        id: Math.round(Math.random() * 10000000),
        text,
        name,
        category,
        votesLike: 0,
        votesDislike: 0,
        votesMindblowing: 0,
        createdIn: new Date().getFullYear(),
      };
      setStories((stories) => [newStory, ...stories]);
      setText("");
      setName("");
      setCategory("");
      setShowForm(false);
    }
  }
  return (
    <form className="story-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share it with your team!"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        value={name}
        type="text"
        placeholder="Your name!"
        onChange={(e) => setName(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        name=""
        id=""
      >
        <option value="">Choose category:</option>
        <option value="Mozzarella">Mozzarella</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li className="category2">
          <button className="btn btn-all-categories">All</button>
        </li>
        {CATEGORIES.map((category) => (
          <li key={category.name} className="category2">
            <button className="btn btn-all-categories">{category.name}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
function StoryList({ stories }) {
  return (
    <section>
      <ul className="story-list">
        {stories.map((story) => (
          <Story key={story.id} story={story} />
        ))}
      </ul>
    </section>
  );
}
function Story({ story }) {
  return (
    <li className="story">
      <p>
        {story.text}
        <a className="source" href={story.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="category"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === story.category)
            .color,
        }}
      >
        {story.category}
      </span>
      <div className="buttons-like-dislike">
        <button>👍 {story.votesLike}</button>
        <button>👎 {story.votesDislike}</button>
        <button>🤯 {story.votesMindblowing}</button>
      </div>
    </li>
  );
}

export default App;
