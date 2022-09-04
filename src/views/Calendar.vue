<template>
  <div class="section-wrapper">
    <vue-cal :events="events" :time="false" :disable-views="['years', 'year', 'month']"></vue-cal>
  </div>
  <generate-calendar/>
</template>

<script setup>
import generateCalendar from './GenerateCalendar.vue'
import VueCal from 'vue-cal';

import {ref, computed, onMounted} from "vue";
import axios from "axios";

const noPersons = ref(3);
const calendar = ref([])

onMounted(async () => {
  calendar.value = (await axios.get('/calendar')).data || [];
})

const events = computed(() => {
  return calendar.value.map((ev) => {
    return {
      start: ev.date.split("T")[0] + ' 00:00',
      end: ev.date.split("T")[0] + ' 23:59',
      title: ev.person,
      class: 'leisure'
    }
  })
})


</script>

<style>
</style>