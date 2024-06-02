<template>
  <div class="wholeBody">

    <div class="firstHead">
      <h3 id="git">Github</h3>
      <span class="firstHead2">
        @ThrideGit
        <img href="">
      </span>
    </div>
    <div class="searchCon">
      <img :src="search" alt="">
      <input type="text" name="" id="inp" @change="handleInput" placeholder="Search For Your Preffered username...">
      <button @click="handleSubmission" id="submit">Submit</button>
    </div>

    <section class="main">
      <div class="inner1">
        <img :src="firstPageData.pfp" alt="" class="reduceImg">
        <span class="inner1Span">
          <h4>{{ firstPageData.userName }}</h4>
          <span>@status</span>
          <p id="bio">{{ firstPageData.bio }}</p>
        </span>
        <h3 id="join"> Joined {{ firstPageData.createdAt }}</h3>
      </div>
      <section class="listCount">
        <span class="inRepo inRepo1">
          <RouterLink to="/repos" v-if="firstPageData.status">
            <h4>Repos</h4>
          </RouterLink>
          <h4 v-else>Repos</h4>
          <h3>{{ firstPageData.reposCount }}</h3>
        </span>
        <span class="inRepo inRepo2">
          <h4>Followers</h4>
          <h3>{{ firstPageData.followersCount }}</h3>
        </span>
        <span class="inRepo inRepo3">
          <h4>Following</h4>
          <h3>{{ firstPageData.followingCount }}</h3>
        </span>
      </section>
      <div class="lastCount">
        <div class="inLastCount1">
          <span>
            <img :src="locationSign" alt="">
            <p>nill</p>
          </span>
          <span>
            <img :src="link" alt="">
            <p>nill</p>
          </span>
        </div>

        <div class="inLastCount2">
          <span>
            <img :src="twitter" alt="">
            <p>none</p>
          </span>
          <span>
            <img :src="officeBuilding" alt="">
            <p>https://</p>
          </span>
        </div>
      </div>
    </section>
    <RepoView v-model="firstPageData.repos"/>
  </div>
</template>


<script setup>

import { reactive, provide } from 'vue';
import axios from 'axios';
import malePlaceholder from '@/assets/malePlaceholder.jpeg';
import link from '@/assets/link.svg';
import locationSign from '@/assets/locationSign.svg';
import officeBuilding from '@/assets/officeBuilding.svg';
import search from '@/assets/search.svg';
import twitter from '@/assets/twitter.svg';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import RepoView from './RepoView.vue';


// const router = useRouter();


const firstPageData = reactive({
  userName: 'Default1',
  bio: "This Profile has no bio",
  urlEntered: '',
  fetchedData: {},
  createdAt: '24-May-2016',
  reposCount: 0,
  followersCount: 0,
  followingCount: 0,
  pfp: malePlaceholder,
  status: false,
  repos: null,
  location: null,

})
const handleInput = (e) => {
  const input = e.target.value;
  firstPageData.urlEntered = input;
  e.target.value = ' ';
}

async function handleSubmission() {
  try {
    await axios(`https://api.github.com/users/${firstPageData.urlEntered}`)
      .then((res) => {
        firstPageData.fetchedData = res.data;
        console.log("FETCHED DATA: ", firstPageData.fetchedData);

        console.log(typeof (res.data));
        console.log(res.data.url);
        firstPageData.createdAt = date();
        initializeState(firstPageData.fetchedData, firstPageData);
        console.log(firstPageData.createdAt);
        handleRepoListing();
      })
  }
  catch (err) {
    console.log(err);
  }
}

function initializeState(from, to) {
  to.followersCount = from.followers;
  to.reposCount = from.public_repos;
  to.followingCount = from.following;
  to.bio = from.bio;
  to.pfp = from.avatar_url;
  to.userName = from.login;
  to.location = from.location;

  if (to.repos == null) {
    to.repos = from.repos_url;
    to.status = true;
  }
  console.log('Provided firstPageData:', firstPageData);
}

const date = () => {
  const newDate = firstPageData.fetchedData.created_at;

  const newDateVal = newDate.split('-');
  const newMonthVal = newDateVal[1];
  console.log(newMonthVal);
  const day = parseInt(newDateVal[2]);
  console.log("Debugging: ");
  console.log(day);
  const year = newDateVal[0];
  const monthVal = ['Jan', 'Feb', 'March', 'April', 'May', 'June',
    'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];
  const month = monthVal[parseInt(newMonthVal) - 1];
  console.log("Trying to see:: ")
  console.log(year, month, day)

  return `${day}-${month}-${year}`;
}

// if (firstPageData.fetchedData != null) {
//   provide('firstPageData', firstPageData);
// }
async function handleRepoListing() {
  try {
    await axios(`https://api.github.com/users/${firstPageData.urlEntered}/repos`)
      .then((res) => {
        firstPageData.repos = res.data;
        console.log("Repo DETAILS:: ", firstPageData.repos);
      })
  }
  catch(err){
    console.log(err.message);
  }
  }

  provide("firstPageData", firstPageData)

</script>

<style scoped>
.wholeBody {
  width: 50%;
  border: 5px solid black;
  font-size: 12px;
  margin-left: 20%;
  margin-top: 10%;
}

.firstHead {
  /* box-shadow: 2px 2px 20px 5px black; */
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  /* margin-bottom: 3px */
}

.firstHead2 {
  display: inline-block;
  margin-top: 16px;
  margin-left: 76%;
}

.main {
  margin-top: 20px;
  border: 2px solid white;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  box-shadow: 5px 5px 20px 2px black;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 20px;
}

.searchCon {
  background-color: aqua;
  margin-left: 10px;
  margin-right: 10px;
  box-shadow: 5px 5px 20px 2px black;
}

#inp {
  width: 50%;
  background-color: aqua;
  border: 1px solid aqua;
  margin: 10px;

}

#submit {
  margin-left: 25%;
}

.listCount {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20%;
  margin-right: 20%;
  gap: 10px;
  font-size: 20px;
  padding: 10px;
  background-color: antiquewhite;
  box-shadow: 20px 10px 38px rgb(48, 80, 103);
  border-radius: 13px;
}

.inner1 {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.inner1Span {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-left: 15px;
}

.reduceImg {
  width: 10em;
  border-radius: 50%;
  margin-top: 5px;
}

#bio {
  margin-top: 20px;
}

#join {
  margin-left: 30px;
  margin-top: 19px;
  flex-wrap: nowrap;
}

h3 {
  text-align: center;
}

.inRepo {
  margin-left: 3px;
}

img {
  width: 10px;
  margin-left: 5px;
}

.lastCount {
  display: flex;
  flex-direction: row;
  gap: 50%;
  margin-top: 15px;
  margin-left: 104px;
}

.inLastCount1 {
  display: flex;
  flex-direction: column;
}
</style>