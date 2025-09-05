const loadLesson=()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')//promise of response
    .then(res => res.json())// promise of json data
    .then((json) =>displayLesson(json.data))
};

const loadLevelWord=(id)=>{
    // console.log(id);
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayLevelWord(data.data))
}

const displayLevelWord = (words)=>{
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';
    
    if(words.length == 0){
        // alert("no word detected");
         wordContainer.innerHTML = `
         <div class="text-center bg-sky-100 col-span-full rounded-xl py-10">
            <img class="mx-auto" src="./assets/alert-error.png"/>
            <p class="font-xl font-bangla font-medium text-gray-400 space-y-6">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
        

         `
        return
    }

    
// id: 83
// level:1
// meaning:"দরজা"
// pronunciation: "ডোর"
// word: "Door"

    words.forEach(word => {
        console.log(word);
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word:"শব্দ পাওয়া যায় নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning:"অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায় নি"}"</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    });

}

const displayLesson = (lessons) =>{
    // console.log(lessons);
    // 1.get the container & empty
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';
    // 2. get the every lessons
    for(let lesson of lessons){
         // 3.create Element
         const btnDiv = document.createElement('div');
         btnDiv.innerHTML = `
         <button onclick ="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
         `
    // 4. append into container
        levelContainer.append(btnDiv)
    }
}

loadLesson()