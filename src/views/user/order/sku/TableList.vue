<template>
  <div>
    <el-button size="small" type="primary" class="Mb20 Mr20" @click="addItem">
      录入新sku订单
    </el-button>
    <div class="user_order_sku_profile Mt15">
      <el-card v-for="sku in tableList" :key="sku.orderSkuId">
        <div class="table_sku">
          <div class="ts_item">
            <span>订单sku编号：{{ sku.orderInfo.orderNumber }}</span>
          </div>
          <div class="order_sku_tupian ts_item">
            <!-- <img :src="imgUrl + sku.thumb" alt="" /> -->
            <el-popover trigger="hover" placement="right">
              <img
                style="max-width: 500px; max-height: 600px"
                :src="imgUrl + sku.thumb"
                alt=""
              />
              <p slot="reference">
                <img :src="imgUrl + sku.thumb" alt="" />
              </p>
            </el-popover>
            <div class="ost_right">
              <div>
                <span>分类：{{ sku.categoryInfo.categoryName }}</span>
                <span>
                  性别：{{ sku.categoryInfo.gender == 1 ? '男' : '女' }}
                </span>
              </div>
              <div>
                <span>sku名称：{{ sku.skuName }}</span>
              </div>
              <div class="ost_right_1">
                <span>sku编号：{{ sku.skuCode }}</span>
              </div>
            </div>
          </div>
          <div class="ts_item">
            <span>订单类型：{{ sku.dealType | translate('dealType') }}</span>
            <template v-if="sku.dealType == 2">
              <span>租赁周期：{{ sku.rentNum }}天</span>
              <span>租赁押金：{{ sku.rentDepositNum }}元</span>
            </template>
          </div>
          <div class="ts_item">
            <span>
              客户身高：{{
                sku.customerHeight ? `${sku.customerHeight}cm` : '无'
              }}
            </span>
            <span>
              客户体重：{{
                sku.customerWeight ? `${sku.customerWeight}kg` : '无'
              }}
            </span>
          </div>
          <div class="ts_item">
            <span>
              衣长：{{ sku.clothesLength ? `${sku.clothesLength}cm` : '无' }}
            </span>
            <span>
              袖长：{{ sku.sleeveLength ? `${sku.sleeveLength}cm` : '无' }}
            </span>
            <span>
              肩宽：{{ sku.shoulderWidth ? `${sku.shoulderWidth}cm` : '无' }}
            </span>
            <span>胸围：{{ sku.bust ? `${sku.bust}cm` : '无' }}</span>
          </div>
          <div class="ts_item">
            <span>
              中腰：{{ sku.middleWaisted ? `${sku.middleWaisted}cm` : '无' }}
            </span>
            <span>下摆：{{ sku.hem ? `${sku.hem}cm` : '无' }}</span>
            <span>马甲：{{ sku.vest ? `${sku.vest}cm` : '无' }}</span>
            <span>
              裤长：{{ sku.trousersLength ? `${sku.trousersLength}cm` : '无' }}
            </span>
          </div>
          <div class="ts_item">
            <span>腰围：{{ sku.waistLine ? `${sku.waistLine}cm` : '无' }}</span>
            <span>臀围：{{ sku.hipLine ? `${sku.hipLine}cm` : '无' }}</span>
            <span>
              大腿：{{ sku.thighLength ? `${sku.thighLength}cm` : '无' }}
            </span>
            <span>
              小腿：{{ sku.shankLength ? `${sku.shankLength}cm` : '无' }}
            </span>
          </div>
          <div class="ts_item">
            <span>订单状态：{{ getStatus(sku.status, sku.dealType) }}</span>
            <span>下单时间：{{ dateFormat(sku.addTime * 1000) }}</span>
          </div>
          <div class="ts_item">
            <span>单价：{{ sku.price }}元</span>
            <span>数量：{{ sku.skuName }}件</span>
          </div>
          <div class="ts_item">
            <span>备注：{{ sku.note }}</span>
          </div>
        </div>
        <ul class="card_btn">
          <template v-if="sku.dealType == 1">
            <el-button
              v-if="sku.status === 0"
              size="small"
              type="primary"
              @click="modifySaleStatus(1, sku)"
            >
              发货
            </el-button>
            <el-button
              v-if="sku.status === 1"
              size="small"
              type="primary"
              @click="modifySaleStatus(10, sku)"
            >
              客户确认收货
            </el-button>
          </template>
          <template v-if="sku.dealType == 2">
            <el-button
              v-if="sku.status === 0"
              size="small"
              type="primary"
              @click="modifyRentStatus(1, sku)"
            >
              发货
            </el-button>
            <el-button
              v-if="sku.status === 1"
              size="small"
              type="primary"
              @click="modifyRentStatus(2, sku)"
            >
              客户确认收货
            </el-button>
            <el-button
              v-if="sku.status === 2"
              size="small"
              type="primary"
              @click="modifyRentStatus(10, sku)"
            >
              客户归还商品
            </el-button>
          </template>
          <template v-if="sku.dealType == 3">
            <el-button
              v-if="sku.status === 0"
              size="small"
              type="primary"
              @click="modifyCustomStatus(1, sku)"
            >
              定制完成
            </el-button>
            <el-button
              v-if="sku.status === 1"
              size="small"
              type="primary"
              @click="modifyCustomStatus(2, sku)"
            >
              发货
            </el-button>
            <el-button
              v-if="sku.status === 1"
              size="small"
              type="primary"
              @click="modifyCustomStatus(10, sku)"
            >
              客户确认收货
            </el-button>
          </template>
          <el-button
            size="small"
            type="primary"
            @click="modifyItem(sku)"
            class="Mt20"
          >
            修改订单sku
          </el-button>
        </ul>
      </el-card>
    </div>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table'
