<template>
  <div class="section-wrapper">
    <div style="text-align: center">
      <h1>Generate new calendar</h1>
    </div>
    <div>
      <div class="field">
        <label for="interval">Interval</label>
        <InputNumber id="interval" type="text" aria-describedby="interval" v-model="interval"/>
        <small id="username1-help">Interval of days before next person has to do his tasks.</small>
      </div>
      <div class="field">
        <span class="label">Add persons to assign tasks to:</span>
        <div class="person-container">
          <div>
            <InputText id="interval" type="text" aria-describedby="interval" v-for="(person, index) in personsInputs"
                       v-model="persons[index]" placeholder="Persons's name"/>
          </div>
          <div style="display: flex; justify-content:center; flex-direction: row;">
            <Button icon="pi pi-plus" class="p-button-rounded p-button-text" label="" @click="noPersons += 1"
                    :disabled="noPersons >= 10"/>
            <Button icon="pi pi-minus" class="p-button-rounded p-button-text p-button-danger" label=""
                    @click="removeOneInput" :disabled="noPersons === 0"/>
          </div>
        </div>
      </div>
      <div class="field">
        <label for="interval">Generate for x days</label>
        <InputNumber id="interval" type="text" aria-describedby="interval" v-model="days"/>
      </div>
      <label for="basic" style="display: block">Start date:</label>
      <Calendar id="basic" v-model="startDate" autocomplete="off" :inline="true"/>
      <Button icon="pi pi-plus" class="p-button-rounded p-button-text" label="Generate new" @click="generateCalendar" style="margin: auto; display: block"/>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Calendar from "primevue/calendar";

import {ref, computed, onMounted, watch} from "vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const interval = ref(1);
const days = ref(100);
const noPersons = ref(3);
const startDate = ref(new Date());
const calendar = ref([])

onMounted(async() => {
  calendar.value = (await axios.get('/calendar')).data || [];
})

const personsInputs = computed(() => {
  let obj = {};
  for (let i = 0; i < noPersons.value; i++) {
    obj[i] = '';
  }
  return obj;
})

const persons = ref({});

const removeOneInput = () => {
  noPersons.value -= 1;
  delete persons.value[noPersons];
}

const computedPersons = computed(() => {
  let res = [];
  Object.keys(persons.value).forEach((key) => {
    if (persons.value[key] && persons.value[key] !== '') res.push(persons.value[key])
  });
  return res
})

const startDateComputed = computed(() => {
  const date = new Date(startDate.value);
  return {
    month: date.getMonth(),
    year: date.getFullYear(),
    day: date.getDate()
  }
})

const generateCalendar = async () => {
  const res = await axios.post('/calendar', {
    persons: computedPersons.value,
    interval: interval.value,
    period: days.value,
    startDate: startDateComputed.value
  });
  if(res.status === 200) toast.add({severity:'success', summary: `Calendar was generated.`, life: 3000})
  else toast.add({severity:'error', summary: `Something went wrong.`, life: 3000})
}

watch(() => persons.value, (newVal) => {
  const trollBodeaReplacers = ["Aristina's sister", "Mashing machine", "3rd person", "Valorant Iron", "LOL iron", "Fata de la economic", "Fata care face medicina la fspac", "Fata fara bani"];
  const possibleBodeaNames = ['andreea', 'bodea', 'coconut', 'andreea bodea', 'bodea andreea', 'andrea']
  for(const [key, value] of Object.entries(newVal)){
    if(possibleBodeaNames.includes(value.toLowerCase()) || trollBodeaReplacers.includes(value)){
      persons.value[key] = trollBodeaReplacers[Math.floor(Math.random() * trollBodeaReplacers.length)];
    }
  }
}, {deep: true})

</script>

<style >


</style>