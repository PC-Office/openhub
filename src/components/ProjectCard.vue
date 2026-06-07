<script setup>
import { useFavoritesStore } from '../stores/favorites.js'

const props = defineProps({
  repo: { type: Object, required: true }
})

const favStore = useFavoritesStore()

const langColors = {
  JavaScript: '#f1e05a', Python: '#3572A5', TypeScript: '#3178c6',
  Java: '#b07219', Go: '#00ADD8', Rust: '#dea584',
  'C++': '#f34b7d', C: '#555555', Ruby: '#701516',
  PHP: '#4F5D95', Swift: '#F05138', Kotlin: '#A97BFF'
}

function getLangColor(lang) {
  return langColors[lang] || '#8b949e'
}

function formatStars(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n
}

function openDetail() {
  window.open(props.repo.html_url, '_blank')
}
</script>

<template>
  <div class="project-card" @click="openDetail">
    <div class="card-header">
      <div class="repo-name">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="color:#6366f1;flex-shrink:0">
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-1 1v.25a.75.75 0 01-1.5 0V2.5zM7.25 9.5a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0v-1.5zM4.5 4.5a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3zm3.5 0a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3zm3.5 0a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3z"/>
        </svg>
        <span class="owner">{{ repo.owner.login }}</span>
        <span class="sep">/</span>
        <span class="name">{{ repo.name }}</span>
      </div>
      <button
        class="fav-btn"
        :class="{ active: favStore.isFavorite(repo.id) }"
        @click.stop="favStore.toggle(repo)"
        :title="favStore.isFavorite(repo.id) ? '取消收藏' : '收藏'"
      >{{ favStore.isFavorite(repo.id) ? '★' : '☆' }}</button>
    </div>

    <p class="description">{{ repo.description || '暂无描述' }}</p>

    <div class="card-meta">
      <span v-if="repo.language" class="meta-item lang">
        <span class="lang-dot" :style="{ background: getLangColor(repo.language) }"></span>
        {{ repo.language }}
      </span>
      <span class="meta-item">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.751.751 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>
        {{ formatStars(repo.stargazers_count) }}
      </span>
      <span class="meta-item">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 112.632 3.248l-3.345 3.445a2.25 2.25 0 01-3.257 0L2.37 8.87A2.25 2.25 0 115.5 5.372z"/></svg>
        {{ formatStars(repo.forks_count) }}
      </span>
      <span class="meta-item updated">{{ repo.updated_at?.slice(0,10) }}</span>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 18px 20px;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.15s;
}
.project-card:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.repo-name {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 15px;
  min-width: 0;
}
.owner { color: #6366f1; font-weight: 500; white-space: nowrap; }
.sep { color: #94a3b8; flex-shrink: 0; }
.name { color: #1e293b; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fav-btn {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #cbd5e1;
  transition: color 0.2s;
  padding: 2px 6px;
  flex-shrink: 0;
}
.fav-btn.active { color: #f59e0b; }
.fav-btn:hover { color: #f59e0b; }
.description {
  font-size: 13px;
  color: #64748b;
  margin: 0 0 12px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-meta {
  display: flex;
  gap: 14px;
  align-items: center;
  font-size: 12px;
  color: #64748b;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
.lang-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}
.updated { margin-left: auto; }
</style>
