import Mutation from '@what-a-faka/obj-mutation'
// import { fetchOptions } from '@/apis/options'
import { allErrors } from '@/utils/errorFormat'
import requests from '@/apis/requests'
import exportCsv from '@/utils/exportCSV'
import { translate } from '@/utils/mappings'
// import { delete } from 'vue/types/umd'
/**
 * TODO 需要重构为 interface
 * TODO 需要重新整理请求逻辑
 */
export default ({
  pagerInit = {},
  filtersInit = {},
  filtersMutateInit = new Mutation(),
}) => {
  return {
    data() {
      return {
        pager: { ...pagerInit },
        ordering: '',
        tableList: [],
        tableTotal: 0,
        mixTableLoading: true,
        filters: { ...filtersInit },
        filtersCache: {},
        filtersMutate: filtersMutateInit,
        formItemList: [],
        completeCV: false,
      }
    },

    methods: {
      handleFilter(form) {
        let payload = { ...form }
        this.pager = { ...pagerInit }
        this.ordering = ''
        this.fetchTableList(payload)
      },

      async fetchTableList(params = {}) {
        this.mixTableLoading = true
        this.completeCV = false
        try {
          this.filtersCache = {
            page: this.pager.page,
            pageSize: this.pager.page_size,
            ...this.filters,
            orderType: this.ordering,
            ...params,
          }
          let payload = {}
          payload = this.filtersMutate.parse(this.filtersCache)
          Object.keys(payload).forEach((item) => {
            if (item === 'dateTimeRange') {
              payload.startTime = payload[item][0]
              payload.endTime = payload[item][1]
              delete payload.dateTimeRange
            }
            if (item === 'receiveDateTimeRange') {
              payload.receiveStartTime = payload[item][0]
              payload.receiveEndTime = payload[item][1]
              delete payload.receiveDateTimeRange
            }
          })

          const res = await this.fetchTableListMethod(payload)
          this.tableList =
            res.result.list.map((item) => {
              let tempItem = {}
              Object.keys(item).forEach((item2) => {
                if (item2.includes('Price') || item2.includes('price')) {
                  tempItem[item2] = item[item2] / 100
                } else if (item2 == 'skuInfo') {
                  const skuInfo = item.skuInfo
                  let tempSku = { ...skuInfo }
                  if (skuInfo) {
                    Object.keys(skuInfo).forEach((item3) => {
                      if (item3.includes('Price') || item3.includes('price')) {
                        tempSku[item3] = skuInfo[item3] / 100
                      }
                    })
                  }
                  tempItem[item2] = tempSku
                } else {
                  tempItem[item2] = item[item2]
                }
              })
              return tempItem
            }) || []
          this.tableTotal = res.result.total
          this.completeCV = true
          if (this.rowD) {
            if (Object.keys(this.rowD).length) {
              this.rowD = this.tableList.filter((item) => {
                return item.skuId == this.skuId
              })[0]
            }
          }
          // if (this.$route) {
          //   const { skuId } = this.$route.query
          //   if (skuId) {
          //     const row = this.tableList.filter(
          //       (item) => item.skuId == skuId
          //     )[0]
          //     if (!row) {
          //       this.$message.error('没有找到这个sku')
          //     }
          //     this.goView(row)
          //   }
          // }
        } catch (error) {
          allErrors(error.data || error)
        } finally {
          this.mixTableLoading = false
        }
      },

      handleTableChange(pager, sort) {
        if (pager) {
          this.pager.page = pager.page
          this.pager.page_size = pager.page_size
        }
        if (sort) {
          const ordering = {
            ascending: '',
            descending: '',
          }
          this.ordering =
            sort.column && sort.order
              ? `${ordering[sort.order]}${translate(sort.prop, 'ordering')}`
              : ''
        }
        const form = this.$refs.effectForm
          ? this.$refs.effectForm.getForm()
          : this.filters
        const payload = { ...form }
        if (payload.time_date) {
          const startTime = payload.time_date ? payload.time_date[0] : ''
          const endTime = payload.time_date ? payload.time_date[1] : ''
          if (startTime) {
            payload.startTime = startTime
            payload.endTime = endTime
            delete payload.time_date
          }
        }
        this.fetchTableList(payload)
      },

      handleSearch(isSaveTime) {
        if (isSaveTime) {
          this.$refs.effectForm
            ? this.$refs.effectForm.resetExceptTimeFormFields()
            : ''
          const form = this.$refs.effectForm.form
          this.fetchTableList({ ...pagerInit, ordering: '', ...form })
        } else {
          this.$refs.effectForm ? this.$refs.effectForm.resetFormFields() : ''
          this.fetchTableList({ ...pagerInit, ordering: '' })
        }
      },

      handleFilterReset() {
        this.filters = { ...filtersInit }
        this.pager = { ...pagerInit }
        this.ordering = ''
        this.fetchTableList()
      },

      handleRegulareFilter(form) {
        this.$refs.effectForm.resetFormFields()
        this.filters.search = form.search || ''
        Object.keys(form)
          .filter((v) => v != 'search')
          .forEach((field) => {
            this.$refs.effectForm.setForm(field, form[field])
          })
        this.pager = { ...pagerInit }
        this.fetchTableList(form)
      },

      // fetchOptions(option) {
      //   // TODO 删除对 formItemList 依赖
      //   return fetchOptions(option).then((res) => {
      //     this.formItemList = res
      //     return res
      //   })
      // },

      async handleExportCSV(url, name) {
        this.$confirm('是否确认导出以下内容？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            requests
              .get(url, { params: this.filtersMutate.parse(this.filtersCache) })
              .then((result) => {
                exportCsv(result, name)
              })
              .catch(() => {
                this.$message.error('导出失败')
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消导出',
            })
          })
      },
    },
  }
}
