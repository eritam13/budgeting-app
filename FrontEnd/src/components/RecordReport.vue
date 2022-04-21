
<template>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
            @click="getReport()">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Get Report
          </button>
        </div>
        <div v-if="0<=totalSpent">
          <h2 class="a" >Total: {{ totalSpent }}$</h2>
        </div>
        <div v-if="0>totalSpent">
          <h2 class="b" >Total: {{ totalSpent }}$</h2>
        </div>
        <div v-if="reportCheck == false">
          <li v-for="r in report" :key="r.category">
            <span class="c" v-if="r.category == 'FoodDrinks'">
              Food & Drinks - {{ r.amount }}$
            </span>
            <span class="c" v-else> {{ r.category }} - {{ r.amount }}$ </span>
            <dd></dd>
            <span v-for="rp in reportSheet" :key="r.category">
              <p v-if="rp.category == r.category">
                <p class="a" >
                  <dd>
                    Date: {{rp.date.toString().split("00:00:00")[0] }} {{ rp.time }} Amount: {{ rp.amount+" "+rp.currency}}
                  </dd>
                </p>
              </p>
            </span>
            <dd></dd>
            <br>
          </li>
          <div v-if="reportSheet.length > 0">
            <pie-chart :data="finalArr"></pie-chart>
          </div>
        </div>
        <dd></dd>
        <dd></dd>
        <dd></dd>
            <a id="reportID" class="btn" hidden download="report.csv"><i class="fa fa-download"></i>Download your report</a>
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
import { watch } from 'vue';

const recordsStore = useRecordsStore();
const reportStore = useReportStore();
const { records } = storeToRefs(recordsStore);
const { report } = storeToRefs(reportStore);
const { s } = storeToRefs(reportStore);
const { e } = storeToRefs(reportStore);
let isDollar:Ref<boolean> = ref(true)
let fromDate: Ref<Date> = s;
let toDate: Ref<Date> = e;
let fromTime: Ref<string> = ref('00:00');
let toTime: Ref<string> = ref('23:59');
let finalArr: Ref<(string | number | String)[][]> = ref([]);
let reportCheck: Ref<boolean> = ref(true);
let totalSpent: Ref<number> = ref(0);
let reportSheet: Ref<Record[]> = ref([]);
let recordData: Ref<Record[]> = ref([])
let csvArray: (string | number | String)[][] = [];
let BlobURL: Ref<string> = ref('');
const categories = ['FoodDrinks','Shopping','Housing','Transportation','Income','Investments','Entertainment','Other'];

const getReport = async () => {
  const date1: Date = new Date(fromDate.value);
  let f = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate(),
    parseInt(fromTime.value.split(':')[0]),
    parseInt(fromTime.value.split(':')[1]),
  );
  const date2: Date = new Date(toDate.value);
  let t = new Date(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate(),
    parseInt(toTime.value.split(':')[0]),
    parseInt(toTime.value.split(':')[1]),
  );
  s.value = f;
  e.value = t;
  reportStore.loadReport();
  totalSpent.value = 0;
  if(isDollar.value==true)
  {
    var combineUSD = async () => {
      let result = await recordsStore.combineRecordsUSD(
        f,
        t
      );
      return result;
    };
    
    if ((reportCheck.value = true)) {
      totalSpent.value += await combineUSD();
    }
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
      if(gr==r.category)
      {
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

watch(finalArr, ()=>{
  getReport();
});

onMounted(() => {
  recordsStore.load();
  reportStore.loadReport();
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
  if(toDate.value.toString().length>11)
  {
    if (c.valueAsDate == null && toDate.value.getFullYear() < 2500) {
      toDate.value.setHours(12);
      c.valueAsDate = toDate.value;
    }
  }
});

</script>
<style>
.btn {
  background-color: DodgerBlue;
  border: none;
  color: white;
  padding: 12px 30px;
  cursor: pointer;
  font-size: 20px;
}
.btn:hover {
  background-color: RoyalBlue;
}
span.c {
  font-style: oblique;
}
h2.a{
  text-align:center;
  font-weight: bold;
  font-style: oblique;
  font-size: 150%;
  color:green
}
h2.b{
  text-align:center;
  font-weight: bold;
  font-style: oblique;
  font-size: 150%;
  color:red
}
p.a{
  border-radius: 10px; 
  border: 1px solid black;
}
</style>