<template>
  <tab-view>
    <tab-panel header="Future">
      <div class="day-task" v-for="(day, dayIndex) in futureTasks" :key="day.id + dayIndex">
        <Panel :toggleable="true" :collapsed="true" :header="getHeaderName(day)">
          <div class="add-new-task-wrapper" style="display: flex">
            <InputText v-model="newTask" placeholder="Add new task for this day" type="text" class="p-inputtext-sm" v-if='true' style="position: relative"></InputText>
            <Button icon="pi pi-plus" class="p-button-rounded p-button-text" @click="addTask(day.id)"/>
          </div>
          <div class="person-task" v-for="(task, index) in day.tasks" :key="task.id">
            <div>
              <i :class="getIconClasses(task)"></i>
              <span style="padding-left: 10px"> {{ task.name }} </span>
            </div>
            <div class="person-tasks-actions">
              <Button icon="pi pi-info-circle" class="p-button-rounded p-button-text"
                      v-tooltip="getFormattedComments(task)"/>
              <Button icon="pi pi-comment" class="p-button-rounded p-button-text" @click="toggle($event, day.id, task.id)"/>
              <OverlayPanel appendTo="body" ref="open" :showCloseIcon="true">
                <div style="display: flex" :key="index">
                  <input-text v-model="comment"></input-text>
                  <Button @click="addComment()">Add</Button>
                </div>
              </OverlayPanel>
              <Button icon="pi pi-check-square" class="p-button-rounded p-button-text p-button-success"
                      :disabled="isTaskDisabled(day)" @click="updateStatus(task.id, 'done')"/>
              <Button icon="pi pi-times" class="p-button-rounded p-button-text p-button-danger"
                      :disabled="isTaskDisabled(day)" @click="updateStatus(task.id, 'canceled')"/>
            </div>
          </div>
        </Panel>
      </div>
    </tab-panel>
    <tab-panel header="Past">
      <div class="day-task" v-for="(day, index) in pastTasks" :key="day.id + index">
        <Panel :toggleable="true" :collapsed="true" :header="getHeaderName(day)">
          <div class="person-task" v-for="(task, index) in day.tasks" :key="task.id">
            <div>
              <i :class="getIconClasses(task)"></i>
              <span style="padding-left: 10px"> {{ task.name }} </span>
            </div>
            <div class="person-tasks-actions">
              <Button icon="pi pi-info-circle" class="p-button-rounded p-button-text"
                      v-tooltip="getFormattedComments(task)"/>
              <Button icon="pi pi-comment" class="p-button-rounded p-button-text" :disabled="isTaskDisabled(day)"
                      @click="toggle($event, day.id, task.id)"/>
              <OverlayPanel appendTo="body" ref="open" :showCloseIcon="true">
                <div style="display: flex">
                  <input-text v-model="comment"></input-text>
                  <Button @click="addComment()">Add</Button>
                </div>
              </OverlayPanel>
              <Button icon="pi pi-check-square" class="p-button-rounded p-button-text p-button-success"
                      :disabled="isTaskDisabled(day)" @click="updateStatus(task.id, 'done')"/>
              <Button icon="pi pi-times" class="p-button-rounded p-button-text p-button-danger"
                      :disabled="isTaskDisabled(day)" @click="updateStatus(task.id, 'canceled')"/>
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

const emits = defineEmits(['updateTaskStatus', 'addCommentToTask', 'addTask']);

const open = ref();
const comment = ref('');
const selectedDayId = ref('');
const selectedTaskId = ref('');
const newTask = ref('');

const futureTasks = computed(() => {
  const today = new Date();
  const tdYear = today.getFullYear();
  const tdMonth = today.getMonth();
  const tdDay = today.getDay();
  return props.calendar.filter((task) => {
    const taskDate = new Date(task.date);
    const taskYear = taskDate.getFullYear()
    const taskMonth = taskDate.getMonth()
    const taskDay = taskDate.getDate()
    return new Date(taskYear, taskMonth, taskDay) >= new Date(tdYear, tdMonth, tdDay)
  })
})

const pastTasks = computed(() => {
  const today = new Date();
  const tdYear = today.getFullYear();
  const tdMonth = today.getMonth();
  const tdDay = today.getDay();
  return props.calendar.filter((task) => {
    const taskDate = new Date(task.date);
    const taskYear = taskDate.getFullYear()
    const taskMonth = taskDate.getMonth()
    const taskDay = taskDate.getDate()
    return new Date(taskYear, taskMonth, taskDay) < new Date(tdYear, tdMonth, tdDay)
  })
})

const getIconClasses = (task) => {
  if (task.status === 'done') return 'pi pi-check-square'
  if (task.status === 'canceled') return 'pi pi-times'
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
  return getDifferenceBeetweenDates(new Date(day.date), new Date()) < -3 || getDifferenceBeetweenDates(new Date(day.date), new Date()) > 1
}

const getFormattedComments = (task) => {
  if (Array.isArray(task?.comments) && task.comments.length) {
    return task.comments.reduce((prev, curr) => {
      return prev + curr.value + '\n'
    }, '')

  }
  return 'No comments for this task!';
}

const updateStatus = (taskId, status) => {
  emits('updateTaskStatus', taskId, status);
}

const addComment = () => {
  if (lastActiveIndex.value !== undefined) open.value[lastActiveIndex.value].hide();
  emits('addCommentToTask', selectedTaskId.value, comment.value);
}

const addTask = (dayId) => {
  emits('addTask', dayId, newTask.value);
  newTask.value = ''
}

const toggle = (event, dayId, taskId) => {
  selectedDayId.value = dayId
  selectedTaskId.value = taskId

  open.value[0].toggle(event);
};


</script>

<style>

</style>