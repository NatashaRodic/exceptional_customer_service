import "./style.css";

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
      <main class="main">
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
  return <section>Story List</section>;
}
export default App;
