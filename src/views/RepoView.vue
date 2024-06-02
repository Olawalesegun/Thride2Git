<template>
  <div class="repoD">
    <h1>REPO DETAILS</h1>
    <div v-if="repos && repos.length">
      <ul>
        <li v-for="repo in repos" :key="repo.id">
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

const firstPageData = inject('firstPageData');
console.log("CONTENT OF FIRST PAGE IN REPO", firstPageData.repos);

const reposPerPage = 5;
const currentPage = ref(1);
const totalRepos = computed(() => firstPageData.repos ? firstPageData.repos.length : 0);
const totalPages = computed(() => Math.ceil(totalRepos.value / reposPerPage));

const repos = computed(() => {
  if (!firstPageData.repos) {
    return [];
  }
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
ul{
  display: flex;
  gap: 5px;
  
}
li {
  list-style-type: none;
  border: 2px solid white;
  box-shadow: 2px 2px 10px 1px grey;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
}
.repoD{
  border: 2px solid white;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 20px 5px black;
}
h1{
  text-align: center;
}
p{
  margin-left: 20px;
}
</style>




<!-- <template>
  <div>
    <h1>REPO DETAILS</h1>
    <div v-if="repos && repos.length">
      <h3>WHAT IS PLAYING</h3>
      <ul>
        <li v-for="repo in repos" :key="repo.id">
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
  const totalRepos = computed(() => firstPageData.repos ? firstPageData.repos.length : 0);
  // const totalPages = computed(() => Math.ceil(totalRepos.value / reposPerPage));

  const repos = computed(() => {
    if (!firstPageData.repos) {
      return []; // Return an empty array if repos is null
    }
    const startIndex = (currentPage.value - 1) * reposPerPage;
  return firstPageData.repos.slice(startIndex, startIndex + reposPerPage);
  })

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
</style> -->