const ListItem = ({ item, handleChange, handleDelete, uniqueId }) => {
    return (
        <div id={item.id} data-visible="true" className="todo-container" key={uniqueId}>
          <input
            type="checkbox"
            name="check"
            id={item.id}
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
              strokeWidth="2"
              d="M1 4.304L3.696 7l6-6"
            />
          </svg>
          <p 
            id="input-task" 
            className="todo-container__text"
            style={(item.checked) ? {
              textDecoration: "line-through",
              opacity: "0.8"
            } : null}
          >
            {item.item}
          </p>
          <button
           className="cross-icon"
           onClick={() => handleDelete(item.id)}
          ></button>
        </div>
    )
}

export default ListItem;