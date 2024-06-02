<template>
  <div>
    <h1>REPO DETAILS</h1>
    <div v-if="firstPageData.repos">
      <h3>WHAT IS PLAYING</h3>
      <ul>
        <li v-for="repo in firstPageData.repos" :key="repo.id">
          {{ repo.name }}
          <a :href="repo.html_url">Link To: {{ repo.name }} Repo</a>
        </li>
      </ul>
      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
    <div v-else>
      <p>Nothing to show for now as no username entered</p>
    </div>
  </div>


</template>

<script setup>
  import { inject, ref, computed, onMounted } from 'vue';

  const firstPageData = inject('firstPageData')
  console.log("CONTENT OF FIRST PAGE IN REPO", firstPageData.repos)


  const reposPerPage = 5; 
  const currentPage = ref(1);
  const totalRepos = computed(() => firstPageData.repos.length);
  const totalPages = computed(() => Math.ceil(totalRepos.value / reposPerPage));

  const repos = computed(() => {
    const startIndex = (currentPage.value - 1) * reposPerPage;
    return firstPageData.repos.slice(startIndex, startIndex + reposPerPage);
  });

  function changePage(page) {
    if (page < 1 || page > totalPages.value) {
      return;
    }
    currentPage.value = page;
  }

  
</script>

<style scoped>

  li{
    list-style-type: none;
  }

  .pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
}
</style>