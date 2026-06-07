import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
})

// 搜索仓库
export function searchRepos(params) {
  return api.get('/search/repositories', {
    params: {
      q: params.q,
      sort: params.sort || 'best-match',
      order: params.order || 'desc',
      per_page: params.per_page || 20,
      page: params.page || 1
    }
  })
}

// 获取仓库详情
export function getRepo(owner, repo) {
  return api.get(`/repos/${owner}/${repo}`)
}

// 获取 README
export function getReadme(owner, repo) {
  return api.get(`/repos/${owner}/${repo}/readme`, {
    headers: { 'Accept': 'application/vnd.github.v3.raw+json' },
    responseType: 'text'
  }).catch(() => ({ data: null }))
}
