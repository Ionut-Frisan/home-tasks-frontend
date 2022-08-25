<template>
  <div class="task">
    <i class="pi pi-code" style="padding-right: 10px;"></i>
    <span class="name" v-if="!showInput">{{props.task.name}}</span>
    <InputText :value="val" @input="onchange" type="text" class="p-inputtext-sm" style="width: 60% " v-if="showInput"></InputText>
    <div class="task-actions">
      <Button icon="pi pi-save" class="p-button-rounded p-button-text" v-if="showInput" @click="onUpdateTask"/>
      <Button :icon="editButtonIconClass" class="p-button-rounded p-button-text" @click="inputMode = !inputMode"/>
      <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="emit('removeTask', props.task.id)"/>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import axios from "axios";

const props = defineProps({
  task: Object,
  isEditable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['updateTask', 'removeTask']);

const val = ref(props.task.name);
const inputMode = ref(false);

const updatedValue = computed(() => {
  console.log(val.value);
  return {...props.task, name: val.value};
})

const showInput = computed(() => {
  return props.isEditable && inputMode.value;
})

const editButtonIconClass = computed(() => {
  return showInput.value ? 'pi pi-times-circle' : 'pi pi-pencil'
})

const onUpdateTask = () => {
  emit('updateTask', props.task.id, updatedValue);
  inputMode.value = false;
}

const onchange = (event) => {
  val.value = (event.target.value);
}

</script>

<style>


</style>