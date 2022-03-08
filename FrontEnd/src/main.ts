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

let app = createApp(App);

app.use(PrimeVue);
app.use(createPinia());

app.component('DataTable', DataTable);
app.component('Column', Column);

app.mount('#app');
