import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { GithubProvider } from "./context/github/GithubContext";
function App() {
  return (
    <GithubProvider>
      <Router>
        {/* take the full length of the screen vertically */}
        <div className="flex flex-col justify-between h-screen">
          <Navbar />
          <main className="container mx-auto px-3 pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/notfound" element={<NotFound />} />
              {/* catch all if a page doesnt exist user vists here */}
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GithubProvider>
  );
}

export default App;
