<template>
  <el-input v-model="input" placeholder=""></el-input>
</template>

<script>
export default {
  name: 'OInput',

  global: true,

  props: {
    width: {
      type: String,
      default: '100px'
    }
  },

  data() {
    return {
      input: ''
    }
  }
}
</script>

<style></style>
