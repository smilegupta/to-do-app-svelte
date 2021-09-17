<script>
  import { onMount } from "svelte";
  import { v4 as uuidv4 } from "uuid";
  import { items } from "../stores";
  import TodoApi from "../TodoApi";
  import Item from "../components/Item.svelte";
  import NewItem from "../components/NewItem.svelte";

  function handleNewItem({ detail: text }) {
    $items = [
      {
        id: uuidv4(),
        text,
        completed: false,
      },
      ...$items,
    ];
    TodoApi.save($items);
  }

  function handleUpdate({ detail }) {
    const index = $items.findIndex((item) => item.id === detail.id);
    $items[index] = detail;
    TodoApi.save($items);
  }

  function handleDelete({ detail }) {
    $items = $items.filter((item) => item.id !== detail);
    TodoApi.save($items);
  }

  let itemsSorted = [];
  $: {
    itemsSorted = [...$items];
    itemsSorted.sort((a, b) => {
      if (a.completed && b.completed) return 0;
      if (a.completed) return 1;
      if (b.completed) return -1;
    });
  }

  onMount(async () => {
    $items = await TodoApi.getAll();
    console.log($items);
  });
</script>

<div class="list">
  <NewItem on:newitem={handleNewItem} />
  {#each itemsSorted as item (item)}
    <Item {...item} on:update={handleUpdate} on:delete={handleDelete} />
  {:else}
    <p class="list-status">No Items Exist</p>
  {/each}
</div>

<style>
  .list {
    padding: 15px;
  }

  .list-status {
    margin: 0;
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 1.1em;
  }
</style>
