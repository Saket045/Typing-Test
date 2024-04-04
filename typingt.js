const typingtext=document.querySelector(".typing-text p");
const input=document.querySelector(".wrapper .input-field");
const time=document.querySelector(".time span b");
const mistakes=document.querySelector(".mistakes span");
const wpm=document.querySelector(".wpm span");
const cpm=document.querySelector(".cpm span");
const btn=document.getElementById("try");
const rul=document.getElementById('rul');
const exit=document.getElementById('exit');
let timer;
let maxtime=30;
let timeleft=maxtime;
let charindex=0;
let mistake=0;
let istyping=false;
function loadingpara(){//
    //This code defines a function called loadingpara(). This function is used to set the inner HTML of the element
    // with the class typing-text by randomly selecting a string from an array of 6 different sentences.
    //It starts by creating an array of sentences named para. Then, it generates a random index number to select 
    //one of the sentences. The typingtext.innerHTML property is set to an empty string, and then a loop is used to add each 
    //character of the selected sentence as a separate span element inside the typingtext element.
    const para=[" Avoid daydreaming about the years to come.","You are the most important person in your whole life.","Always be true to who you are, and ignore what other people have to say about you.","Always be true to who you are, and ignore what other people have to say about you.","Only demonstrate your strength when it’s really required.","Subscribe to Drop X Out"
];
const randomindex=Math.floor(Math.random()*para.length);
typingtext.innerHTML='';
for(const char of para[randomindex]){
    console.log(char);
    typingtext.innerHTML+=`<span>${char}</span>`;
}
typingtext.querySelectorAll('span')[0].classList.add('active');
document.addEventListener("keydown",()=>input.focus());
typingtext.addEventListener("click",()=>{
    input.focus();
})
}
function initTyping(){//It appears that the two code snippets you provided are identical. Both define a function 
    //called initTyping(). This function is used to check if the user's input matches the next character in the text
    // they are trying to type. The function selects all the span elements inside the element with the class 
    //typing-text.
    // The charindex variable is used to keep track of the current index of the character being typed in the text.
    // If the charindex is less than the number of characters in the text and the timeleft is greater than zero, 
    //the function will start the timer and set the istyping variable to true using the setInterval() method. 
    //This will call the initTime() function every 1000ms.
    //If the character at the current charindex matches the first character of the user's input, the function will
    // add the class correct to the corresponding span element, and log "correct" to the console.
   // If the characters don't match, the function will add the class incorrect to the corresponding span element,
   // log "incorrect" to the console and increment the mistake variable.
   // Then the charindex is incremented and the next character is made active, and the mistakes and cpm elements
   // are updated to reflect the current number of mistakes and characters per minute.
    // If the charindex is greater than or equal to the number of characters in the text or the timeleft is less
    // than or equal to zero, the function will clear the timer and reset the input.value to an empty string.
    const char=typingtext.querySelectorAll('span');
    const typedchar=input.value.charAt(charindex);
      if(charindex<char.length && timeleft>0){
        if(!istyping){
            istyping=true;
            timer=setInterval(initTime,1000)
        }
        if(typedchar===char[charindex].innerText){
            char[charindex].classList.add('correct')
        }
        else{
            char[charindex].classList.add('incorrect');
            mistake++;
        }
        charindex++;
        mistakes.innerText=mistake;
         const CPM=charindex-mistake;
        cpm.innerText=CPM;
        char[charindex].classList.add('active');
    }
   
     else{
        clearInterval(timer);
        input.value='';
     }
     
}
function initTime(){ 
    if(timeleft>0){
        timeleft--;
        time.innerText=timeleft;
        let wpmval=Math.round(((charindex-mistake)/5)/(maxtime-timeleft)*60);
        wpm.innerText=wpmval;
    }
    else{
        clearInterval(timer);
    }
}
function reset(){
    loadingpara();
    clearInterval(timer);
    timeleft=maxtime;
    time.innerText=timeleft;
    input.value='';
    charindex=0;
    mistake=0;
    istyping=false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}
document.getElementById("rulebox").style.display="none";
function ruleshow(){
    document.getElementById("rulebox").style.display="block";
}
function rulehide(){
    document.getElementById("rulebox").style.display="none";
}
loadingpara();
exit.addEventListener("click",rulehide);
rul.addEventListener("click",ruleshow);
input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);



