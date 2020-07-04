<template>
  <div>
    <el-card class="profile_top_card">
      <div class="profile_top_info">
        <div v-for="(item, index) in addFields" :key="index">
          <span>{{ item.title }}：</span>
          <i v-if="item.name === 'receiveGoodsTime'">
            {{ dateFormat(orderData[item.name] * 1000) }}
          </i>
          <i v-else>{{ orderData[item.name] }}</i>
        </div>
      </div>
    </el-card>
    <el-card class="profile_second_card">
      <el-tabs v-model="activeTab" class="profile_second_tabs">
        <el-tab-pane label="订单Sku" name="sku"></el-tab-pane>
        <component :is="activeTab"></component>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/dateFormat'
import { fetchAdminShopOrder } from '@/apis'
import { addFields } from './formConfig'

export default {
  name: 'ShopProfile',

  components: {
    sku: () => import('@/views/admin/order/sku/TableList'),
  },

  data() {
    return {
      activeTab: 'sku',
      orderData: {},
    }
  },

  computed: {
    addFields() {
      return addFields(this)
    },
  },

  methods: {
    dateFormat(date) {
      return dateFormat(date)
    },
  },

  mounted() {
    const { id } = this.$route.params
    fetchAdminShopOrder({ orderId: id }).then((data) => {
      this.orderData = data.result
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
