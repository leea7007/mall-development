import React from "react";

const CheckBox = ({ continents, checkedContinents, onFilters }) => {
  const handleToggle = (continentId) => {
    // check filled checkbox is already filled

    const currentIndex = checkedContinents.indexOf(continentId);
    //불변성 지키기 위해
    const newChecked = [...checkedContinents];

    if (currentIndex === -1) {
      newChecked.push(continentId);
    } else {
      //이미 있는거 제거
      newChecked.splice(currentIndex, 1);
    }
    onFilters(newChecked);
  };

  return (
    <div className="p-2 mb-3 bg-gray-100 rounded-md ">
      {continents?.map((continent) => (
        <div key={continent._id}>
          <input type="checkbox" onChange={() => handleToggle(continent._id)} />{" "}
          <label>{continent.name}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
