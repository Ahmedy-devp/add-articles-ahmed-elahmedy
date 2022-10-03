const addArticles = document.querySelector("#addArticles");
const articlesContainer = document.querySelector("#articlesContainer");
const articlesWrap = document.querySelector("#singleUserWrap");


//read from localstorage
const readFromStorage = (key = "users") =>
  JSON.parse(localStorage.getItem(key)) || [];
//write to localstorage
const writeToStorage = (users, key = "users") =>
  localStorage.setItem(key, JSON.stringify(users));

// add function
if (addArticles) {
  addArticles.addEventListener("submit", function (e) {
    e.preventDefault();
    const article = {
      title: this.elements.title.value,
      content: this.elements.content.value,
      comment: [],
    };
    const articles = readFromStorage();
    articles.push(article);
    writeToStorage(articles);
    window.location.href = "index.html";
  });
}
// show single function
function showSingle(user) {
  writeToStorage(user, "single");
  window.location.href = "single.html";
}

// show all
function showArticles(users) {
  users.forEach((el) => {
    let div = document.createElement("div");
    let h1 = document.createElement("h1");
    let p = document.createElement("p");
    h1.innerText = el.title;
    p.innerText = el.content;
    let showBtn = document.createElement("button");
    showBtn.innerText = "Show";
    showBtn.classList.add("btn", "btn-primary");
    div.classList.add("bg-secondary");
    div.append(h1, p, showBtn);
    articlesContainer.appendChild(div);
    showBtn.addEventListener("click", () => showSingle(el));
  });
}
if (articlesContainer) {
  const allArticles = readFromStorage();
  showArticles(allArticles);
}
// single article
if (articlesWrap) {
  const userArticles = readFromStorage("single");
  articlesWrap.innerHTML = `<div id="singleArticle" class="bg-secondary">
    <h1>${userArticles.title}</h1>
    <p> ${userArticles.content}</p>
    <input id="name" type"text" placeholder="type your name">
    <input id="comment" type"text" placeholder="type your comment">
    <button id="btnConfirm" class="btn btn-danger" >Confirm</button>
    </div>
    `;
}
// add comment
const commentName = document.querySelector("#name");
const comment = document.querySelector("#comment");
const addComment = document.querySelector("#btnConfirm");
const singleArticle = document.querySelector("#singleArticle");
const commentData = readFromStorage("single");
if (singleArticle) {
  addComment.addEventListener("click", () => {
    commentData.comment.push(`${commentName.value}: ${comment.value}`);
    writeToStorage(commentData, "single");
    const p = document.createElement("p");
    p.innerText = `${commentName.value}: ${comment.value}`;
    singleArticle.appendChild(p);
    commentName.value = "";
    comment.value = "";
  });
  commentData.comment.forEach((c) => {
    const p = document.createElement("p");
    p.innerText = c;
    singleArticle.appendChild(p);
  });
}
