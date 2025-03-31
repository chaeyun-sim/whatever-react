export default function App() {
  return (
    <div>
      <header>
        <h1>Title</h1>
      </header>
      <main>
        <article aria-label='article'>
          <h2 style={{ color: 'blue' }}>Subtitle</h2>
          <p>Content</p>
          <input value={'1'} />
          <button onClick={() => console.log('click')}>click!</button>
        </article>
      </main>
    </div>
  );
}
