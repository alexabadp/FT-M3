let promiseA = new Promise(function (resolve, reject) {
  //   setTimeout(() => {
  //     let caramelos = Math.random() * 600;
  //     if (caramelos > 300)
  //       resolve({ value: caramelos, info: "me resolví correctamente" });
  //     else reject({ value: caramelos, info: "me rechace con el valor indicado" });
  //   }, 1000);
  reject({ value: 500, info: "no me resolví correctamente" });
});

// console.log(promiseA);

// promiseA.then (sH, eH)
// promiseA.then(a => console.log(a), b => console.log(b))
// sH -> si la promiseA fue resuelta en a recibe el valor de la resolucion
// eH -> si la promiseA fue resuelta en b recibe el valor de la rechazo

// promiseA.then(a => console.log(a),b => console.log(b);
// promiseA.then(a => console.log(a.info), b => console.log(b.info));
// promiseA.then(a => console.log(a.ivalue + 300), b => console.log(b.info));

// -------------------------------------------------------------------------
// promiseA -> {pending, fulfilled, reject}
// promiseA -> {undefined, value, reason}
// promiseA -> then(functionSH, functionEH)

// let promiseB = promiseA.then((sH) => console.log(sH), (eH = console.log(eH)));

// promiseA -> fulfilled -> value

// promiseA.then(
//   (a) => console.log(a), // success
//   (e) => console.log("error") // error
// );

promiseA
  .then(
    (a) => Error(a),
    (e) => {
      console.log("error manejado por A", e);
      return e;
    }
  )
  .then((a) => console.log(a), null)
  .then(null /* esto tira error*/, (e) => console.log("error"))
  .then(null, (e) => console.log(a));

// fetch(url){
//     return new Promise(function(resolve, reject){

//     })
// }
