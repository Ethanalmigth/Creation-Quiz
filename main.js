import './style.css';
import { Questions } from './question';
console.log(Questions)
const app= document.querySelector("#app")
const startbutton=document.querySelector("#start")
const div=document.createElement("div")
div.innerHTML="<h1>salut</h1>"
startbutton.addEventListener("click",startQuiz)
function formatId(text) {
  return text.replaceAll(" ", "-").replaceAll('"', "'").toLowerCase();
}
function startQuiz(){
  
  let currentQuestion=0;
  let score=0;
  clean()
  displayQuestion(currentQuestion)

  function clean(){
    while(app.firstElementChild){
      app.firstElementChild.remove()
    }
    const progress=getProgressBar(Questions.length,currentQuestion)
    app.appendChild(progress)
  }


  function displayQuestion(index){
    clean()
    const question= Questions[index]
    if(!question){
      displayFinishMessage()
      return
    }
    const title=getTitleElement(question.question)
    app.appendChild(title)
    const answersDiv=createAnswers(question.answers)
    app.appendChild(answersDiv)
    const SubmitButton=getSubmitButton()
    SubmitButton.addEventListener("click",submit)
    app.appendChild(SubmitButton)

  }
  function displayFinishMessage(){
    const h1= document.createElement("h1")
    h1.textContent="You have finished the quiz"
    const p = document.createElement("p")
    p.textContent=`Your score is ${score}/${Questions.length}`
    app.appendChild(h1)
    app.appendChild(p)
  }
  function submit(){
    const selectedAnswer=app.querySelector('input[name="answer"]:checked')
    disableAllanswer()
    const value =selectedAnswer.value
    const question=Questions[currentQuestion]
    const isCorrect=question.correct===value
   if(isCorrect){
    score++
   }
   showFeedback(isCorrect,question.correct,value)
   const feedback= getFeedBackMessage(isCorrect,question.correct)
  app.appendChild(feedback)

    displayNextQuestionButton()
    //alert(`Submit ${isCorrect? "correct":"Incorrect"}`)
  }


  function displayNextQuestionButton(){
    const TIMEOUT=4000
    let remainingtimeout =TIMEOUT
   
    app.querySelector("button").remove()
    const nextButton=document.createElement("button")
    nextButton.innerText=`Next (${remainingtimeout/1000}s)`
    app.appendChild(nextButton)
    const interval=setInterval(()=>{
      remainingtimeout-=1000
      nextButton.innerText=`Next (${remainingtimeout/1000}s)`
    },1000)
    const timeout=setTimeout(()=>{
      handleNextQuestion()

    },TIMEOUT)
    const handleNextQuestion=()=>{
      currentQuestion++
      clearInterval(interval)
      clearTimeout(timeout)
      displayQuestion(currentQuestion)

    }
    
    nextButton.addEventListener("click",()=>{
      handleNextQuestion()
    })
  }

  function disableAllanswer(){
   const radioInput= document.querySelectorAll('input[type="radio"]')
   for(const radio of radioInput){
    radio.disabled=true
   }
  }
  

  function showFeedback(isCorrect,correct,answer){
    const correctAnswerId=formatId(correct)
    console.log(correctAnswerId)
    const correctElement = document.querySelector(
      `label[for="${correctAnswerId}"]`
    )
    const selectedAnswerId=formatId(answer)
    console.log(selectedAnswerId)
    const selectedElement = document.querySelector(`label[for="${selectedAnswerId}"]`)
      
    correctElement.classList.add("correct");
    selectedElement.classList.add(isCorrect?"correct":"incorrect"); 
    
    }
    
  

  function getFeedBackMessage(isCorrect,correct){
    const paragraph=document.createElement("p")
    paragraph.innerText=isCorrect? "Bravo! Tu as eu la bonne reponse":
    `Dommage! La bonne reponse est ${correct}`
    return paragraph
  }
  
  function getProgressBar(max,value){
    const progress=document.createElement("progress")
    progress.setAttribute("max",max)
    progress.setAttribute("value",value)
    return progress
  }
    
  }


  function createAnswers(answers){
    const answersDiv=document.createElement("div")
    answersDiv.classList.add("answers");

    for(const answer of answers){
      const label=getAnswerElement(answer)
      answersDiv.appendChild(label)
    }
    return answersDiv;
  }


function getTitleElement(text){
const title = document.createElement("h3")
title.innerText=text
return title
}

function getAnswerElement(text){
  const label= document.createElement("Label")
  label.innerText=text
  const input=document.createElement("input");
  const id=formatId(text)
  input.id=id
  label.htmlFor=id
  input.setAttribute("type","radio")
  input.setAttribute("name","answer")
  input.setAttribute("Value",text)
  label.appendChild(input)
  return label
}

function getSubmitButton(){
  const submit=document.createElement("button")
  submit.innerText="Submit"
  return submit
}

const colors=["Green","yellow","red"]
let i=0

/*startbutton.addEventListener("click",()=>{
  const question=document.querySelector("#question")??document.createElement("p")
  question.id="question"
  question.innerText=Questions[i].question
  app.insertBefore(question,startbutton)
  i++
  if(i==Questions.length){
    question.remove()
    i=0
  }
})*/



/*console.log(app)
const colors=["Green","yellow","red"];
let i=0*/
/*setInterval(()=>{
  app.style.backgroundColor = colors[i]
  i++
  if(i==colors.length){
    i=0
  }
},1000)*/
/*const firstChild = app.firstElementChild;
firstChild.style.backgroundcolor="blue"
console.log({
  parent:app.parentElement,
  nextsibling:app.nextElementSibling,
  prevsibling:app.previousElementSibling,
  firstchild:app.firstElementChild,
  lastchild:app.lastElementChild,
  children:app.children


})*/
/*app.innerHTML="<div> <h1> salut</h1> <input>"
const div=document.createElement("div")
const h1=document.createElement("h1")
const input=document.createElement("input")
h1.innerText= "salut"
h1.innerHTML="<h1>salut</h1>"
app.appendChild(div)
app.appendChild(h1)
app.appendChild(input)*/

