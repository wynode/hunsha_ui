<template>
  <div class="dash_board">
    <el-card>
      <div style="display: flex; align-items: center">
        <el-radio-group
          v-model="radioOne"
          @change="radioOneChange"
          size="small"
        >
          <el-radio-button :label="1">昨日</el-radio-button>
          <el-radio-button :label="0">今日</el-radio-button>
          <el-radio-button :label="7">7日</el-radio-button>
          <el-radio-button :label="30">30日</el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="oneDateRange"
          type="daterange"
          size="small"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="handleDate1Change"
        ></el-date-picker>
      </div>
    </el-card>

    <el-row :gutter="15" class="Mt15">
      <el-col :span="8">
        <el-card class="dash_top_card">
          <div slot="header" @click="goNum">
            <div class="dtc_header">
              <h1>{{ oneDateName }} 订单总数：</h1>
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
          <div slot="header">
            <div class="dtc_header">
              <h1>{{ oneDateName }} 异常订单总数：</h1>
              <h2>{{ abnormalTotalNum }}</h2>
            </div>
          </div>
          <ul>
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
          <div slot="header">
            <div class="dtc_header">
              <h1>{{ oneDateName }} 交易额：</h1>
              <h2>{{ totalPrice }}</h2>
            </div>
          </div>
          <ul>
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
        <div slot="header" class="card_header">
          <span class="Mr15">{{ twoDateName }}统计 - {{ activeName }}</span>
          <el-radio-group
            v-model="radioq"
            @change="radioqChange"
            size="small"
            class="Mr15"
          >
            <el-radio-button :label="1">订单数</el-radio-button>
            <el-radio-button :label="2">订单金额</el-radio-button>
            <el-radio-button :label="3">订单商品数</el-radio-button>
          </el-radio-group>
          <el-radio-group
            v-model="radioTwo"
            @change="radioTwoChange"
            size="small"
          >
            <el-radio-button :label="1">昨日</el-radio-button>
            <el-radio-button :label="0">今日</el-radio-button>
            <el-radio-button :label="7">7日</el-radio-button>
            <el-radio-button :label="30">30日</el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-model="twoDateRange"
            type="daterange"
            size="small"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="handleDate2Change"
          ></el-date-picker>
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
      <el-card class="box-card Mt15" style="height: 378px">
        <div slot="header" class="clearfix">
          <span>{{ twoDateName }}统计 - 异常订单数</span>
        </div>
        <LineChart
          v-if="chartData2.length"
          ref="statistic1"
          chartId="statistic1"
          :chartData="chartData2"
          mapOption="totalAbnormalNum"
          v-loading="loading"
        />
        <div v-else class="no_data">
          暂无数据
        </div>
      </el-card>
    </el-row>

    <div class="Mt15">
      <el-card>
        <div slot="header" class="card_header">
          <span class="Mr15">{{ threeDateName }}排行统计</span>
          <el-radio-group
            v-model="radioThree"
            @change="radioThreeChange"
            size="small"
          >
            <el-radio-button :label="1">昨日</el-radio-button>
            <el-radio-button :label="0">今日</el-radio-button>
            <el-radio-button :label="7">7日</el-radio-button>
            <el-radio-button :label="30">30日</el-radio-button>
          </el-radio-group>

          <el-date-picker
            v-model="threeDateRange"
            type="daterange"
            size="small"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="handleDate3Change"
          ></el-date-picker>
        </div>
        <el-row :gutter="60">
          <el-col :span="12">
            <div class="rank_header">服装订单总数排行</div>
            <el-table
              :data="skuTableData"
              style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column prop="skuInfo.skuName" label="服装名称">
                <template slot-scope="scope">
                  <div>
                    <el-link type="primary" @click="goSkuProfile(scope.row)">
                      {{
                        (scope.row.skuInfo && scope.row.skuInfo.skuName) || ''
                      }}
                    </el-link>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="totalNum"
                label="订单总数"
                sortable
              ></el-table-column>
              <el-table-column
                sortable
                prop="totalPrice"
                label="交易额"
              ></el-table-column>
              <el-table-column
                label="排行"
                type="index"
                width="120"
              ></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12">
            <div class="rank_header">店铺订单总数排行</div>
            <el-table
              :data="shopTableData"
              style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column prop="shopInfo.shopName" label="店铺名称">
                <template slot-scope="scope">
                  <router-link
                    :to="{
                      name: 'shopProfile',
                      params: { id: scope.row.shopInfo.shopId },
                    }"
                  >
                    <el-link type="primary">
                      {{ scope.row.shopInfo.shopName }}
                    </el-link>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column
                prop="totalNum"
                label="订单总数"
                sortable
              ></el-table-column>
              <el-table-column
                sortable
                prop="totalPrice"
                label="交易额"
              ></el-table-column>
              <el-table-column
                prop="orderNum"
                label="订单商品数"
              ></el-table-column>
              <el-table-column
                label="排行"
                type="index"
                width="120"
              ></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/dateFormat'
