<template>
  <div class="tab-content">
    <div id="timeline-chart" class="timeline-chart"></div>
    <div class="content">
      <!-- 待定内容 -->
      <p>这里是聊天内容的展示区域。</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

interface Message {
  sender: 'me' | 'friend';
  content: string;
  timestamp: string;
}

const props = defineProps<{ messages: Message[] }>();

const chart = ref<echarts.ECharts | null>(null);

const initChart = () => {
  const chartDom = document.getElementById('timeline-chart')!;
  chart.value = echarts.init(chartDom);
  const option = {
    yAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    xAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };
  console.log(option);

  chart.value.setOption(option);
};

onMounted(initChart);

// watch(
//   () => props.messages,
//   () => {
//     if (chart.value) {
//       const option = {
//         xAxis: {
//           data: props.messages.map((msg) => msg.timestamp.split(' ')[0]), // 按日期分组
//         },
//         series: [
//           {
//             data: props.messages.reduce((acc, msg) => {
//               const date = msg.timestamp.split(' ')[0];
//               if (!acc[date]) acc[date] = 0;
//               acc[date]++;
//               return acc;
//             }, {} as Record<string, number>),
//           },
//         ],
//       };
//       chart.value.setOption(option);
//     }
//   },
//   { deep: true }
// );
</script>

<style scoped>
.tab-content {
  display: flex;
  height: 100%;
  overflow: hidden;
}

.timeline-chart {
  width: 50%;
  height: 100%;
}

.content {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}
</style>