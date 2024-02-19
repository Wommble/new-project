// function sortAlpha(word) {
//   let joined = [];
//   let sorted = {};
//   for (i = 0; i < word.length; i++) {
//     let sorting = word[i].split("").sort().join("");
//     joined.push(sorting);
//   }

//   for (i = 0; i < joined.length; i++) {
//     // for (f = i; f < joined.length; f++) {
//     //   sorted.push([joined[f]]);
//     // if (joined[i] == joined[f] && i != f) {
//     //   sorted[i][0] += word[f];
//     // } else {
//     //   sorted.push([word[i]]);
//     // }
//     // }
//     if (sorted[joined[i]]) {
//       sorted[joined[i]] = [...sorted[joined[i]], word[i]];
//     } else {
//       sorted[joined[i]] = [word[i]];
//     }
//   }
//   console.log(sorted);
// }

// let randomWord = ["eat", "tea", "tan", "ate", "nat", "bat"];
// sortAlpha(randomWord);
