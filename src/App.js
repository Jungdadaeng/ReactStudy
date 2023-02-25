import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Projects from './pages/Projects'
import QnA from './pages/QnA'
import Login from './pages/Login'
import Layout from './components/Layout/Layout'
import SportsMain from './components/SportsChallenge/SportsMain'
import SportsHistory from './components/SportsChallenge/SportsHistory';
import SportsHeader from './components/SportsChallenge/SportsHeader';
import SportsChallenge from './components/SportsChallenge/SportsChallenge';
import Instagram from './components/Instagram/Instagram';
import {
  RecoilRoot, atom, selector, useRecoilState, useRecoilValue
} from 'recoil';
function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/qna' element={<QnA />} />
          <Route element={<SportsHeader />}>
            <Route path="/sports" element={<SportsMain />} />
            <Route path="/sports/history" element={<SportsHistory />} />
            <Route path="/sports/challenge" element={<SportsChallenge />} />
          </Route>
          <Route path="/insta" element={<Instagram />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
