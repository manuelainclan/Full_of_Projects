import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../styles/App.scss';
import CreateProject from './CreateProject';
import Landing from './Landing';
import ls from '../service/localStorage';

function App() {
  const [dataCardList, setDataCardList] = useState(ls.get('dataCardLS', []));

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
    </Routes>
  );
}

export default App;
