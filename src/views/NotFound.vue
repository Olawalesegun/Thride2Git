<template>
    <div class="not-found">
        <h2> Welcome to: </h2>
        <h1>ERROR 404!! </h1>
        <p>Page Not Found My brother. Ma FOH!!</p>
        <router-link to="/">Go Home</router-link>
    </div>
</template>

<script>
export default {
    name: "NotFound"
}
</script>

<style scoped>
.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 85vh;
}

h1 {
    color: red;
}
</style>