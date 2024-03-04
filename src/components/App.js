import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {

  const[items, setIems] = useState([]);

  function handleAddItems(item) {
    setIems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    console.log(id);
    setIems(items => items.filter(item=>item.id !== id))
  }

  function handleToggleItem(id) {
    setIems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item ));
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure that you want delete all items?");

    if(confirmed) setIems([]);
  }

  return (
  <div className="app">
    <Logo />
    <Form onAddItems={handleAddItems}/>
    <PackingList  items={items} onDeleteItem={handleDeleteItems} onToggleItem={handleToggleItem} onClearList={handleClearList}/>
    <Stats items={items}/>
  </div>
  );
}