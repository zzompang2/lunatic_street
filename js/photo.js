const PADDING = 48;
const GAP = 12;
const PHOTO_UPDATE_NUM = 30;
let photoNumInRow = 5;
const heightEachColumn = [];
const photoRatio = Array(photoData.length);
let loadedImgNum = 0;
let isLoading = false;

const $photoSection = document.getElementById("photo_section");
const $photoGrid = document.createElement("div");
$photoGrid.id = "photo_grid";

function loadPhoto() {
  if(isLoading) return;
  isLoading = true;
  const newPhotoNum = Math.min(PHOTO_UPDATE_NUM, photoData.length - loadedImgNum);
  if(newPhotoNum == 0) return;

  let done = 0;
  for(let i=0; i<newPhotoNum; i++) {
    const $photoCtn = document.createElement("div");
    $photoCtn.className = "photo_ctn";
    const $photo = document.createElement("img");
    $photo.className = "photo";
    const photoIndex = photoData[loadedImgNum].index;
    $photo.onload = () => {
      photoRatio[photoIndex] = $photo.height / $photo.width;
      done++;
    };
    $photo.src = `../assets/image/photo/${photoIndex}.jpg`;
    $photoGrid.appendChild($photoCtn);
    $photoCtn.appendChild($photo);
    loadedImgNum++;
  }

  const loadInterval = setInterval(() => {
    console.log("loading..", done, loadedImgNum);
    if(done == newPhotoNum) {
      clearInterval(loadInterval);
      window.onresize();
      isLoading = false;
    }
  }, 500);
}
loadPhoto();
$photoSection.appendChild($photoGrid);

window.onresize = () => {
  if(document.body.clientWidth < 700)
  photoNumInRow = 2;
  else if(document.body.clientWidth < 1000)
  photoNumInRow = 3;
  else if(document.body.clientWidth < 1300)
  photoNumInRow = 4;
  else if(document.body.clientWidth < 1600)
  photoNumInRow = 5;
  else
  photoNumInRow = 6;

  heightEachColumn.length = 0;
  for(let i=0; i<photoNumInRow; i++)
  heightEachColumn.push(0);

  const photoWidth = (document.body.clientWidth - PADDING * 2 - GAP * (photoNumInRow - 1)) / photoNumInRow;
  $photoGrid.childNodes.forEach(($photoCtn, index) => {
    $photoCtn.style.width = photoWidth + "px";

    // put which column
    let colIndex = 0;
    for(let i=1; i<photoNumInRow; i++) {
      if(heightEachColumn[colIndex] > heightEachColumn[i])
      colIndex = i;
    }
    
    $photoCtn.style.left = (photoWidth + GAP) * colIndex + "px";
    $photoCtn.style.top = heightEachColumn[colIndex] + "px";

    const imgHeight = photoWidth * photoRatio[index];
    $photoCtn.style.height = imgHeight + "px";
    heightEachColumn[colIndex] += imgHeight + GAP;
  });
  $photoSection.style.height = Math.max(...heightEachColumn) + "px";
}

window.onload = () => {
  console.log("window loaded!");
  window.onresize();
};

document.onscroll = () => {
  if(window.pageYOffset+window.innerHeight >= Math.min(...heightEachColumn))
  loadPhoto();
}


// let text = "";
// for(let i=0; i<41; i++) {
//   text += `{
//     "index": ${i},
//     "category": "/",
//     "tags": "/",
//     "year": 2022,
//     "date": "05.12",
//     "title": "사진이름${i}",
//     "members": "/",
//   }, `;
// }
// console.log(text);