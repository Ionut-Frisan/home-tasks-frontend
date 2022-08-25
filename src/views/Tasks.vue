<template>
  <div class="section-wrapper">
    <div class="task" style="margin-bottom: 20px;">
      <i class="pi pi-code" style="padding-right: 10px;"></i>
      <span class="p-float-label" style="width: 100%">
            <InputText id="name" type="text" v-model="newTask.name" style="width: 160%"/>
            <label for="name">Add new task</label>
      </span>
      <div class="task-actions">
        <Button icon="pi pi-plus" class="p-button-rounded p-button-text" @click="addTask"/>
      </div>
    </div>
    <task v-for="task in tasks"
          :task="task"
          :isEditable="true"
          @removeTask="removeTask"
          @updateTask="updateTask"
    ></task>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {onMounted} from "vue";
import axios from "axios";

import Task from "../components/Task.vue";
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import { useToast } from "primevue/usetoast";

const toast = useToast();

const tasks = ref([])

const newTask = ref({name: ''})

const onchange = (event) => {
  newTask.value.name = (event.target.value);
}

onMounted(async () => {
  tasks.value = (await axios.get('/tasks')).data;
})

const removeTask = async (id) => {
  const res = await axios.delete(`/tasks/${id}`);
  if(res.status === 200){
    tasks.value = tasks.value.filter((task) => task.id !== id);
    toast.add({severity:'success', summary: `Task was removed.`, life: 3000})
  }else toast.add({severity:'error', summary: `Something went wrong.`, life: 3000})
}
const updateTask = async (id, newTask) => {
  const res = await axios.put(`/tasks/${id}`, {
    task: newTask.value
  });

  if(res.status === 200){
    tasks.value = res.data;
    toast.add({severity:'success', summary: `Task was updated.`, life: 3000})
  } else toast.add({severity:'error', summary: `Something went wrong.`, life: 3000})
}

const addTask = async () => {
  const res = await axios.post('/tasks', {
    task: newTask.value
  })
  const oldData = tasks.value;
  tasks.value = res.data || oldData;
  if(res?.data){
    newTask.value.name = ''
    toast.add({severity:'success', summary: `Task was added.`, life: 3000})
  }else toast.add({severity:'error', summary: `Something went wrong.`, life: 3000})
}
</script>

<style>


</style>