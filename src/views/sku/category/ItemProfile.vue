<template>
  <div>
    <el-card class="profile_top_card">
      <div v-for="(item, index) in shopData" :key="index">
        {{ '列表内容 ' + item }}
      </div>
    </el-card>
    <el-card class="profile_second_card">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Sku管理" name="sku"></el-tab-pane>
        <el-tab-pane label="用户管理" name="user"></el-tab-pane>
        <component :is="activeTab"></component>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { fetchShop } from '@/apis'

export default {
  name: 'ShopProfile',

  components: {
    sku: () => import('@/views/shop/sku/TableList'),
    user: () => import('@/views/shop/user/TableList'),
  },

  data() {
    return {
      activeTab: 'sku',
      shopData: {},
    }
  },

  mounted() {
    const { id } = this.$route.params
    fetchShop({ shopId: id }).then((data) => {
      this.shopData = data.result
    })
  },
}
</script>

<style></style>
