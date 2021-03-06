<template>
  <div>
    <el-card>
      <EffectForm
        ref="effectForm"
        inline
        size="small"
        label-position="left"
        submitText="搜索"
        cancelText="刷新"
        class="table_filter"
        @submit="handleFilter"
        @cancel="handleFilterReset"
      >
        <div style="margin-top: 9px; margin-right: 15px;">
          <span v-if="shopName">店铺名：{{ shopName }}</span>
          <span v-if="shopUserName" class="M20">
            店员名：{{ shopUserName }}
          </span>
        </div>
        <EffectFormField
          v-for="field in filterFields"
          v-bind="field"
          :key="field.name"
        />
      </EffectForm>
    </el-card>
    <el-card class="Mt15">
      <!-- <el-button size="small" type="primary" class="Mb20 Mr20" @click="addItem">
        新增店铺订单
      </el-button> -->

      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="tableListCols"
        :pager="{
          page: pager.page,
          page_size: pager.page_size,
          layout: 'total,prev,pager,next,jumper',
          total: tableTotal,
        }"
        @change="handleTableChange"
      />
    </el-card>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table'
import {
  // fetchAdminShopOrder,
  fetchAdminShopOrderList,
  postAdminShopOrder,
  patchAdminShopOrder,
  deleteAdminShopOrder,
} from '@/apis'
import { tableListCols } from './tableConfig'
import EditForm from './EditForm'
import { filterFields } from './formConfig'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
})

export default {
  name: 'adminOrderList',

  mixins: [table],

  data() {
    return {
      shopName: '',
      shopUserName: '',
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchAdminShopOrderList
    },

    tableListCols() {
      return tableListCols(this)
    },

    filterFields() {
      return filterFields(this)
    },
  },

  methods: {
    addItem() {
      this.$createDialog(
        {
          title: '新增店铺订单',
          width: '600px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                const form = effectForm.getForm()
                await postAdminShopOrder(form)
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

    modifyItem(row) {
      this.$createDialog(
        {
          title: '更新店铺订单',
          width: '600px',
          validate: false,
          onSubmit: async (instance, slotRef) => {
            const { effectForm } = slotRef.$refs
            if (await effectForm.useValidator()) {
              const form = effectForm.getForm()
              await patchAdminShopOrder({
                orderId: row.orderId,
                ...form,
              })
              this.fetchTableList(this.filtersCache)
              this.$notify.success('修改成功')
              instance.close()
            }
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
        await deleteAdminShopOrder({ orderId: row.orderId })
        this.$notify.success('删除成功')
        this.fetchTableList(this.filtersCache)
      }
    },
    getPath() {
      const { shopId, shopName, shopUserId, shopUserName } = this.$route.query
      this.shopName = shopName
      this.shopUserName = shopUserName
      if (shopId || shopUserId) {
        this.$nextTick(() => {
          const { getForm, setForm } = this.$refs.effectForm
          setForm('shopId', Number(shopId))
          setForm('shopUserId', Number(shopUserId))
          const data = getForm()
          this.fetchTableList(data)
        })
      } else {
        this.fetchTableList()
      }
    },
  },

  watch: {
    $route: 'getPath',
  },

  mounted() {
    const { shopId, shopName, shopUserId, shopUserName } = this.$route.query
    this.shopName = shopName
    this.shopUserName = shopUserName
    if (shopId || shopUserId) {
      this.$nextTick(() => {
        const { getForm, setForm } = this.$refs.effectForm
        setForm('shopId', Number(shopId))
        setForm('shopUserId', Number(shopUserId))
        const data = getForm()
        this.fetchTableList(data)
      })
    } else {
      this.fetchTableList()
    }
  },
}
</script>

<style></style>
