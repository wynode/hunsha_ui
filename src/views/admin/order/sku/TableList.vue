<template>
  <div class="order_sku_profile">
    <el-card v-for="sku in tableList" :key="sku.skuId">
      <div class="table_sku">
        <div>
          <span>货号：{{ sku.skuCode }}</span>
          <span>SKU名称：{{ sku.skuName }}</span>
          <span>数量：{{ sku.skuName }}件</span>
        </div>
        <div>
          <span>订单类型：{{ sku.dealType | translate('dealType') }}</span>
          <template v-if="sku.dealType == 2">
            <span>租赁周期：{{ sku.rentNum }}</span>
            <span>租赁押金：{{ sku.rentDepositNum }}</span>
          </template>
        </div>
        <div>
          <span>客户身高：{{ sku.customerHeight }}cm</span>
          <span>客户体重：{{ sku.customerWeight }}cm</span>
        </div>
        <div>
          <span>衣长：{{ sku.clothesLength }}cm</span>
          <span>袖长：{{ sku.sleeveLength }}cm</span>
          <span>肩宽：{{ sku.shoulderWidth }}cm</span>
          <span>胸围：{{ sku.bust }}cm</span>
        </div>
        <div>
          <span>中腰：{{ sku.middleWaisted }}cm</span>
          <span>下摆：{{ sku.hem }}cm</span>
          <span>马甲：{{ sku.vest }}cm</span>
          <span>裤长：{{ sku.trousersLength }}cm</span>
        </div>
        <div>
          <span>腰围：{{ sku.waistLine }}cm</span>
          <span>臀围：{{ sku.hipLine }}cm</span>
          <span>大腿：{{ sku.thighLength }}cm</span>
          <span>小腿：{{ sku.shankLength }}cm</span>
        </div>
        <div>
          <span>下单时间：{{ dateFormat(sku.addTime * 1000) }}</span>
        </div>
        <div>
          <span>备注：{{ sku.note }}cm</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table'
import {
  fetchAdminShopOrderSkuList,
  // fetchAdminShopOrderSku,
  postAdminShopOrderSku,
  // patchAdminShopOrderSku,
  deleteAdminShopOrderSku,
} from '@/apis'
import { dateFormat } from '@/utils/dateFormat'
import { tableListCols } from './tableConfig'
import EditForm from './EditForm'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
})

export default {
  name: 'adminOrderListSku',

  mixins: [table],

  data() {
    return {}
  },

  computed: {
    fetchTableListMethod() {
      return fetchAdminShopOrderSkuList
    },

    tableListCols() {
      return tableListCols(this)
    },
  },

  methods: {
    dateFormat(value) {
      return dateFormat(value)
    },
    addItem() {
      this.$createDialog(
        {
          title: '新增订单Sku',
          width: '600px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                const form = slotRef.$refs.effectForm.getForm()
                await postAdminShopOrderSku({
                  orderId: this.$route.params.id,
                  ...form,
                })
                this.fetchTableList(this.filtersCache)
                this.$notify.success('新增成功')
                instance.close()
              }
            }
          },
        },
        () => <EditForm />
      ).show()
    },

    showItem(row) {
      this.$createDialog(
        {
          title: '查看订单Sku详情',
          width: '600px',
          validate: false,
          showCancelBtn: false,
          top: '20vh',
          onSubmit: async (instance) => {
            // const form = slotRef.$refs.effectForm.getForm()
            // await patchAdminShopOrderSku({
            //   orderSkuId: row.orderSkuId,
            //   ...form,
            // })
            // this.fetchTableList(this.filtersCache)
            // this.$notify.success('修改成功')
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
        await deleteAdminShopOrderSku({ orderSkuId: row.orderSkuId })
        this.$notify.success('删除成功')
        this.fetchTableList(this.filtersCache)
      }
    },
  },

  mounted() {
    const { id } = this.$route.params
    if (id) {
      this.fetchTableList({ orderId: id })
    } else {
      this.fetchTableList()
    }
  },
}
</script>

<style lang="scss">
.order_sku_profile {
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  .table_sku {
    div {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #dcdcdc;
    }
    span {
      margin-left: 20px;
      display: inline-block;
      min-width: 100px;
    }
    div:first-child {
      span {
        font-weight: bold;
      }
    }
    div:nth-child(2n + 1) {
      background: #f5f5f5;
    }
  }
  .el-card {
    margin-left: 15px;
    width: 520px;
  }
}
</style>
