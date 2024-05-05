import { useEffect, useRef, useState } from "react";
import getApi from "./components/apiHandler";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [anime, setAnime] = useState([]);
  const [episode, setEpisode] = useState([]);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState();

  const episodeRef = useRef();
  useEffect(() => {
    const render = async () => {
      setData(await getApi(search, "/search"));
    };
    render();
  }, [search]);

  useEffect(() => {
    if (data?.length >= 1) setLoading(false);
  }, [data]);

  // useEffect(() => {
  //   getApi()
  // }, [anime])

  const enterHandle = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      setSearch(e.target.value);
      e.target.value = "";
      setLoading(true);
    }
  };

  const searchAnimeHandle = async (e, search) => {
    setLoading(true);
    e.preventDefault();
    episodeRef.current.scrollIntoView({ behavior: "smooth" });
    setAnime(await getApi(search, "/anime"));
    setLoading(false);
  };

  const searchEpisodeHandle = async (e, search) => {
    setLoading(true);
    e.preventDefault();
    setEpisode(await getApi(search, "/episode"));
    setLoading(false);
  };

  const newestAnimehandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    setData(await getApi("newest"));
    setLoading(false);
  };
  return (
    <>
      {loading && "Loading.."}
      <nav className="navbar">
        <a href="#search">search</a>
        <a href="#anime">anime</a>
        <a href="#episode">episode</a>
        <a href="#watch">watched</a>
      </nav>
      <button onClick={newestAnimehandler}>newest anime</button>
      <p>search anime: </p>
      <input type="text" onKeyDown={enterHandle} id="search" />
      <p id="anime">anime</p>
      <ul>
        {data?.map((item, i) => (
          <li key={i}>
            <ul>
              <img src={item.image} alt={item.title} />
              <li>title: {item.title}</li>
              <li>genre: {item.genre}</li>
              <li>status: {item.status}</li>
              <li>rating: {item.rating}</li>
            </ul>
            <button onClick={(e) => searchAnimeHandle(e, item.link.replace("https://otakudesu.cloud/anime/", ""))}>detail</button>
          </li>
        ))}
      </ul>

      <p id="episode">episode</p>
      <ul ref={episodeRef}>
        {anime?.map((item, i) => (
          <li key={i}>
            <ul>
              <li>title: {item.title}</li>
              <button onClick={(e) => searchEpisodeHandle(e, item.link.replace("https://otakudesu.cloud/episode/", ""))}>watch</button>
            </ul>
          </li>
        ))}
      </ul>

      <p id="watch">watch</p>
      <ul>
        {episode?.map((item, i) => (
          <li key={i}>
            <iframe src={item.link} width={850} height={570} allowFullScreen frameborder="0"></iframe>
          </li>
        ))}
      </ul>
    </>
  );
}

// {/* <iframe src={item.link} width={550} height={470} allowFullScreen frameborder="0"></iframe> */}

export default App;
