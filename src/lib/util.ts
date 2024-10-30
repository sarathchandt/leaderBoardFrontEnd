export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=\S)(?=.{6,})\S+$/;
  return passwordRegex.test(password);
};

export function validateAdmin(input) {
  const regex = /^(?!.*[!@#$%^&*(),.?":{}|<>])(?=\S).+$/;
  return regex.test(input);
}

export function numberTest(num) {
  const numberRegex = /^\d+$/;
  return numberRegex.test(num);
}

export const reArangeArray = (arr, newScore, currentPosition) => {
  let newArr = [...arr];
  let elementToInsert = {
    ...newArr[currentPosition],
    score: newScore,
  };

  newArr.splice(currentPosition, 1);
  console.log(newArr);

  for (let i = 0; i < newArr.length; i++) {
    if (newArr[i].score < newScore ) {
      return {
        arr: [...newArr.slice(0, i), elementToInsert, ...newArr.slice(i)],
        index: i,
      };
    }
    if(newArr[i].score === newScore){
        if(newArr[i].name[0] > elementToInsert.name[0]){
            return {
                arr: [...newArr.slice(0, i), elementToInsert, ...newArr.slice(i)],
                index: i,
              };
        }
    }
  }

  return { arr: [...newArr, elementToInsert], index: newArr.length  };
};
