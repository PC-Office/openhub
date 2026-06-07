<script setup>
import { onMounted } from 'vue'
import { useSearchStore } from '../stores/search.js'
import { useFavoritesStore } from '../stores/favorites.js'
import SearchBar from '../components/SearchBar.vue'
import FilterPanel from '../components/FilterPanel.vue'
import ProjectCard from '../components/ProjectCard.vue'

const searchStore = useSearchStore()
const favStore = useFavoritesStore()

function onSearch(q) {
  searchStore.query = q
  searchStore.doSearch(1)
}

function onFilterSearch() {
  searchStore.doSearch(1)
}

function goPage(p) {
  if (p < 1 || p > searchStore.totalPages) return
  searchStore.doSearch(p)
}
</script>

<template>
<div class="home">
  <!-- 头部 -->
  <header class="hero">
    <h1>🔍 OpenHub</h1>
    <p>搜索发现优质开源项目</p>
  </header>

  <!-- 搜索栏 -->
  <SearchBar @search="onSearch" />

  <!-- 筛选面板 -->
  <FilterPanel
    :language="searchStore.language"
    :minStars="searchStore.minStars"
    :sortBy="searchStore.sortBy"
    @update:language="searchStore.language = $event"
    @update:minStars="searchStore.minStars = $event"
    @update:sortBy="searchStore.sortBy = $event"
    @search="onFilterSearch"
  />

  <!-- 错误提示 -->
  <div v-if="searchStore.error" class="msg error">
    {{ searchStore.error }}
  </div>

  <!-- 加载中 -->
  <div v-else-if="searchStore.loading" class="msg loading">
    <div class="spinner"></div>
    搜索中...
  </div>

  <!-- 搜索结果 -->
  <template v-else-if="searchStore.results.length">
    <div class="results-header">
      <span>找到约 <b>{{ searchStore.total.toLocaleString() }}</b> 个结果</span>
    </div>
    <div class="results-grid">
      <ProjectCard v-for="repo in searchStore.results" :key="repo.id" :repo="repo" />
    </div>

    <!-- 分页 -->
    <div class="pagination" v-if="searchStore.totalPages > 1">
      <button :disabled="searchStore.page <= 1" @click="goPage(searchStore.page - 1)">上一页</button>
      <span class="page-info">{{ searchStore.page }} / {{ searchStore.totalPages }}</span>
      <button :disabled="searchStore.page >= searchStore.totalPages" @click="goPage(searchStore.page + 1)">下一页</button>
    </div>
  </template>

  <!-- 空状态 -->
  <div v-else-if="searchStore.query" class="msg empty">
    没有找到相关项目，换个关键词试试？
  </div>
  <div v-else class="msg welcome">
    👆 输入关键词开始搜索，如 <code>vue</code> <code>machine learning</code>
  </div>
</div>
</template>

<style scoped>
.home {
  max-width: 880px;
  margin: 0 auto;
  padding: 32px 20px 60px;
}
.hero {
  text-align: center;
  margin-bottom: 28px;
}
.hero h1 {
  font-size: 32px;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 6px;
}
.hero p {
  color: #64748b;
  font-size: 15px;
  margin: 0;
}
.results-header {
  margin: 20px 0 12px;
  font-size: 13px;
  color: #64748b;
}
.results-header b { color: #1e293b; }
.results-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.msg {
  text-align: center;
  padding: 48px 20px;
  font-size: 15px;
  border-radius: 14px;
  margin-top: 20px;
}
.msg.error {
  background: #fef2f2;
  color: #dc2626;
}
.msg.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #6366f1;
  background: #f5f3ff;
}
.spinner {
  width: 20px; height: 20px;
  border: 2px solid #e0e7ff;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.msg.empty { background: #fefce8; color: #92400e; }
.msg.welcome { background: #f8fafc; color: #64748b; }
.msg.welcome code {
  background: #e0e7ff;
  color: #4338ca;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 13px;
  margin: 0 4px;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 28px;
}
.pagination button {
  padding: 8px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  color: #1e293b;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
}
.pagination button:hover:not(:disabled) {
  background: #4f46e5;
  color: #fff;
  border-color: #4f46e5;
}
.pagination button:disabled { opacity: 0.4; cursor: not-allowed; }
.page-info { font-size: 14px; color: #64748b; }
</style>
