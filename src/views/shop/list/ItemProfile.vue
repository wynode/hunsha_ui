<template>
  <div>
    <el-card class="profile_top_card">
      <div class="profile_top_info">
        <div v-for="(item, index) in addFields" :key="index">
          <span>{{ item.title }}:</span>
          {{ shopData[item.name] }}
        </div>
      </div>
    </el-card>
    <el-card class="profile_second_card">
      <el-tabs v-model="activeTab" class="profile_second_tabs">
        <el-tab-pane label="Sku管理" name="sku"></el-tab-pane>
        <el-tab-pane label="用户管理" name="user"></el-tab-pane>
        <component :is="activeTab"></component>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { fetchShop } from '@/apis'
import { addFields } from './formConfig'

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

  computed: {
    addFields() {
      return addFields(this)
    },
  },

  mounted() {
    const { id } = this.$route.params
    fetchShop({ shopId: id }).then((data) => {
      this.shopData = data.result
    })
  },
}
</script>

<style lang="scss">
.profile_top_info {
  display: flex;
  flex-wrap: wrap;
  margin-left: -60px;
  margin-top: -10px;
  padding: 15px 0;
  div {
    margin-top: 10px;
    margin-left: 60px;
    color: #333;
    span {
      color: #999;
      font-size: 14px;
    }
  }
}
.profile_second_card {
  margin-top: 15px;
  .el-card {
    border: none;
  }
  .profile_second_tabs {
    .el-card__body {
      margin-left: -15px;
      margin-right: -15px;
    }
  }
}
</style>
