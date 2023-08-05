let id = 0;

function makeItem(name) {
    return { name, done: false, editing: false, editingName: "", id: ++id };
}

document.addEventListener('alpine:init', () => {
    Alpine.data('todoList', () => (
        {
            items: [
                makeItem("Get some groceries"),
                makeItem("Feed the cat"),
                makeItem("Write some alpine stuff"),
            ],
            toAdd: "",
            add() {
                this.items.push(makeItem(this.toAdd));
                this.toAdd = "";
            },
            edit(item) {
                item.editingName = item.name;
                item.editing = true;
            },
            save(item) {
                item.name = item.editingName;
                item.editing = false;
            },
            remove(item) {
                console.log("called delete");
                let idx = this.items.indexOf(item);
                this.items.splice(idx, 1);
            },
            cancel(item) {
                item.editing = false;
            },
            sort() {
                this.items.sort((a, b) => Number(a.done) - Number(b.done));
            },
        }
    ));
});
