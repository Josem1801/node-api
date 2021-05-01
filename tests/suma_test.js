const suma = (a, b) => {
    return a - b
}

// if(suma(0,0) !== 0){
//     new Error("suma of 0 and expected to be 0")
// }
console.log(suma(3,4))
console.assert(
    suma(1,3) === 4,
    'Suma of 1 and 3 expected to be 4'
)