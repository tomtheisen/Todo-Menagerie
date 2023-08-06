import { For, type Component, createSignal, Show } from 'solid-js';

function makeItem(name: string) {
  return { name: name, done: false, editing: false, editingName: "" };
}

type TodoItem = ReturnType<typeof makeItem>;

let [items, setItems] = createSignal<TodoItem[]>([
  makeItem("Get some groceries"),
  makeItem("Feed the cat"),
  makeItem("Go solidly"),
]);

let [newItem, setNewItem] = createSignal("");

function remove(item: TodoItem) {
  setItems(items().filter(e => e !== item));
}

function edit(item: TodoItem) {
  setItems(items().map(e => e === item ? {...e, editing: true, editingName: e.name} : e));
}

function cancel(item: TodoItem) {
  setItems(items().map(e => e === item ? {...e, editing: false} : e));
}

function save(item: TodoItem) {
  setItems(items().map(e => e === item ? { ...e, name: e.editingName, editing: false } : e));
}

function toggle(item: TodoItem) {
  setItems(items().map(e => e === item ? {...e, done: !e.done } : e));
}

function add(ev: Event) {
  setItems(items().concat(makeItem(newItem())));
  setNewItem("");
  ev.preventDefault();
}

function sort() {
  const newItems = items().slice();
  newItems.sort((a, b) => Number(a.done) - Number(b.done));
  setItems(newItems);
}

const App: Component = () => {
  return <>
    <h1>To-do List</h1>
    <button onClick={ sort }>Sort by unfinished</button>
    <For each={ items() }>{(item, i) =>
      <li>
        <Show when={ !item.editing }>
          <button onClick={[remove, item]} title="Delete" class="small">❌</button>
          <button onClick={[edit, item]} title="Edit" class="small">✏️</button>
          <label>
            <input checked={item.done} onChange={[toggle, item]} type="checkbox" />
            <span class={item.done ? "done" : ""}>{ item.name }</span>
          </label>
        </Show>
        <Show when={ item.editing }>
          <input value={ item.editingName } onChange={ev => item.editingName = ev.target.value } />
          <button title="Apply" class="small" onClick={[save, item]}>✅</button>
          <button title="Cancel" class="small" onClick={[cancel, item]}>❌</button>
        </Show>
      </li>
    }</For>
  <form onSubmit={add}>
    <label>
      New item:
      <input value={ newItem() } onChange={ ev => setNewItem(ev.target.value) } />
    </label>
    <button>Add</button>
  </form>    
  </>;
};

export default App;
