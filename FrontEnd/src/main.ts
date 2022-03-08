import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:windi.css';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
import 'primevue/resources/themes/saga-blue/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import router from './router';
import Datepicker from 'vue3-date-time-picker';

let app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(createPinia());

app.component('Datepicker', Datepicker);
app.component('DataTable', DataTable);
app.component('Column', Column);

app.mount('#app');
