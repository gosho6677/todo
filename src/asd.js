let arr = [
    {id: 1},
    {id: 2},
    {id: 3}
]

let id = 2

arr.forEach(n => {
    if(n === 2) delete n
})