<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])
const searchQuery = ref('')

function onSearch() {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
  }
}
</script>

<template>
  <div class="search-bar">
    <div class="search-input-wrap">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索开源项目，如：machine learning、vue、react..."
        @keyup.enter="onSearch"
      />
      <button @click="onSearch" :disabled="!searchQuery.trim()">搜索</button>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
}
.search-input-wrap {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 6px 12px;
  transition: border-color 0.2s;
}
.search-input-wrap:focus-within {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
}
.search-icon {
  width: 20px;
  height: 20px;
  color: #94a3b8;
  flex-shrink: 0;
}
input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  padding: 10px 12px;
  background: transparent;
  color: #1e293b;
}
input::placeholder { color: #94a3b8; }
button {
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}
button:hover:not(:disabled) { background: #4338ca; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
