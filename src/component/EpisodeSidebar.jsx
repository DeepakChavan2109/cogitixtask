import React, { useState, useEffect } from "react";
import MainContent from "./MainContent.jsx";

const EpisodeSidebar = () => {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch("https://rickandmortyapi.com/api/episode");
        const data = await response.json();
        setEpisodes(data.results);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
  }, []);

  const fetchCharacterData = async (characterUrls) => {
    setLoading(true);
    try {
      const characterData = await Promise.all(
        characterUrls.map((url) => fetch(url).then((res) => res.json()))
      );
      setCharacters(characterData);
    } catch (error) {
      console.error("Error fetching character data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    fetchCharacterData(episode.characters);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/4 h-screen bg-gray-100 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Episodes</h2>
          <ul>
            {episodes.map((episode) => (
              <li
                key={episode.id}
                className={`p-4 mb-2 rounded cursor-pointer border-2 ${
                  selectedEpisode?.id === episode.id
                    ? "border-black bg-gray-300"
                    : "border-transparent"
                } hover:bg-gray-200`}
                onClick={() => handleEpisodeClick(episode)}
              >
                {episode.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full">
          <MainContent
            selectedEpisode={selectedEpisode}
            characters={characters}
            loading={loading}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            page={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default EpisodeSidebar;
