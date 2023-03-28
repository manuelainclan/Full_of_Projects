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

  const datalUrl = matchPath('/DetailCard/:id', pathname);

  console.log(datalUrl);

  /*  const cardDetailId = datalUrl !== null ? datalUrl.params.id : null;

  const cardFind = dataCardList.find((eachCard)=>eachCard.id{})
 */
  return (
    <Routes>
      <Route path="/" element={<Landing setDataCardList={setDataCardList} />} />
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
      <Route path="/DetailCard/:id" element={<CardDetail></CardDetail>}></Route>
    </Routes>
  );
}

export default App;
