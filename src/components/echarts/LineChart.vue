<template>
  <div :id="chartId" style="width: 100%; height:300px;"></div>
</template>

<script>
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
import echarts from 'echarts'
import { get } from 'lodash'
// import { dateFormat } from '@/utils/dateFormat'
import { getMapOptions } from '@/utils/mappings'
import { byteToMGb } from '@/utils/common'

// const colorBoard = {
//   requestTimes: 'rgba(0,150,136,0.6)',
//   qps: 'rgba(48,70,85,0.6)',
//   status10x: '#5142B3',
//   status20x: 'rgba(15,154,195, 0.6)',
//   status30x: '#f1e0c8',
//   status40x: '#70a6ff',
//   status50x: 'rgb(224,99,93)',
//   incomeTransfer: 'rgba(0,150,136,0.6)',
//   incomeAverageTransfer: 'rgba(212,130,101, 0.6)',
//   outcomeTransfer: 'rgba(15,154,195, 0.6)',
//   outcomeAverageTransfer: 'rgba(195,56,52, 0.6)',
//   attackTimes: 'rgba(0,150,136,0.6)',
// }

// export const totalNum = new Map([
//   ['rentTotalNum', '出售总单数'],
//   ['saleTotalNum', '租赁总单数'],
//   ['customizeTotalNum', '定制总单数'],
// ])

// export const totalPrice = new Map([
//   ['rentTotalPrice', '出售总单数'],
//   ['saleTotalPrice', '租赁总单数'],
//   ['customizeTotalPrice', '定制总单数'],
// ])

// export const totalAbnormalNum = new Map([
//   ['rentAbnormalTotalNum', '出售总单数'],
//   ['saleAbnormalTotalNum', '租赁总单数'],
//   ['customizeAbnormalTotalNum', '定制总单数'],
// ])

// const colorBoardNoGraph = {
//   rentTotalNum: 'rgb(0,150,136)',
//   saleTotalNum: 'rgb(48,70,85)',
//   customizeTotalNum: 'rgb(195,56,52)',
//   rentTotalPrice: 'rgb(15,154,195)',
//   saleTotalPrice: '#f1e0c8',
//   customizeTotalPrice: '#70a6ff',
//   rentAbnormalTotalNum: 'rgb(224,99,93)',
//   saleAbnormalTotalNum: 'rgb(0,150,136)',
//   customizeAbnormalTotalNum: 'rgb(212,130,101)',
//   // outcomeTransfer: 'rgb(15,154,195, 1)',
//   // outcomeAverageTransfer: 'rgb(195,56,52)',
//   // attackTimes: 'rgb(0,150,136)',
// }

export default {
  props: {
    chartId: {
      type: String,
      default: 'lineChart',
    },
    titleName: {
      type: String,
      default: '',
    },
    chartData: {
      type: Array,
      default: () => [],
    },
    mapOption: {
      type: String,
      default: 'liveLine',
    },
  },

  data() {
    return {
      myChart: '',
    }
  },

  watch: {
    chartData: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.$nextTick(() => {
          if (!this.myChart) {
            this.myChart = echarts.init(document.getElementById(this.chartId))
          }
          this.myChart.clear()
          if (newVal.length) {
            this.myChart.setOption(this.option)
          }
        })
      },
    },

    mapOption() {
      this.myChart.clear()
      this.myChart.setOption(this.option)
    },
  },

  computed: {
    liveTimeOptions() {
      return getMapOptions(this.mapOption)
    },

    commonData() {
      let legendData = []
      let seriesData = []
      let xAxisData = []
      if (!this.chartData.length) {
        return {
          legendData,
          seriesData,
          xAxisData,
        }
      }
      xAxisData = this.chartData.map((val) => {
        return val.dateShow
      })
      this.liveTimeOptions.forEach((item) => {
        // legendData.push(
        //   `${dateFormat(this.chartData[index]['time'] * 1000)}${item.label}`
        // )
        seriesData.push({
          name: item.label,
          type: 'line',
          smooth: true,
          // itemStyle: {
          //   color: get(colorBoardNoGraph, item.value) || '',
          // },
          lineStyle: {
            width: 2,
          },
          showSymbol: false,
          hoverAnimation: false,
          // areaStyle: {
          //   color: get(colorBoard, item.value) || '',
          //   // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   //   {
          //   //     offset: 0,
          //   //     color: colorBoardNoGraph, item.value || '',
          //   //   },
          //   //   {
          //   //     offset: 0.5,
          //   //     color: colorBoard, item.value || '',
          //   //   },
          //   //   {
          //   //     offset: 1.0,
          //   //     color: '#fff',
          //   //   },
          //   // ]),
          // },
          data: this.chartData.map((val) => {
            if (item.value.includes('Price')) {
              return `${get(val, item.value) / 100}元`
            } else {
              return get(val, item.value)
            }
          }),
        })
      })
      return {
        legendData,
        seriesData,
        xAxisData,
      }
    },

    option() {
      return {
        // title: [
        // {
        //   text: this.titleName,
        //   top: 10,
        //   textStyle: {
        //     fontSize: 14,
        //   },
        // },
        // ],
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            var relVal = params[0].name
            for (var i = 0; i < params.length; i++) {
              relVal +=
                '<div class="circle" ><span style="background:' +
                params[i].color +
                '"></span>' +
                params[i].seriesName +
                ' : ' +
                this.formatValue(params[i].seriesName, params[i].value) +
                '</div>'
            }
            return relVal
          },
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '1%',
          top: '5%',
          containLabel: true,
        },
        // legend: {
        //   show: this.chartData.length > 1,
        //   data: this.commonData.legendData,
        //   top: 20,
        //   left: 'center',
        //   icon: 'rect',
        //   itemGap: 80,
        //   itemHeight: 4,
        //   itemWidth: 40,
        // },
        xAxis: {
          type: 'category',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
              opacity: 0.5,
            },
          },
          boundaryGap: false,
          data: this.commonData.xAxisData,
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
              opacity: 0.5,
            },
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#f6f6f6', '#fff'],
            },
          },
        },

        series: this.commonData.seriesData,
      }
    },
  },

  methods: {
    formatValue(label, value) {
      if (label.includes('流量')) {
        return byteToMGb(value)
      }
      return value
    },
  },
}
</script>

<style lang="scss">
.circle {
  font-size: 0.8rem;
}
.circle > span {
  display: inline-block;
  height: 10px;
  width: 10px;
  margin-right: 5px;
  border-radius: 5px;
}
</style>
