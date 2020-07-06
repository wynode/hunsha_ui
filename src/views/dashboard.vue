<template>
  <div class="dash_board">
    <el-card>
      <el-form label-position="left" label-width="0" :model="form">
        <el-form-item style="margin-bottom: 10px; margin-top: 10px">
          <el-date-picker
            v-model="form.dateRange"
            type="datetimerange"
            size="small"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="handleDateChange"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>

    <el-row :gutter="15" class="Mt15">
      <el-col :span="8">
        <el-card class="dash_top_card">
          <div slot="header" @click="goNum">
            <div class="dtc_header">
              <h1>{{ dateName }}订单总数：</h1>
              <h2>{{ totalNum }}</h2>
            </div>
          </div>
          <ul @click="goNum">
            <li>
              租赁：
              <span>{{ rentTotalNum }}</span>
            </li>
            <li>
              出售：
              <span>{{ saleTotalNum }}</span>
            </li>
            <li>
              定制：
              <span>{{ customizeTotalNum }}</span>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="dash_top_card">
          <div slot="header" @click="goAbnormal">
            <div class="dtc_header">
              <h1>{{ dateName }}异常订单总数：</h1>
              <h2>{{ abnormalTotalNum }}</h2>
            </div>
          </div>
          <ul @click="goAbnormal">
            <li>
              租赁：
              <span>{{ rentAbnormalTotalNum }}</span>
            </li>
            <li>
              出售：
              <span>{{ saleAbnormalTotalNum }}</span>
            </li>
            <li>
              定制：
              <span>{{ customizeAbnormalTotalNum }}</span>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="dash_top_card">
          <div slot="header" @click="goPrice">
            <div class="dtc_header">
              <h1>{{ dateName }}交易额：</h1>
              <h2>{{ totalPrice }}</h2>
            </div>
          </div>
          <ul @click="goPrice">
            <li>
              租赁：
              <span>{{ rentTotalPrice }}</span>
            </li>
            <li>
              出售：
              <span>{{ saleTotalPrice }}</span>
            </li>
            <li>
              定制：
              <span>{{ customizeTotalPrice }}</span>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="Mt15">
      <el-card class="box-card" style="height: 378px">
        <div slot="header" class="clearfix">
          <span>{{ dateName }}统计 - {{ activeName }}</span>
        </div>
        <LineChart
          v-if="chartData.length"
          ref="statistic"
          chartId="statistic"
          :chartData="chartData"
          :mapOption="mapOptions"
          v-loading="loading"
        />
        <div v-else class="no_data">
          暂无数据
        </div>
      </el-card>
    </el-row>

    <el-row :gutter="15" class="Mt15">
      <el-col :span="12">
        <el-table
          :data="skuTableData"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column
            prop="skuInfo.skuName"
            label="服装名称"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="totalNum"
            label="订单总数"
            sortable
            width="180"
          ></el-table-column>
          <el-table-column
            sortable
            prop="totalPrice"
            label="交易额"
          ></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table
          :data="shopTableData"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column
            prop="shopInfo.shopName"
            label="服装名称"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="totalNum"
            label="订单总数"
            sortable
            width="180"
          ></el-table-column>
          <el-table-column
            sortable
            prop="totalPrice"
            label="交易额"
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/dateFormat'
// import { getMapOptions } from '@/utils/mappings'
import { fetchStatistic, fetchRanking } from '@/apis'
import { subDays, differenceInDays } from 'date-fns'
// import { filterFields } from './formConfig'

