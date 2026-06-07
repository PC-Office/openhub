<script setup>
import { useFavoritesStore } from '../stores/favorites.js'
import ProjectCard from '../components/ProjectCard.vue'

const favStore = useFavoritesStore()
</script>

<template>
<div class="favorites-page">
  <header class="page-header">
    <h1>★ 我的收藏</h1>
    <p v-if="favStore.favorites.length">共 {{ favStore.favorites.length }} 个项目</p>
  </header>

  <div v-if="favStore.favorites.length" class="fav-grid">
    <ProjectCard
      v-for="repo in favStore.favorites"
      :key="repo.id"
      :repo="repo"
    />
  </div>

  <div v-else class="empty-state">
    <div class="empty-icon">☆</div>
    <p>还没有收藏任何项目</p>
    <router-link to="/" class="go-search">去搜索 →</router-link>
  </div>
</div>
</template>

<style scoped>
.favorites-page {
  max-width: 880px;
  margin: 0 auto;
  padding: 32px 20px 60px;
}
.page-header h1 {
  font-size: 26px;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 4px;
}
.page-header p {
  font-size: 13px;
  color: #64748b;
  margin: 0 0 20px;
}
.fav-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.empty-state {
  text-align: center;
  padding: 64px 20px;
  color: #94a3b8;
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
  color: #e2e8f0;
}
.empty-state p {
  font-size: 15px;
  margin: 0 0 16px;
}
.go-search {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
}
.go-search:hover { text-decoration: underline; }
</style>
