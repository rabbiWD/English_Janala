// synonym modal
const createElements =(arr)=>{
    // console.log(arr);
    const htmlElements = arr.map(el=> `<span class="btn">${el}</span>`)
        return htmlElements.join(" ");
}
// sound section
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


// loading/spinner
const manageSpinner=(status)=>{
    if(status == true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }else{
         document.getElementById('word-container').classList.remove('hidden');
         document.getElementById('spinner').classList.add('hidden');
    }
}

const loadLesson=()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')//promise of response
    .then(res => res.json())// promise of json data
    .then((json) =>displayLesson(json.data))
};

const removeActive =()=>{
    const lessonButtons = document.querySelectorAll('.lesson-btn')
    // console.log(lessonButtons);
    lessonButtons.forEach(btn=>btn.classList.remove('active'))
}

const loadLevelWord=(id)=>{
    manageSpinner(true);
    // console.log(id);
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=> {
        removeActive(); //remove all active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        // console.log(clickBtn);
        clickBtn.classList.add('active') // add active class
        displayLevelWord(data.data)
        // console.log(data.data);
    })
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
         manageSpinner(false)
        return;
    }
// if word.length != 0 then below cede apply
    words.forEach(word => {
        console.log(word);
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word:"শব্দ পাওয়া যায় নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning:"অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায় নি"}"</div>
            <div class="flex justify-between items-center">
                <button onclick = "loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card); 
    });
    manageSpinner(false)
}

const loadWordDetail = async(id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url);
    const res =await fetch(url);
    const deatils = await res.json();
    displaywordDetails(deatils.data);
}

const displaywordDetails = (word)=>{
    console.log(word);
    const deatilsBox = document.getElementById('details-container');
    deatilsBox.innerHTML =`
          <div class="">
        <h2 class="text-2xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
      </div>
          <div class="">
         <h2 class="font-bold">Meaning</h2>
         <p>${word.meaning}</p>
      </div>
      <div class="">
      <h2 class="font-bold">Example</h2>
      <p>${word.sentence}</p>
     </div>
     <div class="">
      <h2 class="font-bold">Synonym</h2>
        <div class="">${createElements(word.synonyms)}</div>
    </div>
    
    `
    document.getElementById('word_modal').showModal();
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
         <button id="lesson-btn-${lesson.level_no}" 
         onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
         `
    // 4. append into container
        levelContainer.append(btnDiv)
    } 
}

loadLesson();
// Inpur search btn
document.getElementById('btn-search').addEventListener("click",()=>{
    removeActive();
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res=>res.json())
    .then((data)=>{
        const allWords = data.data;
        console.log(allWords);
        const filterWords = allWords.filter(word=> word.word.toLowerCase().includes(searchValue));
        displayLevelWord(filterWords)
    })
})