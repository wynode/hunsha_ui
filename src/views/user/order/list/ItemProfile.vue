<template>
  <div>
    <el-card class="profile_top_card">
      <div class="user_profile_top_info">
        <!-- <div v-for="(item, index) in addFields" :key="index">
          <span>{{ item.title }}：</span>
          <i v-if="item.name === 'receiveGoodsTime'">
            {{ dateFormat(orderData[item.name] * 1000) }}
          </i>
          <i v-else>{{ orderData[item.name] }}</i>
        </div> -->
        <ul>
          <li>
            <span>客户名称：</span>
            {{ orderData.customerName }}
          </li>
          <li>
            <span>客户手机号码：</span>
            {{ orderData.customerPhone }}
          </li>
          <li>
            <span>客户微信：</span>
            {{ orderData.customerWeiXin }}
          </li>
        </ul>

        <ul>
          <li>
            <span>客户资料备注：</span>
            {{ orderData.customerNote }}
          </li>
        </ul>
        <ul>
          <li>
            <span>收货方式：</span>
            {{ orderData.receiveGoodsType }}
          </li>
          <li>
            <span>收货地址：</span>
            {{ orderData.address }}
          </li>
        </ul>
        <ul>
          <li>
            <span>
              订单录入时间：
            </span>
            {{ dateFormat(orderData.addTime * 1000) }}
          </li>
          <li>
            <span>
              预期收货时间：
            </span>
            {{ dateFormat(orderData.receiveGoodsTime * 1000) }}
          </li>
        </ul>
        <ul>
          <li style="min-width: 100px">
            <span>订单价格统计：</span>
          </li>
          <li style="min-width: 150px">
            <span>租赁：</span>
            {{ orderData.rentTotalPrice / 100 || 0 }}元
          </li>
          <li style="min-width: 150px">
            <span>出售：</span>
            {{ orderData.saleTotalPrice / 100 || 0 }}元
          </li>
          <li style="min-width: 150px">
            <span>
              定制：
            </span>
            {{ orderData.customizeTotalPrice / 100 || 0 }}元
          </li>
          <li style="min-width: 150px">
            <span>合计</span>
            {{ orderData.totalPrice / 100 }}元
          </li>
        </ul>
        <ul>
          <li>
            <span>备注：</span>
            {{ orderData.note }}
          </li>
        </ul>
      </div>
    </el-card>
    <el-card class="profile_second_card">
      <el-tabs v-model="activeTab" class="profile_second_tabs">
        <el-tab-pane label="店铺服装订单管理" name="sku"></el-tab-pane>
        <component :is="activeTab"></component>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/dateFormat'
import { fetchShopOrder } from '@/apis'
import { addFields } from './formConfig'

export default {
  name: 'ShopProfile',

  components: {
    sku: () => import('@/views/user/order/sku/TableList'),
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
    fetchShopOrder({ orderId: id }).then((data) => {
      this.orderData = data.result
    })
  },
}
</script>

<style lang="scss">
.user_profile_top_info {
  padding: 10px 0;
  margin-top: -6px;
  ul {
    color: #333;
    display: flex;
    span {
      color: #999;
      font-size: 14px;
    }
    li {
      margin-top: 6px;
      min-width: 240px;
      margin-right: 40px;
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
