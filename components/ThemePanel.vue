<template>
    <div class="p-4 bg-gray-100">
      <div class="max-w-md mx-auto">
        <h2 class="text-lg font-semibold mb-4">Customize Colors</h2>
        
        <div class="mb-4">
          <label class="block mb-2">Background Color:</label>
          <input type="color" v-model="backgroundColor" class="rounded-md border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none">
        </div>
  
        <div class="mb-4">
          <label class="block mb-2">Text Color:</label>
          <input type="color" v-model="textColor" class="rounded-md border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        backgroundColor: '',
        textColor: ''
      };
    },
    watch: {
      backgroundColor(newColor) {
        document.body.style.backgroundColor = newColor;
      },
      textColor(newColor) {
        document.body.style.color = newColor;
      }
    }
  };
  </script>
  