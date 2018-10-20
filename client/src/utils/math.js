const price = 124.8
const rate = 2.75/100
const divYield = 3.37/100


let forward = price * (Math.E) ** (rate-divYield)
let forw = forward.toFixed(2);
console.log(forw);
