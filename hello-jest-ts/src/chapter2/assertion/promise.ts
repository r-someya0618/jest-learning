const doSomethingAsync = () => {
  return new Promise((resolve, reject) => {
    // 非同期の処理が成功したときはresolve()を呼ぶ
    setTimeout(() => {
      resolve(true);
    }, 1000);
    // 非同期の処理が成功したときはreject()を呼ぶ
    setTimeout(() => {
      reject(false);
    }, 1000);
  });
};

const successCallback = () => {
  console.log('成功した');
};
const failureCallback = () => {
  console.log('失敗した');
};

//  thenとcatchを利用した例
doSomethingAsync().then(successCallback).catch(failureCallback);

// thenのみを利用した例
doSomethingAsync().then(successCallback, failureCallback);
