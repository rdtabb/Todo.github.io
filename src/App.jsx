import { useState, useEffect } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import AddTodo from "./components/AddTodo";

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("todolist")) || []);
  const [newItems, setNewItems] = useState("")

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items))
  }, [items])

  const setAndSaveItems = (newItems) => {
    setItems(newItems)
  }

  const addNewItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const newItem = {
      id,
      item,
      checked: false,
    }
    const listItems = [...items, newItem]
    setAndSaveItems(listItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItems) return
    addNewItem(newItems)
    setNewItems("")
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => 
      item.id !== id
    )
    setAndSaveItems(listItems)
  }

  const handleChange = (id) => {
    const changedItem = document.getElementById(`${id}`)
    const visibility = changedItem.getAttribute('data-visible')
    visibility == "true" ? changedItem.setAttribute('data-visible', 'false') : changedItem.setAttribute('data-visible', 'true')
    const listItems = items.map((item) =>
      item.id == id ? { ...item, checked: !item.checked } : item
    );
    setAndSaveItems(listItems)
  };

  const allChildren = document.querySelectorAll('[data-visible]')

  const handleShowActiveFilter = () => {
    const checked = document.querySelectorAll('[data-visible=false]')
    allChildren.forEach(child => {
      child.classList.remove('removed')
    })
    checked.forEach(check => {
      check.classList.add('removed')
    })
  }

  const handleShowAllFilter = () => {
    allChildren.forEach(child => {
      child.classList.remove('removed')
    })
  }

  const handleShowInactiveFilter = () => {
    const unchecked = document.querySelectorAll('[data-visible=true]')
    allChildren.forEach(child => {
      child.classList.remove('removed')
    })
    unchecked.forEach(unch => {
      unch.classList.add('removed')
    })
  }

  const handleClick = () => {
    const listItems = items.filter((item) => 
      item.checked == false
    )
    setAndSaveItems(listItems)
  }

  const handleLightTheme = () => {
    const bodyDocument = document.querySelector('body')
    bodyDocument.classList.add('light')
    localStorage.setItem("darkMode", "disabled")
  }

  const handleDarkTheme = () => {
    const bodyDocument = document.querySelector('body')
    bodyDocument.classList.remove('light')
    localStorage.setItem("darkMode", "enabled")
  }

  const theme = localStorage.getItem("darkMode")
  if (theme == "enabled" || theme == null) {
    handleLightTheme()
  } else {
    handleDarkTheme()
  }

  const handleTheme = () => {
    const theme = localStorage.getItem("darkMode")
    if (theme == "enabled" || theme == null) {
      handleLightTheme()
    } else {
      handleDarkTheme()
    }
  }

  return (
    <div className="main-container">
      <Header
        handleTheme={handleTheme}
      />
      <AddTodo 
        newItems={newItems} 
        setNewItems={setNewItems} 
        handleSubmit={handleSubmit} 
      />
      <Content 
        handleClick={handleClick} 
        items={items} 
        setItems={setItems} 
        handleChange={handleChange} 
        handleDelete={handleDelete}
        handleShowActiveFilter={handleShowActiveFilter}
        handleShowAllFilter={handleShowAllFilter}
        handleShowInactiveFilter={handleShowInactiveFilter}
      />
    </div>
  );
}

export default App;
