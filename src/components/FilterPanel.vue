<script setup>
const props = defineProps({
  language: String,
  minStars: Number,
  sortBy: String
})

const emit = defineEmits(['update:language', 'update:minStars', 'update:sortBy', 'search'])

const languages = [
  '', 'JavaScript', 'Python', 'TypeScript', 'Java', 'Go',
  'Rust', 'C++', 'C', 'Ruby', 'PHP', 'Swift', 'Kotlin'
]

function onSearch() {
  emit('search')
}
</script>

<template>
  <div class="filter-panel">
    <div class="filter-group">
      <label>语言</label>
      <select :value="language" @change="emit('update:language', $event.target.value)">
        <option value="">全部</option>
        <option v-for="lang in languages.slice(1)" :key="lang" :value="lang">{{ lang }}</option>
      </select>
    </div>
    <div class="filter-group">
      <label>最低 Stars</label>
      <select :value="minStars" @change="emit('update:minStars', Number($event.target.value))">
        <option :value="0">不限</option>
        <option :value="10">10+</option>
        <option :value="100">100+</option>
        <option :value="1000">1k+</option>
        <option :value="10000">10k+</option>
      </select>
    </div>
    <div class="filter-group">
      <label>排序</label>
      <select :value="sortBy" @change="emit('update:sortBy', $event.target.value)">
        <option value="best-match">最佳匹配</option>
        <option value="stars">Stars 最多</option>
        <option value="updated">最近更新</option>
        <option value="forks">Forks 最多</option>
      </select>
    </div>
    <button class="filter-search-btn" @click="onSearch">筛选</button>
  </div>
</template>

<style scoped>
.filter-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-end;
  background: #fff;
  border-radius: 14px;
  padding: 16px 20px;
  border: 1px solid #e2e8f0;
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.filter-group label {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}
.filter-group select {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  color: #1e293b;
  cursor: pointer;
}
.filter-search-btn {
  padding: 8px 20px;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.filter-search-btn:hover { background: #4338ca; }
</style>