// import { getMapOptions } from '@/utils/mappings'
import { fetchStatistic, fetchRanking } from '@/apis'
import { subDays, differenceInDays } from 'date-fns'
import ShowForm from '@/views/admin/sku/list/ShowForm'
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
      oneDateName: '7天内',
      twoDateName: '7天内',
      threeDateName: '7天内',

      chartData: [],
      chartData2: [],
      loading: true,
      radioq: '',
      oneDateRange: [
        dateFormat(subDays(new Date(), 7), 'yyyy-MM-dd'),
        dateFormat(new Date(), 'yyyy-MM-dd'),
      ],

      twoDateRange: [
        dateFormat(subDays(new Date(), 7), 'yyyy-MM-dd'),
        dateFormat(new Date(), 'yyyy-MM-dd'),
      ],

      threeDateRange: [
        dateFormat(subDays(new Date(), 7), 'yyyy-MM-dd'),
        dateFormat(new Date(), 'yyyy-MM-dd'),
      ],

      dateDay: 7,

      skuTableData: [],
      shopTableData: [],
      radioOne: 7,
      radioTwo: 7,
      radioThree: 7,
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
  },

  methods: {
    goSkuProfile(row) {
      this.$createDialog(
        {
          fullscreen: true,
          footer: false,
        },
        () => <ShowForm meta={row.skuInfo} />
      ).show()
    },
    radioqChange(value) {
      if (value === 1) {
        this.activeName = '订单数'
        this.mapOptions = 'totalNum'
      } else if (value === 2) {
        this.activeName = '交易额'
        this.mapOptions = 'totalPrice'
      } else if (value === 3) {
        this.activeName = '订单商品数'
        this.mapOptions = 'totalOrderNum'
      }
    },
    radioOneChange() {
      const date1 = dateFormat(subDays(new Date(), this.radioOne), 'yyyy-MM-dd')
      const date2 = dateFormat(new Date(), 'yyyy-MM-dd')
      this.oneDateRange[0] = date1
      this.oneDateRange[1] = date2
      this.handleDate1Change()
    },
    radioTwoChange() {
      const date1 = dateFormat(subDays(new Date(), this.radioTwo), 'yyyy-MM-dd')
      const date2 = dateFormat(new Date(), 'yyyy-MM-dd')
      this.twoDateRange[0] = date1
      this.twoDateRange[1] = date2
      this.handleDate2Change()
    },
    radioThreeChange() {
      const date1 = dateFormat(
        subDays(new Date(), this.radioThree),
        'yyyy-MM-dd'
      )
      const date2 = dateFormat(new Date(), 'yyyy-MM-dd')
      // const date1 = subDays(new Date(), this.radioThree)

      // const date2 = new Date()
      this.threeDateRange[0] = date1
      this.threeDateRange[1] = date2
      this.handleDate3Change()
    },
    formatDateName(time1, time2) {
      const date1 = dateFormat(time1, 'M-d')
      const date2 = dateFormat(time2, 'M-d')
      const date3 = dateFormat(new Date(), 'M-d')
      const dateDay = differenceInDays(new Date(time2), new Date(time1))
      if (date2 == date3 && dateDay == 0) {
        return '今天'
      } else if (date2 == date3 && dateDay == 1) {
        return '昨天'
      } else if (date2 == date3) {
        return `${dateDay}天内`
      }
      return `${date1}至${date2}`
    },
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
    handleDate1Change() {
      this.fetchAllData(this.oneDateRange[0], this.oneDateRange[1])
      this.oneDateName = this.formatDateName(
        this.oneDateRange[0],
        this.oneDateRange[1]
      )
    },
    handleDate2Change() {
      this.fetchChartData(this.twoDateRange[0], this.twoDateRange[1])
      this.twoDateName = this.formatDateName(
        this.twoDateRange[0],
        this.twoDateRange[1]
      )
    },
    handleDate3Change() {
      this.fetchTwoRankingFn(this.threeDateRange[0], this.threeDateRange[1])
      this.threeDateName = this.formatDateName(
        this.threeDateRange[0],
        this.threeDateRange[1]
      )
    },

    async fetchStatisticFn(params) {
      const data = await fetchStatistic(params)
      return data.result
    },

    async fetchRankingFn(params) {
      const data = await fetchRanking(params)
      return data.result
    },

    formatData(data, startTime, endTime) {
      let dateObj = {}
      this.dateDay = differenceInDays(new Date(endTime), new Date(startTime))
      for (let i = 0; i < this.dateDay; i++) {
        let dateName = dateFormat(subDays(new Date(), i + 1), 'yyyyMMdd')
        let dateShow = dateFormat(subDays(new Date(), i + 1), 'yyyy-MM-dd')
        dateObj[dateName] = {
          customizeTotalNum: '0',
          customizeTotalPrice: '0',
          customizeOrderNum: '0',
          date: dateName,
          dateShow: dateShow,
          rentTotalNum: '0',
          rentTotalPrice: '0',
          rentOrderNum: '0',
          saleOrderNum: '0',
          saleTotalNum: '0',
          saleTotalPrice: '0',
          totalPrice: '0',
          totalNum: '0',
          totalOrderNum: '0',
        }
      }
      let rentTotalNum = 0
      let saleTotalNum = 0
      let customizeTotalNum = 0
      let rentTotalOrderNum = 0
      let saleTotalOrderNum = 0
      let customizeTotalOrderNum = 0
      let rentTotalPrice = 0
      let saleTotalPrice = 0
      let customizeTotalPrice = 0
      data.forEach((item) => {
        const date = item.date
        const date1 = item.date.slice(0, 4)
        const date2 = item.date.slice(4, 6)
        const date3 = item.date.slice(6, 8)
        dateObj[date] = item
        dateObj[date].dateShow = `${date1}-${date2}-${date3}`
        dateObj[date].totalNum =
          Number(item.rentTotalNum) +
          Number(item.saleTotalNum) +
          Number(item.customizeTotalNum)
        dateObj[date].totalOrderNum =
          Number(item.rentOrderNum) +
          Number(item.saleOrderNum) +
          Number(item.customizeOrderNum)
        dateObj[date].totalPrice =
          Number(item.rentTotalPrice) +
          Number(item.saleTotalPrice) +
          Number(item.customizeTotalPrice)
        rentTotalNum += Number(item.rentTotalNum)
        saleTotalNum += Number(item.saleTotalNum)
        customizeTotalNum += Number(item.customizeTotalNum)
        rentTotalOrderNum += Number(item.rentOrderNum)
        saleTotalOrderNum += Number(item.saleOrderNum)
        customizeTotalOrderNum += Number(item.customizeOrderNum)
        rentTotalPrice += Number(item.rentTotalPrice)
        saleTotalPrice += Number(item.saleTotalPrice)
        customizeTotalPrice += Number(item.customizeTotalPrice)
      })
      return [
        rentTotalNum,
        saleTotalNum,
        customizeTotalNum,
        rentTotalOrderNum,
        saleTotalOrderNum,
        customizeTotalOrderNum,
        rentTotalPrice,
        saleTotalPrice,
        customizeTotalPrice,
        dateObj,
      ]
    },

    async fetchAllData(startTime, endTime) {
      const staData1 = await this.fetchStatisticFn({ startTime, endTime })
      const staData2 = await this.fetchStatisticFn({
        startTime,
        endTime,
        status: '-1,-2',
      })
      const data1 = this.formatData(staData1, startTime, endTime)
      const data2 = this.formatData(staData2, startTime, endTime)
      this.rentTotalNum = data1[0]
      this.saleTotalNum = data1[1]
      this.customizeTotalNum = data1[2]
      this.rentTotalOrderNum = data1[3]
      this.saleTotalOrderNum = data1[4]
      this.customizeTotalOrderNum = data1[5]
      this.rentTotalPrice = data1[6]
      this.saleTotalPrice = data1[7]
      this.customizeTotalPrice = data1[8]
      this.rentAbnormalTotalNum = data2[0]
      this.saleAbnormalTotalNum = data2[1]
      this.customizeAbnormalTotalNum = data2[2]
    },

    async fetchChartData(startTime, endTime) {
      const staData1 = await this.fetchStatisticFn({ startTime, endTime })
      const staData2 = await this.fetchStatisticFn({
        startTime,
        endTime,
        status: '-1,-2',
      })
      const data1 = this.formatData(staData1, startTime, endTime)
      const data2 = this.formatData(staData2, startTime, endTime)
      this.chartData = Object.values(data1[9])
      this.chartData2 = Object.values(data2[9])
      this.loading = false
    },

    async fetchTwoRankingFn(startTime, endTime) {
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
    this.fetchAllData(this.oneDateRange[0], this.oneDateRange[1])
    this.fetchChartData(this.twoDateRange[0], this.twoDateRange[1])
    this.fetchTwoRankingFn(this.threeDateRange[0], this.threeDateRange[1])
    this.$nextTick(() => {
      window.onresize = () => {
        if (this.$refs.statistic) {
          this.$refs.statistic.myChart.resize()
        }
        if (this.$refs.statistic1) {
          this.$refs.statistic1.myChart.resize()
        }
      }
    })
  },
}
</script>

<style lang="scss">
.dash_board {
  .dash_top_card {
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
.card_header {
  display: flex;
  align-items: center;
  .el-form-item {
    margin-bottom: 0;
  }
}
.rank_header {
  text-align: center;
  font-size: 16px;
}
</style>
