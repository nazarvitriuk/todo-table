<template>
  <div class="row mt-5">
    <b-col cols="12" class="mb-3" v-if="error">
      <b-alert show variant="danger">{{ error }}</b-alert>
    </b-col>
    <b-col cols="6">
      <b-form class="mb-5">
        <b-form-input v-model="filter" type="text" placeholder="Enter todo title"></b-form-input>
      </b-form>
    </b-col>
    <b-col cols="6">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
      ></b-pagination>
    </b-col>
    <b-col cols="12">
      <b-table
        @filtered="onFilter"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filter"
        :filter-included-fields="filterBy"
        bordered
        striped
        hover
        :items="todos"></b-table>
    </b-col>
    <b-col cols="12" class="mb-3" v-if="!totalRows">
      <h5 class="text-center">Todos not found</h5>
    </b-col>
  </div>
</template>

<script>
import API from '../API/requests'

export default {
  name: "todosTable",
  data() {
    return {
      todos: [],
      filter: '',
      perPage: 25,
      totalRows: 1,
      currentPage: 1,
      filterBy: ['title'],
      error: null
    }
  },
  methods: {
    onFilter(items) {
      this.totalRows = items.length;
    },
    fetchTodos() { // fetching todos list

      API.getTodoList()
        .then(res => {
          if (!res.ok) { // handling error
            return Promise.reject(`Something went wrong! Status: ${ res.status }`)
          }

          return res.json();
        })
        .then(res => { // handling response
          this.todos = res;
          this.totalRows = res.length;
        })
        .catch(e => this.error = e) // catching error

    }
  },
  mounted() {
    this.fetchTodos();
  }
}
</script>

<style scoped>

</style>
