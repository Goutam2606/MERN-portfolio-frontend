import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index';
import react, { useEffect } from 'react';
import Loader from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { HideLoading, SetPortfolioData, ShowLoading, ReloadData } from './redux/rootSlice';
import Admin from './pages/Admin';
import Login from './pages/Admin/Login';
function App() {
  const { loading, portfolioData, reloadData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get('/api/portfolio/get-portfolio-data');
      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false));
      // console.log("response", response.data);
      dispatch(HideLoading());

    } catch (error) {
      console.log("error", error);
      dispatch(HideLoading());
    }
  };
  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData();
    }
  }, [portfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData]);
  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
