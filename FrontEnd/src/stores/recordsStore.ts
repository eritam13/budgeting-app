import { State, Record } from '@/modules/record';
import { reactive, toRefs } from 'vue';

const state = reactive<State>({
  records: [],
});

let initialized = false;
export default function useRecord() {
  const load = () => {
    if (!initialized) {
      state.records = [
        { id: 1,activity:'bought bread',description:'on monday I went to maxima and bought bread',date: new Date(),currency: 'USD', amount: 5},
      ];

      initialized = true;
    }
  };
    const addRecord = (record: Record) => {
    state.records.push(record);
  };

  return { ...toRefs(state),load, addRecord };
}
