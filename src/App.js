import HomePage  from './pages/homePage';
import RelatedArtistsPage from './pages/relatedArtistsPage';
import AlbumTracksPage from './pages/albumTracksPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div>
        <Header />
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route exact path="/artists/:artistID" element={<RelatedArtistsPage/>}/>
            <Route exact path="/albums/:albumID" element={<AlbumTracksPage/>} />
          </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
