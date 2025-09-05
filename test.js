const createElements =(arr)=>{
    // console.log(arr);
    const htmlElements = arr.map(el=> `<span class="btn">${el}</span>`)
        console.log(htmlElements.join(" "));
}

const synonyms = ['helllo', 'hi', 'konni']
createElements(synonyms)
