import HomePage  from './pages/HomePage';
import ArtistAlbumsPage from './pages/ArtistPage';
import AlbumTracksPage from './pages/AlbumPage';
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
            <Route exact path="/artists/:artistID" element={<ArtistAlbumsPage/>}/>
            <Route exact path="/albums/:albumID" element={<AlbumTracksPage/>} />
          </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
