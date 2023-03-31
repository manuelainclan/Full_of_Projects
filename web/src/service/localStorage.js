function get(key, valorPorDefecto) {
  if (localStorage.getItem(key) === null) {
    return valorPorDefecto;
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}

function set(key, valor) {
  localStorage.setItem(key, JSON.stringify(valor));
}

function remove(key) {
  localStorage.removeItem(key);
}

const ls = { get, set, remove };

export default ls;
