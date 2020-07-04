<template>
  <div class="sku_show_form">
    <div class="ssf_info">
      <div class="ssf_left">
        <img :src="imgUrl + meta.thumb" alt="" />
      </div>

      <div class="ssf_right">
        <h1>{{ meta.skuName }}</h1>
        <h2>{{ meta.brief }}</h2>
      </div>
    </div>
    <el-divider></el-divider>
    <div v-html="meta.description"></div>
  </div>
</template>

<script>
import { IMG_URL } from '@/config'

export default {
  props: {
    meta: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {}
  },

  computed: {
    imgUrl() {
      return IMG_URL
    },
  },
}
</script>

<style lang="scss">
.sku_show_form {
  width: 1200px;
  margin: 0 auto;
  .ssf_info {
    display: flex;
    .ssf_left {
      img {
        width: 300px;
        height: 300px;
        object-fit: contain;
      }
    }
    .ssf_right {
      h1 {
        font-weight: bold;
        font-size: 20px;
      }
      h2 {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
}
</style>
