import './App.css';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <main className="main-content">
        <Hero />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}

export default App;

