// import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'

// export const useDataStore = defineStore({
//   id: 'data',
//   state: () => ({
//     userName: 'Default1',
//     bio: "This Profile has no bio",
//     urlEntered: '',
//     fetchedData: {},
//     createdAt: '24-May-2016',
//     // dateJoined: dateComputed,
//     reposCount: 0,
//     followersCount: 0,
//     followingCount: 0,
//     pfp: malePlaceholder,
//     status: false,
//     repos: null
//   }),
//   actions: {
//     handleSubmission() {
//       axios(`https://api.github.com/users/${firstPageData.urlEntered}`)
//         .then((res) => {
//           this.fetchedData = res.data;
//           console.log(this.fetchedData);
//           console.log(typeof (res.data));
//           console.log(res.data.url);
//           firstPageData.createdAt = date();
//           initializeState(firstPageData.fetchedData, firstPageData);
//           console.log(firstPageData.createdAt);
//         }) 
//     },
//     initializeState(from, to) {
//       to.followersCount = from.followers;
//       to.reposCount = from.public_repos;
//       to.followingCount = from.following;
//       to.bio = from.bio;
//       to.pfp = from.avatar_url;
//       to.userName = from.login;
//       if (to.repos == null) {
//           to.repos = from.repos_url;
//           to.status = true;
//       }
//       provide('firstPageData', firstPageData);
//       console.log('Provided firstPageData:', firstPageData);
//     },
//     date(){
//       const newDate = firstPageData.fetchedData.created_at;
    
//       const newDateVal = newDate.split('-');
//       const newMonthVal = newDateVal[1];
//       console.log(newMonthVal);
//       const day = parseInt(newDateVal[2]);
//       console.log("Debugging: ");
//       console.log(day);
//       const year = newDateVal[0];
//       const monthVal = ['Jan', 'Feb', 'March', 'April', 'May', 'June',
//         'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
//       ];
//       const month = monthVal[parseInt(newMonthVal) - 1];
//       console.log("Trying to see:: ")
//       console.log(year, month, day)
    
//       return `${day}-${month}-${year}`;
//     }
//   }
// })