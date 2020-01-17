<template>
  <div class="todo-container">
    <b-container>
      <b-row class="todo-input">
        <b-col>
          <b-input-group>
            <b-form-input v-model="title" name="todo-title" />
            <b-input-group-append>
              <b-button @click="createTodo" variant="outline-secondary">
                新增
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row v-for="todo in todoList" v-bind:key="todo.title" class="todo-list">
        <b-col>
          <Todo
            :title="todo['title']"
            @edit-todo="editTodo"
            @delete-todo="deleteTodo"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
import Todo from '~/components/Todo.vue'

export default {
  components: {
    Todo
  },
  data () {
    return {
      // todoList: ["abc", "bcd", "cde"],
      title: ''
    }
  },
  asyncData () {
    return axios.get('http://localhost:3000/api')
      .then((res) => {
        return { todoList: res.data }
      })
  },
  methods: {
    makeToast (variant, title, content) {
      this.$bvToast.toast(content, {
        title,
        variant,
        solid: true
      })
    },
    createTodo () {
      const reqBody = {
        'title': this.title
      }
      axios.post('http://localhost:3000/api', reqBody)
        .then((response) => {
          console.log(response.status)
          if (response.status === 200) {
            location.reload()
          }
        })
        .catch((error) => {
          console.log(error.response)
          if (error.response.status === 400) {
            this.makeToast('danger', '不合法的輸入', '輸入為空白或是重複的項目')
          }
        })

      // this.todoList.push(this.title)
      // this.title = ""
      // console.log(this.todoList)
    },
    editTodo (oldTitle, newTitle) {
      const index = this.todoList.indexOf(oldTitle)
      this.todoList[index] = newTitle
    },
    deleteTodo (title) {
      this.todoList.splice(this.todoList.indexOf(title), 1)
      console.log(this.todoList)
    }
  }
}
</script>

<style>

.todo-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-list {
  margin-block-end: 1em;
}

.todo-input {
  height: 10vh;
}

</style>
