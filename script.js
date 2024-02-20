const formel=document.querySelector("form");
const inputel=document.getElementById("search");
const searchresults =document.querySelector(".imagess");
const showmore = document.getElementById("showmore");

let inputData="";
let page =1;

async function searchImages(){
    inputData=inputel.value; 
    //dynamic variable
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response=await fetch(url);
    const data = await response.json();

    const results=data.results;
    if(page===1){
        searchresults.innerHTML="";
    }
    results.map((result)=>{
        const imageWrapper=document.createElement('div');
        imageWrapper.classList.add("images");
        const image=document.createElement('img');
        image.src=result.urls.small;
        image.alt=result.alt_discription;
        const imagelink= document.createElement('a');
        imagelink.href=result.links.html;
        imagelink.target="_blank";
        console.log(result)
        imagelink.textContent=result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imagelink);
        searchresults.appendChild(imageWrapper);
    });
    page++;
    if(page>1){
        showmore.style.display="block";
    }
}
 formel.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchImages();
 });
 showmore.addEventListener("click",()=>{
    searchImages();
 });