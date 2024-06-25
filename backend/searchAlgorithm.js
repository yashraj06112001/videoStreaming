function func(string1, string2) {
  let len1 = string1.length;
  let len2 = string2.length;
  let refer = Math.min(len1, len2);
  let dp = new Array(len2).fill(0).map(() => new Array(len1).fill(0));

  if (string1[0] === string2[0]) {
    dp[0][0] = 1;
    for (let i = 1; i < len1; i++) {
      dp[0][i] = 1;
    }
    for (let i = 1; i < len2; i++) {
      dp[i][0] = 1;
    }
  } else {
    dp[0][0] = 0;
    let check1 = false;
    for (let i = 1; i < len1; i++) {
      if (string1[i] === string2[0]) {
        dp[0][i] = 1;
        check1 = true;
      } else {
        dp[0][i] = check1 ? 1 : 0;
      }
    }

    let check2 = false;
    for (let i = 1; i < len2; i++) {
      if (string1[0] === string2[i]) {
        dp[i][0] = 1;
        check2 = true;
      } else {
        dp[i][0] = check2 ? 1 : 0;
      }
    }
  }

  for (let i = 1; i < len2; i++) {
    for (let j = 1; j < len1; j++) {
      if (string1[j] === string2[i]) {
        let a = dp[i - 1][j - 1] + 1;
        if (a > i + 1) {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        } else {
          dp[i][j] = a;
        }
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  for (let i = 0; i < len2; i++) {
    let row = "";
    for (let j = 0; j < len1; j++) {
      row += dp[i][j] + " ";
    }
    console.log(row);
  }

  return dp[len2 - 1][len1 - 1];
}
module.exports = func;
