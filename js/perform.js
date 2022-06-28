// const params = window.location.search.slice(1).split("&");
// const [year, season] = params.map(param => param.split("=")[1]);

const PADDING = 48;
const GAP = 12;

const index = window.location.search.slice(1).split("=")[1];
const info = performData[index];

/*
const $bannerSection = document.getElementById("banner_section");
const $posterImg = document.createElement("img");
$posterImg.className = "poster_img";
$posterImg.src = `../assets/image/poster/${info.poster}`;
const $textArea = document.createElement("div");
$textArea.className = "text_area";
const $title = document.createElement("div");
$title.className = "title";
$title.appendChild(document.createTextNode(`${info.year} ${info.season} 정기공연`));
const $description = document.createElement("div");
$description.className = "description";
$description.appendChild(document.createTextNode(`날짜: ${info.year}.${info.date}\n`));
$textArea.appendChild($title);
$textArea.appendChild($description);
$bannerSection.appendChild($posterImg);
$bannerSection.appendChild($textArea);
*/

const videoInfoArr = videoData.filter(video => video.category == "정기공연" && video.year == info.year);
const randomIdx = Math.floor(Math.random() * videoInfoArr.length);

const $bannerSection = document.getElementById("banner_section");
const $bannerImg = document.createElement("img");
$bannerImg.className = "banner_img";
$bannerImg.src = `../assets/image/content/${videoInfoArr[randomIdx].thumbnail}`;
const $textArea = document.createElement("div");
$textArea.className = "text_area";
const $title = document.createElement("div");
$title.className = "title";
$title.appendChild(document.createTextNode(`${info.year} ${info.season == "spring" ? "봄" : "가을"} 정기공연`));
const $description = document.createElement("div");
$description.className = "description";
$description.appendChild(document.createTextNode(`날짜: ${info.year}.${info.date}\n`));
$textArea.appendChild($title);
$textArea.appendChild($description);
$bannerSection.appendChild($bannerImg);
$bannerSection.appendChild($textArea);

const $contentCtn = document.getElementById("content_section");
const $fragment = document.createDocumentFragment();

videoInfoArr.forEach(video => {
  const $content = document.createElement("div");
  $content.className = "content";
  const $contentImg = document.createElement("img");
  $contentImg.className = "content_img";
  $contentImg.src = `../assets/image/content/${video.thumbnail}`;
  const $contentTitle = document.createElement("div");
  $contentTitle.className = "content_title";
  $contentTitle.appendChild(document.createTextNode(video.title));
  $content.appendChild($contentImg);
  $content.appendChild($contentTitle);
  $fragment.appendChild($content);
});

$contentCtn.appendChild($fragment);

let displayed_content_num = 3;
let contentWidth;

$bannerSection.style.height = document.body.clientWidth * 0.4 + "px";
console.log($contentCtn.children);
window.onresize = () => {
  if(document.body.clientWidth < 700)
  displayed_content_num = 2;
  else if(document.body.clientWidth < 1000)
  displayed_content_num = 3;
  else if(document.body.clientWidth < 1300)
  displayed_content_num = 4;
  else if(document.body.clientWidth < 1600)
  displayed_content_num = 5;
  else
  displayed_content_num = 6;
  $bannerSection.style.height = document.body.clientWidth * 0.4 + "px";

  contentWidth = (document.body.clientWidth - PADDING * 2 - GAP * (displayed_content_num-1)) / displayed_content_num;
  [...$contentCtn.children].forEach(($content, index) => {
    $content.style.width = contentWidth + "px";
    $content.firstChild.style.height = contentWidth * 0.5625 + "px";
  });
};

window.onresize();