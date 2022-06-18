const PADDING = 32;
const GAP = 12;
const HIDDEN_CONTENT_OPACITY = 0.7;
let displayed_content_num = 3;
let contentWidth;

const $bannerSection = document.getElementById("banner_section");
$bannerSection.style.height = document.body.clientWidth * 0.3 + "px";
const contentListArray = document.getElementsByClassName("content_list");

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

  $bannerSection.style.height = document.body.clientWidth * 0.3 + "px";
  contentWidth = (document.body.clientWidth - PADDING * 2 - GAP * (displayed_content_num-1)) / displayed_content_num;
  [...contentListArray].forEach((contentList, index) => {
    const $contentTrack = contentList.firstChild;
    // CONTENT 크기가 변함에 따라 스크롤 위치 조정
    if(slider_first_content_idx_list[index] > $contentTrack.childElementCount - displayed_content_num)
    slider_first_content_idx_list[index] = $contentTrack.childElementCount - displayed_content_num;
    $contentTrack.style.transform = `translateX(-${slider_first_content_idx_list[index]*(contentWidth+GAP)}px)`;
    // CONTENT 크기 및 투명도 변경
    $contentTrack.childNodes.forEach(($content, cid) => {
      $content.style.width = contentWidth + "px";
      $content.firstChild.style.height = contentWidth * 0.5625 + "px";
      if(cid < slider_first_content_idx_list[index] || cid >= slider_first_content_idx_list[index] + displayed_content_num)
      $content.style.opacity = HIDDEN_CONTENT_OPACITY;
      else 
      $content.style.opacity = 1;
    });
  })
};

const $mainSection = document.getElementById("main_section");

const contentSectionInfo = [
  {title: "정기공연 몰아보기", category: "정기공연"},
  {title: "루나틱을 소개합니다!", category: "홍보영상"},
  {title: "2022년!", year: 2022},
  {title: "2020년!", year: 2020}
]
const slider_first_content_idx_list = [];

contentSectionInfo.forEach((info, index) => {
  slider_first_content_idx_list.push(0);
  const $contentSection = document.createElement("div");
  $contentSection.className = "content_section";
  const $contentSectionTitle = document.createElement("div");
  $contentSectionTitle.className = "content_section_title";
  $contentSectionTitle.appendChild(document.createTextNode(info.title));
  const $contentSlider = document.createElement("div");
  $contentSlider.className = "content_slider";
  const $contentList = document.createElement("div");
  $contentList.className = "content_list";
  const $contentTrack = document.createElement("div");
  $contentTrack.className = "content_track";
  const $leftBtn = document.createElement("div");
  $leftBtn.className = "content_section_left_btn";
  const $leftBtnObj = document.createElement("object");
  $leftBtnObj.type = "image/svg+xml";
  $leftBtnObj.data = "/assets/icon/arrow/left.svg";
  $leftBtn.appendChild($leftBtnObj);
  const $rightBtn = document.createElement("div");
  $rightBtn.className = "content_section_right_btn";
  const $rightBtnObj = document.createElement("object");
  $rightBtnObj.type = "image/svg+xml";
  $rightBtnObj.data = "/assets/icon/arrow/right.svg";
  $rightBtn.appendChild($rightBtnObj);

  $leftBtn.onclick = () => {
    slider_first_content_idx_list[index] -= displayed_content_num;
    if(slider_first_content_idx_list[index] < 0) slider_first_content_idx_list[index] = 0;
    $contentTrack.style.transform = `translateX(-${slider_first_content_idx_list[index]*(contentWidth+GAP)}px)`;
    
    $contentTrack.childNodes.forEach(($content, cid) => {
      if(cid < slider_first_content_idx_list[index] || cid >= slider_first_content_idx_list[index] + displayed_content_num)
      $content.style.opacity = HIDDEN_CONTENT_OPACITY;
      else 
      $content.style.opacity = 1;
    });
  }
  $rightBtn.onclick = () => {
    slider_first_content_idx_list[index] += displayed_content_num;
    if(slider_first_content_idx_list[index] > $contentTrack.childElementCount - displayed_content_num)
    slider_first_content_idx_list[index] = $contentTrack.childElementCount - displayed_content_num;
    $contentTrack.style.transform = `translateX(-${slider_first_content_idx_list[index]*(contentWidth+GAP)}px)`;
  
    $contentTrack.childNodes.forEach(($content, cid) => {
      if(cid < slider_first_content_idx_list[index] || cid >= slider_first_content_idx_list[index] + displayed_content_num)
      $content.style.opacity = HIDDEN_CONTENT_OPACITY;
      else 
      $content.style.opacity = 1;
    });
  }
  
  $contentSection.onmouseenter = () => {
    $leftBtn.style.display = "flex";
    $rightBtn.style.display = "flex";
  }
  
  $contentSection.onmouseleave = () => {
    $leftBtn.style.display = "none";
    $rightBtn.style.display = "none";
  }
  
  videoData.forEach(video => {
    if(video.category !== undefined && video.category == info.category ||
       video.year !== undefined && video.year == info.year) {
      const $content = document.createElement("div");
      $content.className = "content";
      const $contentImg = document.createElement("img");
      $contentImg.className = "content_img";
      $contentImg.src = `/assets/image/content/${video.index}.jpg`;
      const $contentTitle = document.createElement("div");
      $contentTitle.className = "content_title";
      $contentTitle.appendChild(document.createTextNode(video.title));
      $content.appendChild($contentImg);
      $content.appendChild($contentTitle);
      $contentTrack.appendChild($content);
    }
  });
  
  $contentSection.appendChild($contentSectionTitle);
  $contentList.appendChild($contentTrack);
  $contentSlider.appendChild($contentList);
  $contentSlider.appendChild($leftBtn);
  $contentSlider.appendChild($rightBtn);
  $contentSection.appendChild($contentSlider);
  
  $mainSection.appendChild($contentSection);

})

window.onresize();