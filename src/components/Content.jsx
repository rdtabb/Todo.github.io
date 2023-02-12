const Content = ({ items, handleChange }) => {
  return (
    <div className="todo-list-container">
      {items.map((item) => (
        <div className="todo-container" key={item.id}>
          <input
            type="checkbox"
            name="check"
            id={item.id}
            data-visible="false"
            checked={item.checked}
            onChange={() => handleChange(item.id)}
          />
          <svg
            className="checkbox__image"
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="9"
          >
            <path
              fill="none"
              stroke="#FFF"
              stroke-width="2"
              d="M1 4.304L3.696 7l6-6"
            />
          </svg>
          <p id="input-task" className="todo-container__text">
            {item.item}
          </p>
          <button className="cross-icon"></button>
        </div>
      ))}
    </div>
  );
};

export default Content;