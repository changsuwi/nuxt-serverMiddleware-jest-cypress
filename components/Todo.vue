<template>
  <b-input-group>
    <b-form-input v-model="title" v-if="isEdit" name="todo-edit-title" />
    <span v-if="!isEdit">{{ oldTitle }}</span>
    <b-input-group-append>
      <b-button
        @click="editTodo(oldTitle, title)"
        variant="outline-secondary"
      >
        {{ editButtonName }}
      </b-button>

      <b-button
        @click="deleteTodo(title)"
        variant="outline-secondary"
      >
        刪除
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      oldTitle: this.title,
      isEdit: false,
      editButtonName: '編輯'
    }
  },
  methods: {
    editTodo (oldTitle, title) {
      if (this.isEdit) {
        this.isEdit = false
        this.editButtonName = '編輯'
        this.$emit('edit-todo', oldTitle, title)
        this.oldTitle = this.title
      } else {
        this.isEdit = true
        this.editButtonName = '確認'
      }
    },
    deleteTodo (title) {
      this.$emit('delete-todo', title)
    }
  }
}
</script>

<style>
span {
  flex: 1 1 0%;
}
</style>
