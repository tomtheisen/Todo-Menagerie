<script lang="ts">
  let id = 0;
  let newName = "";

  function makeItem(name) {
    return { name, done: false, editing: false, editingName: "", id: ++id };
  }

  type TodoItem = ReturnType<typeof makeItem>;

  function remove(item: TodoItem) {
    items = items.filter(e => e !== item);
  }

  function edit(item: TodoItem) {
    item.editingName = item.name;
    item.editing = true;
    items ??= []; // force re-render.  this is probably not the right way?
  }

  function save(item: TodoItem) {
    item.name = item.editingName;
    item.editing = false;
    items ??= []; // force re-render.  this is probably not the right way?
  }

  function cancel(item: TodoItem) {
    item.editing = false;
    items ??= []; // force re-render.  this is probably not the right way?
  }

  function add() {
    items.push(makeItem(newName));
    newName = "";
    items ??= []; // in this case i think it is the right way, since I used `push`, not `=`
  }

  function sort() {
    items.sort((a, b) => Number(a.done) - Number(b.done));
    items ??= [];
  }

  let items = [
    makeItem("Get some groceries"),
    makeItem("Feed the cat"),
    makeItem("Marvel at the svelte-iverse"),
  ];

</script>

<main>
  <h1>To-do List</h1>
  <button on:click={sort}>Sort by unfinished</button>
  <ul>
    {#each items as item}
      {#if item.editing}
        <li>
          <input bind:value={item.editingName}>
          <button title="Apply" class="small" on:click={ev => save(item)}>✅</button>
          <button title="Cancel" class="small" on:click={ev => cancel(item)}>❌</button>
        </li>
      {:else}
        <li>
          <button title="Delete" class="small" on:click={() => remove(item)}>❌</button>
          <button title="Edit" class="small" on:click={() => edit(item)}>✏️</button>
          <label><input type="checkbox" bind:checked={ item.done }>
            <span class="{ item.done && 'done' }">{ item.name }</span>
          </label>
        </li>
      {/if}
    {/each}
  </ul>
  <form>
    <label>New item:<input bind:value={newName}></label>
    <button on:click|preventDefault={add}>Add</button>
  </form>
</main>
