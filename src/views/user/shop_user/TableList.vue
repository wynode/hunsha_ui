<template>
  <div>
    <el-card>
      <el-button size="small" type="primary" class="Mb20 Mr20" @click="addItem">
        新增店员
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
  fetchShopUserList,
  postShopUser,
  patchShopUser,
  deleteShopUser,
  // fetchShopUserInfo,
} from '@/apis'
import { tableListCols } from './tableConfig'
import EditForm from './EditForm'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
})

export default {
  name: 'ShopUserList',

  mixins: [table],

  data() {
    return {
      forbidden: false,
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchShopUserList
    },

    tableListCols() {
      return tableListCols(this)
    },
  },

  methods: {
    async modifyForbidden(row, value) {
      let isForbid = 0
      if (value) {
        isForbid = 1
      }
      await patchShopUser({
        shopUserId: row.shopUserId,
        isForbid,
      })
      this.fetchTableList(this.filtersCache)
    },

    addItem() {
      this.$createDialog(
        {
          title: '新增店铺',
          width: '600px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                const form = slotRef.$refs.effectForm.getForm()
                await postShopUser({ shopId: this.$route.params.id, ...form })
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
          title: '更新店铺',
          width: '600px',
          validate: false,
          onSubmit: async (instance, slotRef) => {
            const { effectForm } = slotRef.$refs
            if (await effectForm.useValidator()) {
              const form = effectForm.getForm()
              await patchShopUser({
                shopUserId: row.shopUserId,
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
        await deleteShopUser({ shopUserId: row.shopUserId })
        this.$notify.success('删除成功')
        this.fetchTableList(this.filtersCache)
      }
    },
  },

  mounted() {
    const { id } = this.$route.params
    this.fetchTableList({ shopId: id })
  },
}
</script>

<style></style>
