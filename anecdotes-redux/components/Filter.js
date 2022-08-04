import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  };
  return (
    <p>
      <input 
        type="text"
        placeholder="search" 
        onChange={handleChange} 
      />
    </p>
  );
};

export default Filter;
