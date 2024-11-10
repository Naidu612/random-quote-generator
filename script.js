const quoteContainer=document.getElementById("quote-container");
const quoteText=document.getElementById("quote");
const authorText=document.getElementById("author");
const quoteBtn=document.getElementById("newquote");
const twitterBtn=document.getElementById("twitter");
const loader=document.getElementById("loader");
let apiQuotes=[];
//loading spinner
function loading()
{
    loader.hidden=false;
    quoteContainer.hidden=true;
}
// remove loading spinner
function complete()
{
    loader.hidden=true;
    quoteContainer.hidden=false;
}
function newQuote()
{   loading();
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // is author is blank than it shows unknown
    if(!quote.author)
    {
        authorText.textContent='unknown';
    }
    else{
        authorText.textContent=quote.author;
    }
    // dynamically reduce the size of quote font size
    if(quote.text.length>120)
    {
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
    complete();
}
// get quote from api
async function getQuotes()
{     loading();
    const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try
    {
      const response=await fetch(apiUrl);
      apiQuotes=await response.json();
      newQuote();
    }
    catch(error){
        // catch error here
        console.error("an error occured",error);
    }    
} 
function tweetQuote()
{
    const twitterUrl=`https://twitter.com/intent/tweet=${quoteText.textContent }-${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}
quoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);
getQuotes();
