import React, { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      if (isEditing) {
        const updatedList = list.map((item, index) =>
          index === currentIndex ? { ...item, text: inputValue } : item
        );
        setList(updatedList);
        setInputValue("");
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        setList([...list, { text: inputValue, completed: false }]);
        setInputValue("");
      }
    }
  };

  const handleEdit = (index) => {
    setInputValue(list[index].text);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
  };

  const handleToggleComplete = (index) => {
    const updatedList = list.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setList(updatedList);
  };

  return (
    <div className="container">
      <div className="todos">
        <form onSubmit={handleAddOrUpdate}>
          <input
            type="text"
            placeholder="Type Something Here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">{isEditing ? "Update" : "Add To List"}</button>
        </form>
        <div className="box">
          {list.map((item, index) => (
            <div key={index} className="list-item">
              <input
                type="checkbox"
                style={{ cursor: "pointer" }}
                checked={item.completed}
                onChange={() => handleToggleComplete(index)}
              />
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                  opacity: item.completed ? "0.7" : "1",
                  color: item.completed ? "green" : "red",
                }}
              >
                {item.text}
              </span>
              <button className="edit-button" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
