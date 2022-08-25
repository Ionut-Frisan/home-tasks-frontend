<template>
  <div class="section-wrapper">
    <tab-view @tabChange="onTabChange" :activeIndex="index">
<!--      <tab-panel header="All">-->
<!--        <PersonTasks :calendar="calendar" :showPerson="true" @updateTaskStatus="onUpdateTaskStatus"-->
<!--                     @addCommentToTask="onAddCommentToTask"/>-->
<!--      </tab-panel>-->
      <tab-panel v-for="(person, index) in ['All', ...computedPersons]" :header="person" >
        <PersonTasks :calendar="computedCalendarItems" @updateTaskStatus="onUpdateTaskStatus" :showPerson="index === 0"
                     @addCommentToTask="onAddCommentToTask"/>
      </tab-panel>
    </tab-view>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import axios from "axios";

import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import PersonTasks from '../components/PersonTasks.vue';
import { useToast } from "primevue/usetoast";

const toast = useToast();

const calendar = ref([]);
const index = ref(0);

onMounted(async () => {
  calendar.value = (await axios.get('/calendar')).data || [];
})

const computedPersons = computed(() => {
  const personsArr = calendar.value.map((day) => day.person);
  return [...new Set(personsArr)]
})

const onChange = (event) => {
  filter.value = event.value;
}


const onUpdateTaskStatus = async (dayId, taskId, status) => {
  const response = await axios.put('/calendar/tasks/updateStatus', {
    dayId, taskId, status
  });

  if(response.status === 200) {
    toast.add({severity:'success', summary: `Status updated to ${status}.`, life: 3000})
    calendar.value = response.data;
  }else toast.add({severity:'error', summary: `Something went wrong.`, life: 3000})

}

const onAddCommentToTask = async (dayId, taskId, comment) => {
  const response = await axios.put('/calendar/tasks/addComment', {
    dayId, taskId, comment
  });

  if(response.status === 200) {
    toast.add({severity:'success', summary: `Comment was added.`, life: 3000})
    calendar.value = response.data;
  }else toast.add({severity:'error', summary: `Something went wrong`, life: 3000})

}

const getFilteredDataByPerson = (person) => {
  return calendar.value.filter((day) => day.person === person);
}

const computedCalendarItems = computed(() => {
  if(index.value === 0) return calendar.value;

  const person = computedPersons.value[index.value - 1];
  return calendar.value.filter((day) => day.person === person);
})

const onTabChange = (event) => {
  index.value = event.index;
}

</script>

<style scoped>

</style>