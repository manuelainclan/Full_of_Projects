const dataApi = (data) => {
  return fetch('http://localhost:4000/api/projects/add', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const listProjectApi = () => {
  return fetch('http://localhost:4000/api/projects/all')
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const deleteAllCards = () => {
  return fetch('http://localhost:4000/api/projects/delete_all', {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const deleteOneCard = (params) => {
  return fetch(`http://localhost:4000/api/projects/delete_one/${params}`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const api = { dataApi, listProjectApi, deleteAllCards, deleteOneCard };

export default api;
