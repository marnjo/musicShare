const timeline = document.getElementById("home");
const arr = [
  { id:0001, song: "purge", artiste:"Bas", user: "Marnjo", likes:0, comments:[] },
  { id:0002, song: "4am", artiste:"rema 6lack etc.", user: "Floffy", likes:0, comments:[] },
  { id:0003, song: "nobody", artiste:"dj neptune", user: "Mutegi", likes:0, comments:[] },
  { id:0004, song: "lemme know", artiste:"ladipoe", user: "Marnjo", likes:0, comments:[] },
  { id:0005, song: "risk", artiste:"Bas", user: "Floffy", likes:0, comments:[] },
  { id:0006, song: "dumebi", artiste:"rema", user: "Mutegi", likes:0, comments:[] },
  { id:0007, song: "pompei", artiste:"Bastille", user: "Marnjo", likes:0, comments:[] }
]
let arrofIds = [0001,0002,0003,0004,0005,0006,0007];

function updateTimeline(){
  timeline.innerHTML = "";
  let h1 = document.createElement("h1");
  h1.innerText = "Timeline";
  timeline.appendChild(h1);
arr.forEach( post => {
  let div = document.createElement("div");
  let likeBtn = document.createElement("button");
  let commentBtn = document.createElement("button");
  let p = document.createElement("p");
  let commentDiv = document.createElement("div");

  let input = document.createElement("input");
  input.setAttribute("type","text");
  let innerCommentBtn = document.createElement("button");
  innerCommentBtn.textContent = "post comment";
  
  innerCommentBtn.addEventListener('click', () => {
    let holder = input.value.replace(/\W\s\W/g,"Stupid User says: nothing");
    post['comments'].push(holder);
    input.value = "";
    let commentP = document.createElement("p");
    commentP.textContent = holder;
    commentDiv.appendChild(commentP);
  });


  commentDiv.appendChild(input);
  commentDiv.appendChild(innerCommentBtn);
  commentDiv.style.display = "none";

  likeBtn.textContent = `like ${post["likes"]}`;
  likeBtn.addEventListener('click', () => {
    post["likes"]++;
    likeBtn.textContent = `like ${post["likes"]}`;
  });
  commentBtn.textContent = "comment";
  commentBtn.addEventListener('click', () => {
    if(commentDiv.style.display == "none") {commentDiv.style.display = "block";}
    else commentDiv.style.display = "none";
  });
  p.innerHTML = `<strong>${post["user"]}</strong> says: Have you heard
                <strong>${post["song"]}</strong> by <strong>${post["artiste"]}</strong>?`;

  div.appendChild(p);
  div.appendChild(likeBtn);
  div.appendChild(commentBtn);
  div.appendChild(commentDiv);
  timeline.appendChild(div); 
});}

window.addEventListener('load', updateTimeline)

// works on the post section
let postBtn = document.getElementById("post");
postBtn.addEventListener('click', (e) => {
  let artiste = document.querySelectorAll("#addPost input")[0].value;
  let song = document.querySelectorAll("#addPost input")[1].value;
  let user = document.querySelectorAll("#addPost input")[2].value;

  let id = arrofIds[arrofIds.length - 1] + 1;
  console.log(arrofIds);

  arr.push({ "id":id, "song": song, "artiste": artiste, "user": user, likes:0, comments:[] });
  arrofIds.push(id);
  updateTimeline();
});



// works on the search section
let searchBtn = document.getElementById("searchBtn");
let results = document.createElement("div");
searchBtn.addEventListener('click', () => {
  results.innerHTML = "";
  let searchInput = document.querySelectorAll('input')[document.querySelectorAll('input').length-1]
  let searchValue = searchInput.value;
  let myRegExp = RegExp(searchValue,"gi");

const searchDiv = document.getElementById("search");
let toggler = false;
  arr.forEach(a => {
    if( myRegExp.test(a["artiste"]) || myRegExp.test(a["song"]) || myRegExp.test(a["user"]))
    {
      let searchP = document.createElement("p");
      searchP.textContent = `${a["artiste"]} ${a["song"]} ${a["user"]}`;
      toggler = true;
      searchP.addEventListener('mouseover', () => searchP.style.color = "blue");
      searchP.addEventListener('mouseout', () => searchP.removeAttribute('style'))
      results.appendChild(searchP);
      searchDiv.appendChild(results);
    }
  });
  if(toggler == false){
    let searchP = document.createElement("p");
    searchP.innerHTML = `sorry <strong>${searchValue}</strong> was not found`;
    searchDiv.appendChild(searchP);
  };
});