export default {
  data() {
    return {
      // totalNum: 0,
      // abnormalTotalNum: 0,
      // totalPrice: 0,
      rentTotalNum: 0,
      saleTotalNum: 0,
      customizeTotalNum: 0,
      rentAbnormalTotalNum: 0,
      saleAbnormalTotalNum: 0,
      customizeAbnormalTotalNum: 0,
      rentTotalPrice: 0,
      saleTotalPrice: 0,
      customizeTotalPrice: 0,

      activeName: '订单总数',
      mapOptions: 'totalNum',

      chartData: [],
      loading: true,
      form: {
        dateRange: [dateFormat(subDays(new Date(), 7)), dateFormat(new Date())],
      },

      dateDay: 7,

      skuTableData: [],
      shopTableData: [],
    }
  },
  components: {
    LineChart: () => import('@/components/echarts/LineChart'),
  },

  computed: {
    totalNum() {
      return this.rentTotalNum + this.saleTotalNum + this.customizeTotalNum
    },
    abnormalTotalNum() {
      return (
        this.rentAbnormalTotalNum +
        this.saleAbnormalTotalNum +
        this.customizeAbnormalTotalNum
      )
    },
    totalPrice() {
      return (
        this.rentTotalPrice + this.saleTotalPrice + this.customizeTotalPrice
      )
    },
    // liveTimeOptions() {
    //   return getMapOptions('liveTime')
    // },

    // filterFields() {
    //   return filterFields(this)
    // },

    dateName() {
      const date1 = dateFormat(this.form.dateRange[0], 'MM月dd日')
      const date2 = dateFormat(this.form.dateRange[1], 'MM月dd日')
      const date3 = dateFormat(new Date(), 'MM月dd日')
      // let dateName = formDate
      // if (formDate == date) {
      //   dateName = '今日'
      // }
      // if (this.dateDay == 0) {
      //   return '今天'
      // } else if (this.dateDay == 1) {
      //   return '昨天'
      // }
      if (date2 == date3 && this.dateDay == 0) {
        return '今天'
      } else if (date2 == date3 && this.dateDay == 1) {
        return '昨天'
      } else if (date2 == date3) {
        return `${this.dateDay}天内`
      }
      return `${date1}至${date2}`
    },
  },

  methods: {
    goAbnormal() {
      this.activeName = '异常交易订单数'
      this.mapOptions = 'totalAbnormalNum'
    },
    goNum() {
      this.activeName = '订单总数'
      this.mapOptions = 'totalNum'
    },
    goPrice() {
      this.activeName = '交易额'
      this.mapOptions = 'totalPrice'
    },
    handleDateChange() {
      //  const startTime = dateFormat(subDays(new Date(), 7))
      // const endTime = dateFormat(new Date())
      // const date = dateFormat(this.form.date || new Date(), 'yyMMdd')
      this.fetchAllData(this.form.dateRange[0], this.form.dateRange[1])
    },

    async fetchStatisticFn(params) {
      const data = await fetchStatistic(params)
      return data.result
    },

    async fetchRankingFn(params) {
      const data = await fetchRanking(params)
      return data.result
    },

    async fetchAllData(startTime, endTime) {
      const staData1 = await this.fetchStatisticFn({ startTime, endTime })
      // const staData2 = await this.fetchStatisticFn({
      //   startTime,
      //   endTime,
      //   status: '-1,-2',
      // })
      let dateObj = {}
      this.dateDay = differenceInDays(new Date(endTime), new Date(startTime))
      for (let i = 0; i < this.dateDay; i++) {
        let dateName = dateFormat(subDays(new Date(), i + 1), 'yyyyMMdd')
        let dateShow = dateFormat(subDays(new Date(), i + 1), 'yyyy-MM-dd')
        dateObj[dateName] = {
          customizeTotalNum: '0',
          customizeTotalPrice: '0',
          date: dateName,
          dateShow: dateShow,
          rentTotalNum: '0',
          rentTotalPrice: '0',
          saleTotalNum: '0',
          saleTotalPrice: '0',
        }
      }
      let rentTotalNum = 0
      let saleTotalNum = 0
      let customizeTotalNum = 0
      // let rentAbnormalTotalNum = 0
      // let saleAbnormalTotalNum = 0
      // let customizeAbnormalTotalNum = 0
      let rentTotalPrice = 0
      let saleTotalPrice = 0
      let customizeTotalPrice = 0
      staData1.forEach((item) => {
        if (Object.keys(dateObj).includes(item.date)) {
          const date = item.date
          const date1 = item.date.slice(0, 4)
          const date2 = item.date.slice(4, 6)
          const date3 = item.date.slice(6, 8)
          dateObj[date] = item
          dateObj[date].dateShow = `${date1}-${date2}-${date3}`
        }
        rentTotalNum += Number(item.rentTotalNum)
        saleTotalNum += Number(item.saleTotalNum)
        customizeTotalNum += Number(item.customizeTotalNum)
        // rentAbnormalTotalNum += Number(item.rentAbnormalTotalNum)
        // saleAbnormalTotalNum += Number(item.saleAbnormalTotalNum)
        // customizeAbnormalTotalNum += Number(item.customizeAbnormalTotalNum)
        rentTotalPrice += Number(item.rentTotalPrice)
        saleTotalPrice += Number(item.saleTotalPrice)
        customizeTotalPrice += Number(item.customizeTotalPrice)
      })
      this.rentTotalNum = rentTotalNum
      this.saleTotalNum = saleTotalNum
      this.customizeTotalNum = customizeTotalNum
      // this.rentAbnormalTotalNum = rentAbnormalTotalNum
      // this.saleAbnormalTotalNum = saleAbnormalTotalNum
      // this.customizeAbnormalTotalNum = customizeAbnormalTotalNum
      this.rentTotalPrice = rentTotalPrice
      this.saleTotalPrice = saleTotalPrice
      this.customizeTotalPrice = customizeTotalPrice
      this.chartData = Object.values(dateObj)
      this.loading = false
      this.skuTableData = await this.fetchRankingFn({
        startTime,
        endTime,
        groupByName: 'skuId',
        orderName: 'totalNum',
      })
      this.shopTableData = await this.fetchRankingFn({
        startTime,
        endTime,
        groupByName: 'shopId',
        orderName: 'totalNum',
      })
    },
  },

  async mounted() {
    this.fetchAllData(this.form.dateRange[0], this.form.dateRange[1])
    this.$nextTick(() => {
      window.onresize = () => {
        if (this.$refs.statistic) {
          this.$refs.statistic.myChart.resize()
        }
      }
    })
  },
}
</script>

<style lang="scss">
.dash_board {
  .dash_top_card {
    cursor: pointer;
    .dtc_header {
      display: flex;
    }
  }
}
.no_data {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
}
</style>
