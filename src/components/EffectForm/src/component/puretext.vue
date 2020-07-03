<template>
  <div>{{ value }}</div>
</template>

<script>
export default {
  name: 'MultipleInput',

  props: ['value'],

  data() {
    return {
      model: [],
    }
  },
}
</script>
