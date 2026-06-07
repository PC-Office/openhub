<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <!-- 顶部导航 -->
    <nav class="top-nav">
      <RouterLink to="/" class="nav-brand">
        <span class="brand-icon">🔍</span>
        <span class="brand-text">OpenHub</span>
      </RouterLink>
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">搜索</RouterLink>
        <RouterLink to="/favorites" class="nav-link">
          ★ 收藏
        </RouterLink>
      </div>
    </nav>

    <!-- 页面内容 -->
    <RouterView />
  </div>
</template>

<style scoped>
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 880px;
  margin: 0 auto;
  padding: 14px 20px;
  border-bottom: 1px solid #e2e8f0;
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 20px;
  font-weight: 800;
  color: #1e293b;
}
.brand-icon { font-size: 22px; }
.nav-links {
  display: flex;
  gap: 6px;
}
.nav-link {
  padding: 6px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  transition: all 0.15s;
}
.nav-link:hover { background: #f1f5f9; color: #1e293b; }
.nav-link.router-link-active {
  background: #eef2ff;
  color: #4f46e5;
}
</style>
