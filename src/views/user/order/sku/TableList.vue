<template>
  <div>
    <el-button size="small" type="primary" class="Mb20 Mr20" @click="addItem">
      录入新sku订单
    </el-button>
    <div class="user_order_sku_profile Mt15" v-if="tableList.length">
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
                <img
                  :src="imgUrl + sku.thumb"
                  alt=""
                  style="cursor: pointer;"
                  @click="goSkuProfile(sku)"
                />
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
              <span>租赁周期：{{ sku.rentNum || 0 }}天</span>
              <span>租赁押金：{{ sku.rentDepositNum || 0 }}元</span>
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
            <span>
              订单状态：
              <i :style="statusColor(sku)">
                {{ getStatus(sku.status, sku.dealType) }}
              </i>
            </span>
            <span>下单时间：{{ dateFormat(sku.addTime * 1000) }}</span>
          </div>
          <div class="ts_item" v-if="sku.status > 0">
            <span>物流公司：{{ sku.expressName }}</span>
            <span>物流信息：{{ sku.expressValue }}</span>
          </div>
          <div class="ts_item">
            <span>单价：{{ sku.price }}元</span>
            <span>数量：{{ sku.skuNum }}件</span>
            <span>合计：{{ sku.totalPrice }}元</span>
          </div>
          <div class="ts_item">
            <span>备注：{{ sku.note }}</span>
          </div>
          <div class="ts_item">
            <span>
              异常备注：
              <i style="color:#F56C6C">{{ sku.abnormalNote }}</i>
            </span>
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
              v-if="sku.status === 2"
              size="small"
              type="primary"
              @click="modifyCustomStatus(10, sku)"
            >
              客户确认收货
            </el-button>
          </template>
          <el-button
            size="small"
            type="warning"
            @click="abnormal(sku)"
            class="Mt20"
            v-if="sku.status !== -2 && sku.status !== -1"
          >
            异常/退款
          </el-button>
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
    <div v-else class="no_more_text">
      暂无店铺sku订单
    </div>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table'
import {
  fetchShopOrderSkuList,
  // fetchShopOrderSku,
  // postShopOrderSku,
  patchShopOrderSku,
  deleteShopOrderSku,
  // patchOrderSkuStatus,
  updateCustomerStatus,
  updateSaleStatus,
  updateRentStatus,
  postAbnormal,
  getSkuProfile,
} from '@/apis'
import { IMG_URL } from '@/config'
import { getStatus } from '@/utils/common'
import { dateFormat } from '@/utils/dateFormat'
import ShowForm from '@/views/user/shop_sku/ShowForm'
import EditForm from './EditForm'
import Abnormal from './Abnormal'

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
    async goSkuProfile(row) {
      const data = await getSkuProfile({ skuId: row.skuId })
      let payload = { ...data.result }
      Object.keys(data.result.skuInfo).forEach((item) => {
        payload[item] = data.result.skuInfo[item]
      })
      Object.keys(payload).forEach((item) => {
        if (item.includes('Price') || item.includes('price')) {
          payload[item] = payload[item] / 100
        }
      })
      this.$createDialog(
        {
          fullscreen: true,
          footer: false,
        },
        () => <ShowForm meta={payload} orderId={row.orderId} />
      ).show()
      // this.$router.push({ name: 'showSku' })
    },
    getStatus(value, type) {
      return getStatus(value, type)
    },
    dateFormat(value) {
      return dateFormat(value)
    },
    // goSkuProfile(sku) {
    //   this.$router.push({
    //     name: 'userShopSkuList',
    //     query: {
    //       orderId: this.$route.params.id,
    //       skuId: sku.skuId,
    //     },
    //   })
    // },
    modifySaleStatus(status, row) {
      let title = ''
      if (status === 1) {
        title = '出售订单-发货'
      } else if (status === 10) {
        title = '出售订单-客户确认收货'
      }

      this.$createDialog(
        {
          title: title,
          width: '600px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                this.$confirm('操作将更改订单状态, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                }).then(async () => {
                  const form = slotRef.$refs.effectForm.getForm()
                  await updateSaleStatus({
                    orderSkuId: row.orderSkuId,
                    status,
                    ...form,
                  })
                  this.fetchTableList(this.filtersCache)
                  this.$notify.success(`修改状态为${title}成功`)
                  instance.close()
                })
              }
            }
          },
        },
        () => <FaHuo title={title} meta={row} />
      ).show()
    },
    modifyRentStatus(status, row) {
      let title = ''
      if (status === 1) {
        title = '租赁订单-发货'
      } else if (status === 2) {
        title = '租赁订单-客户确认收货'
      } else if (status === 10) {
        title = '租赁订单-客户归还商品'
      }
      this.$createDialog(
        {
          title: title,
          width: '600px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                this.$confirm('操作将更改订单状态, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                }).then(async () => {
                  const form = slotRef.$refs.effectForm.getForm()
                  await updateRentStatus({
                    orderSkuId: row.orderSkuId,
                    status,
                    ...form,
                  })
                  this.fetchTableList(this.filtersCache)
                  this.$notify.success(`修改状态为${title}成功`)
                  instance.close()
                })
              }
            }
          },
        },
        () => <FaHuo title={title} meta={row} />
      ).show()
    },
    modifyCustomStatus(status, row) {
      let title = ''
      if (status === 1) {
        title = '定制订单-定制完成'
      } else if (status === 2) {
        title = '定制订单-发货'
      } else if (status === 10) {
        title = '定制订单-客户确认收货'
      }
      this.$createDialog(
        {
          title: title,
          width: '600px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                const form = slotRef.$refs.effectForm.getForm()
                this.$confirm('操作将更改订单状态, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                }).then(async () => {
                  await updateCustomerStatus({
                    orderSkuId: row.orderSkuId,
                    status,
                    ...form,
                  })
                  this.fetchTableList(this.filtersCache)
                  this.$notify.success(`修改状态为${title}成功`)
                  instance.close()
                })
              }
            }
          },
        },
        () => <FaHuo title={title} meta={row} />
      ).show()
    },

    statusColor(sku) {
      if (sku.status === 10) {
        return 'color: #67C23A'
      } else if (sku.status === 0) {
        return 'color: #F56C6C'
      } else if (sku.status === -1 || sku.status === -2) {
        return 'color: #E6A23C'
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

    abnormal(row) {
      this.$createDialog(
        {
          title: '提交异常/退款',
          width: '600px',
          validate: false,
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                const form = slotRef.$refs.effectForm.getForm()
                this.$confirm('操作将更改订单状态, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                }).then(async () => {
                  await postAbnormal({
                    orderSkuId: row.orderSkuId,
                    ...form,
                  })
                  this.fetchTableList(this.filtersCache)

                  instance.close()
                  this.$notify.success('提交异常/退款成功')
                })
              }
            }
          },
        },
        () => <Abnormal meta={row} />
      ).show()
    },

    modifyItem(row) {
      this.$createDialog(
        {
          title: '更新订单Sku',
          width: '860px',
          validate: false,
          onSubmit: async (instance, slotRef) => {
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
