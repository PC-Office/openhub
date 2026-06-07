import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref(JSON.parse(localStorage.getItem('openhub_favorites') || '[]'))

  const favoriteIds = computed(() => new Set(favorites.value.map(f => f.id)))

  function save() {
    localStorage.setItem('openhub_favorites', JSON.stringify(favorites.value))
  }

  function toggle(repo) {
    const idx = favorites.value.findIndex(f => f.id === repo.id)
    if (idx >= 0) {
      favorites.value.splice(idx, 1)
    } else {
      favorites.value.push({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        owner: repo.owner
      })
    }
    save()
  }

  function isFavorite(id) {
    return favoriteIds.value.has(id)
  }

  function remove(id) {
    favorites.value = favorites.value.filter(f => f.id !== id)
    save()
  }

  return { favorites, favoriteIds, toggle, isFavorite, remove }
})
