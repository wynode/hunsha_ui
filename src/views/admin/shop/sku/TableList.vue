<template>
  <div>
    <el-card class="table_filter">
      <EffectForm
        ref="effectForm"
        inline
        size="small"
        label-position="left"
        submitText="搜索"
        cancelText="刷新"
        class="table_filter"
        @submit="handleFilterFn"
        @cancel="handleFilterResetFn"
      >
        <EffectFormField
          v-for="field in filterFields"
          v-bind="field"
          :key="field.name"
        />
      </EffectForm>
    </el-card>

    <el-card :class="{ Mt15: !this.routerId }">
      <el-button size="small" type="primary" class="Mb20 Mr20" @click="addItem">
        新增店铺服装
      </el-button>

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
  fetchShopSkuList,
  // fetchShopSku,
  postShopSku,
  patchShopSku,
  deleteShopSku,
  fetchSkuCategoryList,
} from '@/apis'
import { tableListCols } from './tableConfig'
import EditForm from './EditForm'
import ShowForm from './ShowForm'
import { filterFields } from './formConfig'
import ShowwForm from '@/views/admin/sku/list/ShowForm'

const pagerInit = { page: 1, page_size: 10 }
const filtersInit = {}

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
})

export default {
  name: 'ShopSkuList',

  mixins: [table],

  data() {
    return {
      routerId: '',
      skuCategory: [],
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchShopSkuList
    },

    tableListCols() {
      return tableListCols(this)
    },

    filterFields() {
      return filterFields(this)
    },
  },

  methods: {
    goSkuProfile(row) {
      this.$createDialog(
        {
          fullscreen: true,
          footer: false,
        },
        () => <ShowwForm meta={row} />
      ).show()
    },
    handleFilterFn(form) {
      const { id } = this.$route.params
      let payload = { ...form, shopId: id }
      this.pager = { ...pagerInit }
      this.ordering = ''
      this.fetchTableList(payload)
    },

    handleFilterResetFn() {
      const { id } = this.$route.params
      this.filters = { ...filtersInit, shopId: id }
      this.pager = { ...pagerInit }
      this.ordering = ''
      this.fetchTableList()
    },

    addItem() {
      this.$createDialog(
        {
          title: '新增店铺服装',
          width: '1100px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.showForm) {
              const result = await slotRef.$refs.showForm
                .validate()
                .catch(() => false)

              if (result) {
                const form = slotRef.$refs.showForm.model
                let payload = {}
                Object.keys(form).forEach((item) => {
                  if (item.includes('Price')) {
                    payload[item] = Math.round(form[item] * 100)
                  } else {
                    payload[item] = form[item]
                  }
                })
                await postShopSku({ shopId: this.$route.params.id, ...payload })
                this.fetchTableList(this.filtersCache)
                this.$notify.success('新增成功')
                instance.close()
              }
            }
          },
        },
        () => <ShowForm routerId={this.routerId} />
      ).show()
    },

    modifyItem(row) {
      this.$createDialog(
        {
          title: '更新店铺服装',
          width: '500px',
          validate: false,
          onSubmit: async (instance, slotRef) => {
            const form = slotRef.$refs.effectForm.getForm()
            let payload = {}
            Object.keys(form).forEach((item) => {
              if (item.includes('Price')) {
                payload[item] = Math.round(form[item] * 100)
              } else {
                payload[item] = form[item]
              }
            })
            await patchShopSku({
              usageId: row.usageId,
              ...payload,
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
        await deleteShopSku({ usageId: row.usageId })
        this.$notify.success('删除成功')
        this.fetchTableList(this.filtersCache)
      }
    },
  },

  mounted() {
    const { id } = this.$route.params
    this.routerId = id
    if (id) {
      this.fetchTableList({ shopId: id })
    } else {
      this.fetchTableList()
    }
    fetchSkuCategoryList().then((data) => {
      this.skuCategory = data.result.list
    })
  },
}
</script>

<style></style>
