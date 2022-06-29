<template>
  <div class="container">
    <todos-table></todos-table>
  </div>
</template>

<script>
import TodosTable from "../components/todoTable";
export default {
  name: 'IndexPage',
  components: {TodosTable}
}
</script>
