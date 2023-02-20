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
  const [currentCategory, setCurrentCategory] = useState("All");

  useEffect(
    function () {
      async function getStories() {
        setIsLoading(true);

        let query = supabase.from("stories").select("*");
        if (currentCategory !== "All")
          query = query.eq("category", currentCategory);

        const { data: stories, error } = await query

          .order("votesLike", { ascending: false })
          .limit(1000);

        if (!error) setStories(stories);
        else alert("An unexpected error has occurred. Please try again later!");
        setIsLoading(false);
      }
      getStories();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? (
        <NewStoryForm setStories={setStories} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <StoryList stories={stories} setStories={setStories} />
        )}
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
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(text, name, category);
    if (text && name && category && textLength <= 200) {
      // const newStory = {
      //   id: Math.round(Math.random() * 10000000),
      //   text,
      //   name,
      //   category,
      //   votesLike: 0,
      //   votesDislike: 0,
      //   votesMindblowing: 0,
      //   createdIn: new Date().getFullYear(),
      // };
      // 1. Upload stories to Supabase and receive the new story object
      setIsUploading(true);
      const { data: newStory, error } = await supabase
        .from("stories")
        .insert([{ text, name, category }])
        .select();
      setIsUploading(false);
      console.log(newStory);

      if (!error) setStories((stories) => [newStory[0], ...stories]);
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
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        value={name}
        type="text"
        placeholder="Your name!"
        onChange={(e) => setName(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
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
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category2">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("All")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((category) => (
          <li key={category.name} className="category2">
            <button
              className="btn btn-all-categories"
              onClick={() => setCurrentCategory(category.name)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
function StoryList({ stories, setStories }) {
  if (stories.length === 0) {
    return (
      <p className="loading">
        Be the first to create a story in this category ↑↑↑
      </p>
    );
  }
  return (
    <section>
      <ul className="story-list">
        {stories.map((story) => (
          <Story key={story.id} story={story} setStories={setStories} />
        ))}
      </ul>
    </section>
  );
}
function Story({ story, setStories }) {
  const [isUpdating, setIsUpdating] = useState(false);
  async function handleVote() {
    setIsUpdating(true);
    const { data: updatedStory, error } = await supabase
      .from("stories")
      .update({ votesLike: story.votesLike + 1 })
      .eq("id", story.id)
      .select();
    setIsUpdating(false);
    console.log(updatedStory);
    if (!error)
      setStories((stories) =>
        stories.map((s) => (s.id === story.id ? updatedStory[0] : s))
      );
  }
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
        <button onClick={handleVote} disabled={isUpdating}>
          👍 {story.votesLike}
        </button>
        <button>👎 {story.votesDislike}</button>
        <button>🤯 {story.votesMindblowing}</button>
      </div>
    </li>
  );
}

export default App;
