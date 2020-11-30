const f = function() {
  console.log("1");
};
f;
f(); //1

const ff = function() {
  return function() {
    console.log("2");
  };
};
ff;
ff();
ff()(); //2
