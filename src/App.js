import { Route, Routes } from 'react-router-dom';
import Apage from './pages/Apage'
import Bpage from './pages/Bpage'
import Cpage from './pages/Cpage'
import Login from './pages/Login'
import Layout from './components/Layout/Layout'
import SportsMain from './components/SportsChallenge/SportsMain'
import SportsHistory from './components/SportsChallenge/SportsHistory';
import SportsHeader from './components/SportsChallenge/SportsHeader';
import SportsChallenge from './components/SportsChallenge/SportsChallenge';
import Instagram from './components/Instagram/Instagram';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Apage />} />
        <Route path='/A' element={<Apage />} />
        <Route path='/B' element={<Bpage />} />
        <Route path='/C' element={<Cpage />} />
        <Route element={<SportsHeader />}>
          <Route path="/sports" element={<SportsMain />} />
          <Route path="/sports/history" element={<SportsHistory />} />
          <Route path="/sports/challenge" element={<SportsChallenge />} />
        </Route>
        <Route path="/insta" element={<Instagram />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;