<template>
  <tab-view>
    <tab-panel header="Future">
      <div class="day-task" v-for="day in futureTasks">
        <Panel :toggleable="true" :collapsed="true" :header="getHeaderName(day)">
          <div class="person-task" v-for="(task, index) in day.tasks">
            <div>
              <i :class="getIconClasses(task)"></i>
              <span style="padding-left: 10px"> {{ task.name }} </span>
            </div>
            <div class="person-tasks-actions">
              <Button icon="pi pi-info-circle" class="p-button-rounded p-button-text" v-tooltip="getFormattedComments(task)"/>
              <Button icon="pi pi-comment" class="p-button-rounded p-button-text" :disabled="isTaskDisabled(day)" @click="toggle($event, index)"/>
              <OverlayPanel appendTo="body" ref="open" :showCloseIcon="true">
                <div style="display: flex">
                  <input-text v-model="comment"></input-text>
                  <Button @click="addComment(day.id, task.id, comment)">Add</Button>
                </div>
              </OverlayPanel>
              <Button icon="pi pi-check-square" class="p-button-rounded p-button-text p-button-success" :disabled="isTaskDisabled(day)" @click="updateStatus(day.id, task.id, 'Done')"/>
              <Button icon="pi pi-times" class="p-button-rounded p-button-text p-button-danger" :disabled="isTaskDisabled(day)" @click="updateStatus(day.id, task.id, 'Canceled')"/>
            </div>
          </div>
        </Panel>
      </div>
    </tab-panel>
    <tab-panel header="Past">
      <div class="day-task" v-for="day in pastTasks">
        <Panel :toggleable="true" :collapsed="true" :header="getHeaderName(day)">
          <div class="person-task" v-for="(task, index) in day.tasks">
            <div>
              <i :class="getIconClasses(task)"></i>
              <span style="padding-left: 10px"> {{ task.name }} </span>
            </div>
            <div class="person-tasks-actions">
              <Button icon="pi pi-info-circle" class="p-button-rounded p-button-text" v-tooltip="getFormattedComments(task)"/>
              <Button icon="pi pi-comment" class="p-button-rounded p-button-text" :disabled="isTaskDisabled(day)" @click="toggle($event, index)"/>
              <OverlayPanel appendTo="body" ref="open" :showCloseIcon="true">
                <div style="display: flex">
                  <input-text v-model="comment"></input-text>
                  <Button @click="addComment(day.id, task.id, comment)">Add</Button>
                </div>
              </OverlayPanel>
              <Button icon="pi pi-check-square" class="p-button-rounded p-button-text p-button-success" :disabled="isTaskDisabled(day)" @click="updateStatus(day.id, task.id, 'Done')"/>
              <Button icon="pi pi-times" class="p-button-rounded p-button-text p-button-danger" :disabled="isTaskDisabled(day)" @click="updateStatus(day.id, task.id, 'Canceled')"/>
            </div>
          </div>
        </Panel>
      </div>
    </tab-panel>
  </tab-view>
</template>

<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import InputText from 'primevue/inputtext';

import {computed, ref} from "vue";

let formatOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
const lastActiveIndex = ref();

const props = defineProps({
  calendar: Array,
  showPerson: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['updateTaskStatus', 'addCommentToTask']);

const open = ref();
const comment = ref('');

const futureTasks = computed(() => {
  const today = new Date();
  return props.calendar.filter((task) => {
    return new Date(task.date) > today;
  })
})

const pastTasks = computed(() => {
  const today = new Date();
  return props.calendar.filter((task) => {
    return new Date(task.date) < today;
  })
})

const getIconClasses = (task) => {
  if (task.status === 'Done') return 'pi pi-check-square'
  if (task.status === 'Canceled') return 'pi pi-times'
  return 'pi pi-code'
}

const getHeaderName = (day) => {
  return props.showPerson ? new Date(day.date).toLocaleDateString('en-US', formatOptions) + ' ( ' + day.person + ' )'
      : new Date(day.date).toLocaleDateString('en-US', formatOptions);
}

const getDifferenceBeetweenDates = (first, second) => {
  const diffTime = Math.abs(first - second);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

const isTaskDisabled = (day) => {
  return getDifferenceBeetweenDates(new Date(day.date), new Date()) < -1 || getDifferenceBeetweenDates(new Date(day.date), new Date()) > 1
}

const getFormattedComments = (task) => {
  if(Array.isArray(task?.comments) && task.comments.length){
    return task.comments.reduce((prev, curr) => {
      return prev + curr + '\n'
    }, '')
  }
  return 'No comments for this task!';
}

const updateStatus = (dayId, taskId, status) => {
  emits('updateTaskStatus', dayId, taskId, status);
}
const addComment = (dayId, taskId, comment) => {
  if(lastActiveIndex.value !== undefined) open.value[lastActiveIndex.value].hide();
  emits('addCommentToTask', dayId, taskId, comment);
}

const toggle = (event, index) => {
  lastActiveIndex.value = index;
  open.value[index].toggle(event);
};

</script>

<style>

</style>