const dataApi = (data) => {
  return fetch('https://dev.adalab.es/api/projectCard', {
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

const api = { dataApi, listProjectApi };

export default api;