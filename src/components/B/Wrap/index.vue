<template>
  <el-input v-model="input" placeholder=""></el-input>
  <!-- <div @click="click"></div> -->
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
  },

  methods: {
    click() {
      this.$emit('kk')
    }
  }
}
</script>

<style></style>
