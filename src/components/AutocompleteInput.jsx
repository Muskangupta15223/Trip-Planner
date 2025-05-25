import React, { useEffect, useRef, useState } from "react";

const AutocompleteInput = ({ onPlaceSelect }) => {
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!window.google || !window.google.maps?.places?.AutocompleteSuggestion) {
      console.warn("AutocompleteSuggestion is not supported or loaded.");
      return;
    }
  }, []);

  const handleChange = async (e) => {
    const value = e.target.value;
    if (!value) {
      setSuggestions([]);
      return;
    }

    const request = {
      input: value,
    };

    const service = new window.google.maps.places.AutocompleteSuggestion();
    service.getSuggestions(request, (predictions, status) => {
      if (status === "OK" && predictions) {
        setSuggestions(predictions);
      } else {
        setSuggestions([]);
      }
    });
  };

  const handleSelect = (place) => {
    setSuggestions([]);
    inputRef.current.value = place.suggestion;
    onPlaceSelect(place); // pass the whole suggestion object
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        onChange={handleChange}
        className="p-3 border rounded-xl w-full font-sans"
        placeholder="Search for a place"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
