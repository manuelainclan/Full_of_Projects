import { useState } from 'react';
import { Route, Routes, useLocation, matchPath } from 'react-router-dom';
import '../styles/App.scss';
import CreateProject from './CreateProject';
import Landing from './Landing';
import ls from '../service/localStorage';
import CardDetail from '../components/Preview/CardDetail';

function App() {
  const [dataCardList, setDataCardList] = useState(ls.get('dataCardLS', []));

  const { pathname } = useLocation();

  const datalUrl = matchPath('/Card/:index', pathname);

  console.log(datalUrl);

  /*  const cardDetailId = datalUrl !== null ? datalUrl.params.name : null;

  const cardFind = dataCardList.find((eachCard)=>eachCard.id{})
 */
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Landing
            setDataCardList={setDataCardList}
            dataCardList={dataCardList}
          />
        }
      />
      <Route
        path="/create"
        element={
          <CreateProject
            dataCardList={dataCardList}
            setDataCardList={setDataCardList}
            // handleDataCardList={handleDataCardList}
          />
        }
      />
      <Route
        path="/CardDetail"
        element={<CardDetail dataCardList={dataCardList} />}
      ></Route>
    </Routes>
  );
}

export default App;
