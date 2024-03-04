import { useState } from "react";

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

function Logo(){
  return <h1>😘 🌴 Far Away 🌴 😘</h1>
}

function Form( { onAddItems }){

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(10);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: 
    false, id: Date.now()
    };

    onAddItems (newItem);

    setDescription("");
    setQuantity(1);

  }

  return ( 
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😒 trip?</h3>
      <select value={quantity} onChange={e => setQuantity(e.target.value)}>
        {Array.from({length: 20}, (_, i) => i  + 1)
        .map(num=>
        <option value={num} key={num}>
          {num}
        </option>)}
      </select>
      <input type='text' placeholder="Item.."  value={description} onChange={(e)=> {
        //console.log(e.target.value); 
        setDescription(e.target.value)}}/>
      <button>Add</button>
    </form>
  );
}

function PackingList({items, onDeleteItem, onToggleItem, onClearList}){

  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if(sortBy === 'input') sortedItems = items;

  if(sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if(sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div  className="list">
      <ul>
        {sortedItems.map(item => <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id}/>)}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={e=> setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option vlaue="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
    );
}

function Item({item, onDeleteItem, onToggleItem}) {
  return <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
        {item.description} {item.quantity} 
      </span>
      <button onClick={ () => onDeleteItem(item.id) }>❎</button> 
    </li>
}

function Stats({items}){
  if(!items.length) return <p className="stats">
      <em>Start adding some items in your packed list
      </em>
    </p>

  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const percentage =  Math.round(numPacked / numItems * 100);

  return (
    <footer className="stats"> <em> {percentage === 100 ? 'You got everything' : `🛄🛅🛅 You have ${numItems} items on your list, and you already packed ${" "} {numPacked} (${percentage}%)` }</em> </footer>
  );
}