<template>
  <el-input v-enter-number type="number" v-model="model"></el-input>
</template>

<script>
export default {
  name: 'MultipleInput',

  props: ['value'],

  data() {
    return {
      model: '',
    }
  },

  watch: {
    model: {
      deep: true,
      handler(newValue) {
        this.$emit('input', newValue)
      },
    },

    value() {
      this.model = this.value || ''
    },
  },

  mounted() {
    this.model = this.value || ''
  },
}
</script>
