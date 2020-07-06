<template>
  <div class="sku_show_form">
    <div class="ssf_info">
      <div class="ssf_left">
        <img :src="imgUrl + meta.thumb" alt="" />
      </div>

      <div class="ssf_right">
        <h1>{{ meta.skuName }}</h1>
        <h2>服装编号：{{ meta.skuCode }}</h2>
        <h3>商品价格：</h3>
        <div class="ssf_table">
          <ul>
            <li>商品价格</li>
            <li>租赁</li>
            <li>出售</li>
            <li>定制</li>
          </ul>
          <!-- <ul>
            <li>进货成本价</li>
            <li>{{ meta.rentCostPrice }}元</li>
            <li>{{ meta.costPrice }}元</li>
            <li>{{ meta.customizeCostPrice }}元</li>
          </ul> -->
          <ul>
            <li>店铺价</li>
            <li>{{ meta.shopRentPrice }}元</li>
            <li>{{ meta.shopSalePrice }}元</li>
            <li>{{ meta.shopCustomizePrice }}元</li>
          </ul>
        </div>
        <div class="ssf_kucun">
          <i>库存：</i>
          <span>{{ meta.skuNum }}件</span>
        </div>
        <div class="ssf_gobtn" @click="addOrder">立即下单</div>
      </div>
    </div>
    <div class="ssf_content">
      <div class="ssfc_h">
        <h1>商品详情</h1>
      </div>
      <div class="ssfc_brief">
        <p>
          商品简介：
          {{ meta.brief }}
        </p>
        <p class="Mt10">
          面料备注：
          {{ meta.otherNote }}
        </p>
      </div>

      <div class="ssfc_html">
        <div class="ssfc_divi"></div>
        <div v-html="meta.description"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { IMG_URL } from '@/config'
import { postShopOrder, postShopOrderSku } from '@/apis'
import EditOrderSkuForm from './EditOrderSkuForm'
import EditOrderForm from './EditOrderForm'

export default {
  props: {
    meta: {
      type: Object,
      default: () => {},
    },
    orderId: {
      type: [String, Number],
      default: '',
    },
  },

  data() {
    return {
      orderIdq: '',
    }
  },

  computed: {
    imgUrl() {
      return IMG_URL
    },
  },

  methods: {
    addOrder() {
      if (!this.orderId) {
        this.$createDialog(
          {
            title: '新增店铺订单',
            width: '600px',
            onSubmit: async (instance, slotRef) => {
              if (slotRef.$refs.effectForm) {
                const { effectForm } = slotRef.$refs
                if (await effectForm.useValidator()) {
                  const form = effectForm.getForm()
                  const data = await postShopOrder(form)
                  const orderId = data.result.orderId
                  this.orderIdq = orderId
                  this.$notify.success('新增订单成功')
                  instance.close()
                  this.addOrderSku(orderId)
                }
              }
            },
          },
          () => <EditOrderForm />
        ).show()
      } else {
        this.orderIdq = this.orderId
        this.addOrderSku(this.orderId)
      }
    },

    addOrderSku(orderId) {
      this.$createDialog(
        {
          title: '录入新sku订单',
          width: '860px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                const form = slotRef.$refs.effectForm.getForm()
                if (form.dealType !== 2) {
                  form.rentNum = 0
                  form.rentDepositNum = 0
                }
                Object.keys(form).forEach((item) => {
                  if (!form[item]) {
                    form[item] = ''
                  }
                })
                await postShopOrderSku({
                  orderId: orderId,
                  ...form,
                })
                this.$notify.success('新增服装订单成功')
                // this.$router.push({
                //   name: 'orderProfile',
                //   params: {
                //     id: orderId,
                //   },
                // })
                window.location.href = `/user/order/${orderId}`
                instance.close()
              }
            }
          },
        },
        () => <EditOrderSkuForm skuId={this.meta.skuId} />
      ).show()
    },
  },
}
</script>

<style lang="scss">
.sku_show_form {
  width: 980px;
  margin: 0 auto;
  .ssf_table {
    width: 501px;
    ul {
      display: flex;
      border: 1px solid #e5e5e5;
      &:first-child {
        background: #f6f6f6;
        border-bottom: none;
      }
      &:last-child {
        border-top: none;
      }
      li {
        text-align: center;
        border-right: 1px solid #e5e5e5;
        width: 125px;
        height: 30px;
        line-height: 30px;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
  .ssf_info {
    display: flex;
    .ssf_left {
      img {
        width: 350px;
        height: 350px;
        object-fit: contain;
      }
    }
    .ssf_right {
      width: 596px;
      margin-left: 32px;
      h1 {
        font-size: 18px;
        font-family: PingFang;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
        line-height: 28px;
      }
      h2 {
        font-size: 14px;
        font-family: PingFang;
        font-weight: bold;
        color: rgba(229, 57, 60, 1);
        line-height: 28px;
      }
      h3 {
        font-size: 14px;
        font-family: PingFang;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 28px;
        margin-top: 8px;
        margin-bottom: 2px;
      }
    }
    .ssf_gobtn {
      width: 142px;
      height: 46px;
      background: rgba(223, 48, 51, 1);
      font-size: 18px;
      font-family: PingFang;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 46px;
      margin-top: 24px;
      text-align: center;
      cursor: pointer;
      &:hover {
        opacity: 0.9;
      }
    }
  }
  .ssf_kucun {
    font-size: 14px;
    font-family: PingFang;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    line-height: 28px;
    margin-top: 8px;
    margin-bottom: 2px;
  }
  .ssf_content {
    height: 38px;
    background: rgba(247, 247, 247, 1);
    border-bottom: 1px solid #e4393c;
    margin-top: 100px;

    .ssfc_h {
      width: 107px;
      height: 39px;
      background: rgba(228, 57, 60, 1);
      font-size: 14px;
      font-family: PingFang;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 39px;
      text-align: center;
    }
    .ssfc_brief {
      margin: 0 auto;
      margin-top: 16px;
      width: 969px;
      line-height: 20px;
      font-size: 14px;
      font-family: PingFang;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
    }
    .ssfc_html {
      margin: 0 auto;
      width: 969px;
      margin-top: 16px;
      // background: #f1f1f1;
      padding: 10px 24px;
      margin-bottom: 40px;
      // p {
      //   background: #f1f1f1 !important;
      // }
      // h1 {
      //   background: #f1f1f1 !important;
      // }
      // h2 {
      //   background: #f1f1f1 !important;
      // }
      // h3 {
      //   background: #f1f1f1 !important;
      // }
      // h4 {
      //   background: #f1f1f1 !important;
      // }
    }
    .ssfc_divi {
      height: 1px;
      margin-bottom: 24px;
      background: #979797;
    }
  }
}
.is-fullscreen {
  .el-dialog__close {
    font-size: 40px;
  }
}
</style>
