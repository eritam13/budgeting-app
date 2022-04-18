<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <label for="from">FROM---</label>
      <input type="date" id="fromDate" name="date" v-model="fromDate" />
      <input type="time" id="appt" name="appt" v-model="fromTime" />
      <div></div>
      <label for="date">TO---</label>
      <input type="date" id="toDate" name="date" v-model="toDate" />
      <input type="time" id="appt" name="appt" v-model="toTime" />
      <div></div>
      <div class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <button
            id="record-button"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="getReport()"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Get Report
          </button>
        </div>
        <h2>Total: {{ totalSpent }}$</h2>
        <div v-if="reportCheck == false">
          <li v-for="r in report" :key="r.category">
            <span v-if="r.category == 'FoodDrinks'">
              Food & Drinks - {{ r.amount }}$
            </span>
            <span v-else> {{ r.category }} - {{ r.amount }}$ </span>
            <dd></dd>
            <span v-for="rp in reportSheet" :key="r.category">
              <div v-if="rp.category == r.category">
                <div>
                  Activity: {{ rp.activity }} | Description:
                  {{ rp.description }} | Amount: {{ rp.amount }} | Date:
                  {{ rp.date.toString().split("00:00:00")[0] }} | Time: {{ rp.time }}
                </div>
              </div>
            </span>
            <dd></dd>
          </li>
          <div v-if="records.length > 0">
            <pie-chart :data="finalArr"></pie-chart>
          </div>
        </div>
        <a id="reportID" hidden download="report.csv">Download your report</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRecordsStore } from '@/stores/recordsStore';
import { useReportStore } from '@/stores/reportStore';
import { storeToRefs } from 'pinia';
import { onUpdated, ref, Ref } from 'vue';
import { onMounted } from 'vue';
import { Record } from '@/modules/record';
import 'chartkick/chart.js'

const recordsStore = useRecordsStore();
const reportStore = useReportStore();
const { records } = storeToRefs(recordsStore);
const { report } = storeToRefs(reportStore);
const { s } = storeToRefs(reportStore);
const { e } = storeToRefs(reportStore);
let fromDate: Ref<Date> = s;
let toDate: Ref<Date> = e;
let fromTime: Ref<string> = ref('00:00');
let toTime: Ref<string> = ref('23:59');
let finalArr: Ref<(string | number | String)[][]> = ref([]);
let reportCheck: Ref<boolean> = ref(true);
let totalSpent: Ref<number> = ref(0);
let reportSheet: Ref<Record[]> = ref([]);
let csvArray: (string | number | String)[][] = [];
let BlobURL: Ref<string> = ref('');
const categories = ['FoodDrinks','Shopping','Housing','Transportation','Income','Investments','Entertainment','Other'];

const getReport = async () => {
  const date1: Date = new Date(fromDate.value);
  fromDate.value = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate(),
    parseInt(fromTime.value.split(':')[0]),
    parseInt(fromTime.value.split(':')[1]),
  );
  const date2: Date = new Date(toDate.value);
  toDate.value = new Date(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate(),
    parseInt(toTime.value.split(':')[0]),
    parseInt(toTime.value.split(':')[1]),
  );
  s.value = fromDate.value;
  e.value = toDate.value;
  reportStore.loadReport();
  totalSpent.value = 0;
  var combine = async () => {
    let result = await recordsStore.combineRecords(
      fromDate.value,
      toDate.value,
    );
    return result;
  };
  if ((reportCheck.value = true)) {
    totalSpent.value += await combine();
  }
  getPieChartData();
  reportCheck.value = false;
  reportSheet.value = [];
  records.value.forEach((r) => {
    const dateToCheck = new Date(
      r.date.getFullYear(),
      r.date.getMonth(),
      r.date.getDate(),
      parseInt(r.time.split(':')[0]),
      parseInt(r.time.split(':')[1]),
    );
    if (dateToCheck <= toDate.value && dateToCheck >= fromDate.value) {
      reportSheet.value.push(r);
    }
  });
};

const getCSVdata = async (ar: (string | number | String)[][]) => {
  csvArray = [];
  let fromCSV: string = `FROM: ${fromDate.value.getFullYear()}/${
    fromDate.value.getMonth() + 1
  }/${fromDate.value.getDate()}-${fromTime.value}`;
  let toCSV: string = `TO: ${toDate.value.getFullYear()}/${
    toDate.value.getMonth() + 1
  }/${toDate.value.getDate()}-${toTime.value}`;
  csvArray.unshift([fromCSV, toCSV]);
  csvArray.push(["Report for the above mentioned time: "])
  ar.forEach((r) => {
    csvArray.push([r[0],r[1]+"$"]);
  });
  csvArray.push([`\nAll transactions ${fromCSV} ${toCSV}`])
    categories.forEach((gr)=>{
    csvArray.push([gr +":"]);
    reportSheet.value.forEach((r)=>{
      console.log(gr==r.category)
      if(gr==r.category)
      {
      console.log(r.time);
      csvArray.push([r.activity,r.description,r.amount,r.currency,r.date.toString().split("00:00:00")[0],r.time])
      }
    })
    csvArray.push([""])
  })
};
function MakeCSVrows(rows) {
  return rows.map((r) => r.join(',')).join('\r\n');
}

function CreateBlob(data) {
  let reportID = <HTMLAnchorElement>document.getElementById('reportID');
  reportID.removeAttribute('hidden');
  let blob = new Blob([MakeCSVrows(data)]);
  BlobURL.value = '';
  reportID.setAttribute('href', URL.createObjectURL(blob));
  BlobURL.value = URL.createObjectURL(blob);
}
const getPieChartData = async () => {
  reportStore.loadReport();
  let finalArray: (string | number | String)[][] = [];
  for (let i = 0; i < report.value.length; i++) {
    let c: string = report.value[i].category;
    let a: number = report.value[i].amount;
    if (a != 0 && c != 'Income') {
      let smallArray: (string | number)[] = [c, a];
      finalArray.push(smallArray);
    }
    finalArr.value = finalArray;
  }
  getCSVdata(finalArray);
  CreateBlob(csvArray);
};
onMounted(() => {
  reportStore.loadReport();
  recordsStore.load();
});
onUpdated(() => {
  var d = <HTMLInputElement>document.getElementById('fromDate');
  var c = <HTMLInputElement>document.getElementById('toDate');
  if(fromDate.value.toString().length>11)
  {
    if (d.valueAsDate == null && fromDate.value.getFullYear() > 1900 ) {
      fromDate.value.setHours(12);
      d.valueAsDate = fromDate.value;
    }
  }
  if(fromDate.value.toString().length>11)
  {
    if (c.valueAsDate == null && toDate.value.getFullYear() < 2500) {
      toDate.value.setHours(12);
      c.valueAsDate = toDate.value;
    }
  }
});
</script>
