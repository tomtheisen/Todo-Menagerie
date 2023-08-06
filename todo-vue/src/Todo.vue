<script lang="ts">
let id = 0;

function makeTodo(name: string) {
  return { name, done: false, editing: false, nameEditing: "", id: ++id };
}

type TodoItem = ReturnType<typeof makeTodo>;

export default {
  data() {
    return {
      items: [
        makeTodo("Get some groceries"),
        makeTodo("Feed the cat"),
        makeTodo("Write some vue stuff"),
      ],
      newName: "",
    }
  },
  methods: {
    remove(item: TodoItem) {
      const index = this.items.indexOf(item);
      this.items.splice(index, 1);
    },
    edit(item: TodoItem) {
      item.editing = true;
      item.nameEditing = item.name;
    },
    save(item: TodoItem) {
      item.editing = false;
      item.name = item.nameEditing;
    },
    addTodo() {
      this.items.push(makeTodo(this.newName));
      this.newName = "";
    },
    sort() {
      this.items.sort((a, b) => Number(a.done) - Number(b.done));
    },
  }
}
</script>

<template>
  <h1>To-do List</h1>
  <button @click="sort">Sort by unfinished</button>
  <ul>
    <li v-for="item in items" :key="item.id">
      <div>
        <div v-if="!item.editing">
          <button title="Delete" @click="remove(item)" class="small">❌</button>
          <button title="Edit" @click="edit(item)" class="small">✏️</button>
            <label>
                <input type="checkbox" v-model="item.done">
                <span :class="{ done: item.done }">{{ item.name }}</span>
            </label>
        </div>
        <div v-else>
          <input v-model="item.nameEditing">
          <button @click="save(item)" title="Apply" class="small">✅</button>
          <button @click="item.editing = false" title="Cancel" class="small">❌</button>
        </div>
      </div>
    </li>
  </ul>
  <form @submit.prevent="addTodo()">
    <label>New item:<input v-model="newName"></label>
    <button>Add</button>
  </form>
</template>
