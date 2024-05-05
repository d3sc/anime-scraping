export default function getApi(search, option = "") {
  if (!search) return
  return fetch(`http://localhost:3000${option}/${search}`)
    .then((res) => res.json())
    .then((result) => result);
} 