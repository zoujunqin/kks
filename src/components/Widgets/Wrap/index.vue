<template>
  <el-input v-model="input" placeholder=""></el-input>
  <!-- <div @click="click"></div> -->
</template>

<script>
export default {
  name: 'Wrap',

  props: {
    options: Object
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
