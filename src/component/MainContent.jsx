import React from "react";
import Pagination from "./Pagination";

const MainContent = ({
  selectedEpisode,
  characters,
  loading,
  currentPage,
  itemsPerPage,
  page,
}) => {
  const indexOfLastCharacter = currentPage * itemsPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - itemsPerPage;

  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );
  const totalPages = Math.ceil(characters.length / itemsPerPage);

  return (
    <div className="p-8 ">
      {selectedEpisode ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">
            {selectedEpisode.name}
          </h2>

          <h3 className="text-xl font-thin mb-10">{`${characters?.length} Characters in episode "${selectedEpisode?.name}"`}</h3>

          {loading ? (
            <div className="text-center text-lg">Loading characters...</div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {currentCharacters.map((character) => (
                <div
                  key={character.id}
                  className="flex flex-col items-center bg-white p-4 shadow rounded transition-transform transform hover:scale-105 hover:shadow-lg hover:text-red-300 cursor-pointer"
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-24 h-24 rounded-full mb-2"
                  />
                  <p className="text-center">{character.name}</p>
                </div>
              ))}
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={page}
          />
        </div>
      ) : (
        <div className="text-center">Select an episode to view details</div>
      )}
    </div>
  );
};

export default MainContent;