import {
  fetchShopOrderSkuList,
  // fetchShopOrderSku,
  postShopOrderSku,
  patchShopOrderSku,
  deleteShopOrderSku,
  // patchOrderSkuStatus,
  updateCustomerStatus,
  updateSaleStatus,
  updateRentStatus,
} from '@/apis'
import { IMG_URL } from '@/config'
import { getStatus } from '@/utils/common'
import { dateFormat } from '@/utils/dateFormat'
import EditForm from './EditForm'
import FaHuo from './FaHuo'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
})

export default {
  name: 'orderList',

  mixins: [table],

  data() {
    return {}
  },

  computed: {
    fetchTableListMethod() {
      return fetchShopOrderSkuList
    },

    imgUrl() {
      return IMG_URL
    },
  },

  methods: {
    getStatus(value, type) {
      return getStatus(value, type)
    },
    dateFormat(value) {
      return dateFormat(value)
    },
    modifySaleStatus(status, row) {
      if (status === 1) {
        this.$createDialog(
          {
            title: '出售订单发货',
            width: '600px',
            onSubmit: async (instance, slotRef) => {
              if (slotRef.$refs.effectForm) {
                const { effectForm } = slotRef.$refs
                if (await effectForm.useValidator()) {
                  const form = slotRef.$refs.effectForm.getForm()
                  await updateSaleStatus({
                    orderSkuId: row.orderSkuId,
                    status,
                    ...form,
                  })
                  this.fetchTableList(this.filtersCache)
                  this.$notify.success('发货成功')
                  instance.close()
                }
              }
            },
          },
          () => <FaHuo />
        ).show()
      } else {
        updateCustomerStatus({ status }).then(() => {
          this.$message.success('修改订单状态成功')
        })
      }
    },
    modifyRentStatus(status, row) {
      if (status === 1) {
        this.$createDialog(
          {
            title: '租赁订单发货',
            width: '600px',
            onSubmit: async (instance, slotRef) => {
              if (slotRef.$refs.effectForm) {
                const { effectForm } = slotRef.$refs
                if (await effectForm.useValidator()) {
                  const form = slotRef.$refs.effectForm.getForm()
                  await updateRentStatus({
                    orderSkuId: row.orderSkuId,
                    status,
                    ...form,
                  })
                  this.fetchTableList(this.filtersCache)
                  this.$notify.success('发货成功')
                  instance.close()
                }
              }
            },
          },
          () => <FaHuo />
        ).show()
      } else {
        updateCustomerStatus({ status }).then(() => {
          this.$message.success('修改订单状态成功')
        })
      }
    },
    modifyCustomStatus(status, row) {
      if (status === 2) {
        this.$createDialog(
          {
            title: '定制订单发货',
            width: '600px',
            onSubmit: async (instance, slotRef) => {
              if (slotRef.$refs.effectForm) {
                const { effectForm } = slotRef.$refs
                if (await effectForm.useValidator()) {
                  const form = slotRef.$refs.effectForm.getForm()
                  await postShopOrderSku({
                    orderSkuId: row.orderSkuId,
                    status,
                    ...form,
                  })
                  this.fetchTableList(this.filtersCache)
                  this.$notify.success('发货成功')
                  instance.close()
                }
              }
            },
          },
          () => <FaHuo />
        ).show()
      } else {
        updateCustomerStatus({ status }).then(() => {
          this.$message.success('修改订单状态成功')
        })
      }
    },
    addItem() {
      this.$router.push({
        name: 'userShopSkuList',
        query: {
          orderId: this.$route.params.id,
        },
      })
      // this.$createDialog(
      //   {
      //     title: '录入新sku订单',
      //     width: '600px',
      //     onSubmit: async (instance, slotRef) => {
      //       if (slotRef.$refs.effectForm) {
      //         const { effectForm } = slotRef.$refs
      //         if (await effectForm.useValidator()) {
      //           const form = slotRef.$refs.effectForm.getForm()
      //           if (form.dealType !== 2) {
      //             form.rentNum = 0
      //             form.rentDepositNum = 0
      //           }
      //           await postShopOrderSku({
      //             orderId: this.$route.params.id,
      //             ...form,
      //           })
      //           this.fetchTableList(this.filtersCache)
      //           this.$notify.success('新增成功')
      //           instance.close()
      //         }
      //       }
      //     },
      //   },
      //   () => <EditForm />
      // ).show()
    },

    modifyItem(row) {
      this.$createDialog(
        {
          title: '更新订单Sku',
          width: '600px',
          validate: false,
          onSubmit: async (instance, slotRef) => {
            const form = slotRef.$refs.effectForm.getForm()
            if (form.dealType !== 2) {
              form.rentNum = 0
              form.rentDepositNum = 0
            }
            await patchShopOrderSku({
              orderSkuId: row.orderSkuId,
              ...form,
            })
            this.fetchTableList(this.filtersCache)
            this.$notify.success('修改成功')
            instance.close()
          },
        },
        () => <EditForm meta={row} />
      ).show()
    },

    async deleteItem(row) {
      const ifDel = await this.$confirm('请确认此删除操作, 是否继续?', '提示', {
        type: 'warning',
      }).catch(() => {
        this.$notify.info('操作取消')
        return false
      })

      if (ifDel) {
        await deleteShopOrderSku({ orderSkuId: row.orderSkuId })
        this.$notify.success('删除成功')
        this.fetchTableList(this.filtersCache)
      }
    },
  },

  mounted() {
    const { id } = this.$route.params
    this.fetchTableList({ orderId: id })
  },
}
</script>
<style lang="scss">
.user_order_sku_profile {
  .table_sku {
    width: 1000px;
    margin: 0 auto;

    div {
      min-height: 40px;
      line-height: 40px;
      border-bottom: 1px solid rgba(220, 220, 220, 0.4);
    }
    span {
      margin-right: 40px;
      margin-left: 15px;
      display: inline-block;
      min-width: 160px;
    }
    div:first-child {
      span {
        font-weight: bold;
      }
    }
    div:nth-child(2n) {
      background: #f5f5f5;
      // background-image: linear-gradient(to right, #fff, #f5f5f5, #f5f5f5, #fff);
    }
  }
  .el-popover__reference {
    background: #fff;
  }
  .order_sku_tupian {
    display: flex;
    span {
      min-width: 120px;
      margin-right: 0;
    }
    img {
      margin-top: 1px;
      width: 123px;
      margin-left: -15px;
      height: 123px;
      object-fit: contain;
      background: #fff;
    }
    .ost_right {
      width: 100%;
      border-bottom: 0;
      div {
        span {
          font-weight: normal;
        }
      }
      div:nth-child(2n) {
        background: #fff;
      }
      .ost_right_1 {
        border-bottom: 0;
      }
    }
  }
  .el-card {
    box-shadow: none !important;
    margin-bottom: 10px;
    padding-bottom: 30px;
    border-bottom: 1px dashed #dcdcdc;
    .el-card__body {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .card_btn {
    margin-top: 10px;
  }
}
</style>
