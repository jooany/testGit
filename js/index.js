//검색 관련 
$searchBox=$(".search_box");
$searchIcon=$("#search_icon");

//사용자 설정 관련
$clickProfile=$(".click_profile");
$downIcon=$("#down_icon");
$upIcon=$("#up_icon");
$settingArea=$(".setting_area");

// 메인 메뉴 아이템들 
$mainMenu=$(".main_menu");

$homeLink=$(".home_link");
$partnerLink=$(".partner_link");
$meetingLink=$(".meeting_link");
$feedLink=$(".feed_link");
$menuLink=$(".menu_link");

//검색 박스

// 검색 박스에서 마우스 오버 시, 검색 아이콘 강조
$searchBox.hover(function(){
    $searchIcon.css('color','rgb(255, 71, 129)');
});
// 검색 박스에서 마우스 벗어날 시, 검색 아이콘 원래대로
$searchBox.mouseleave(function(){
    $searchIcon.css('color','#ff94b6b0');
})



//헤더 오른쪽 설정 드롭다운 
let isOpen=true; //드롭다운 여닫기 위한 변수

//프로필 영역을 클릭하여 설정을 열면 사용자 설정 영역, 닫는 아이콘 보이고, 여는 아이콘은 숨김.
//프로필 영역을 클릭하여 설정을 닫는다면 사용자 설정 영역, 닫는 아이콘 숨기고, 여는 아이콘은 보임.
$clickProfile.click(function(){
        if(isOpen==true){
            $settingArea.css('display','block');
            $downIcon.css('display','none');
            $upIcon.css('display','block');
            
            isOpen=false;
            
        }else{
            $settingArea.css('display','none');
            $downIcon.css('display','block');
            $upIcon.css('display','none');
            isOpen=true;
        }
});

//로그아웃 클릭시, 로그인 전 화면
// before_login 보이고 after_login 숨기기
$logout=$("#logout");
$beforeLogin=$(".before_login");
$afterLogin=$(".after_login");

$logout.click(function(){
    $afterLogin.css('display','none');
    $beforeLogin.css('display','flex');
    $settingArea.css('display','none');
});


//메인 메뉴 마우스 오버시 흰색으로 강조
$menuLink.hover(function(){
    $(this).css('color','#FFF');
    $homeLink.css('color','rgba(255,255,255,.75)')
})
$homeLink.hover(function(){
    $homeLink.css('color','#FFF')

})
$menuLink.mouseleave(function(){
    $(this).css('color','rgba(255,255,255,.75)');
})
$mainMenu.mouseleave(function(){
    $homeLink.css('color','#FFF');
})

//배너 슬라이드 영역
const slideList = document.querySelector('.banner_img_list'); // Slide parent dom
const slideContents = document.querySelectorAll('.slide_content'); // each slide dom
const slideBtnNext = document.querySelector('.next_btn'); // next button
const slideBtnPrev = document.querySelector('.prev_btn'); // prev button
const bar = document.querySelector('.bar');
const nowNum = document.querySelector('#now_num');
const mainImg1 = document.querySelector('.main_img_1');
const txt1 = document.querySelector('.txt_1');
const txt2 = document.querySelector('.txt_2');
const txt3 = document.querySelector('.txt_3');
const slideLen = slideContents.length; // slide length
const slideWidth = 650; // slide width
const slideSpeed = 400; // slide speed
const startNum = 0; // initial slide index (0 ~ 4)
let slideNum = 1;
slideList.style.width = slideWidth * (slideLen + 2) + "px";
// Copy first and last slide
let firstChild = slideList.firstElementChild;
let lastChild = slideList.lastElementChild;
let clonedFirst = firstChild.cloneNode(true);
let clonedLast = lastChild.cloneNode(true);
let autoSlideSpeed = 5000; // auto slide speed
let slideAuto;
// Add copied Slides
slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedLast, slideList.firstElementChild);
slideList.style.transform = "translateX(-" + (slideWidth * (startNum + 1)) + "px)";
let curIndex = startNum; // current slide index (except copied slide)
let curSlide = slideContents[curIndex]; // current slide dom
curSlide.classList.add('slide_active');
startInterval();
function startInterval() {
    startBarAuto();
    slideAuto = setInterval(function() {
        startBarAuto();
        slideNum++;
        numImgUpdate();
        if (curIndex <= slideLen - 1) {
            slideList.style.transition = slideSpeed + "ms";
            slideList.style.transform = "translateX(-" + (slideWidth * (curIndex + 2)) + "px)";
        }
        if (curIndex === slideLen - 1) {
            setTimeout(function() {
                slideList.style.transition = "0ms";
                slideList.style.transform = "translateX(-" + slideWidth + "px)";
            }, slideSpeed);
            curIndex = -1;
        }
        curSlide.classList.remove('slide_active');
        curSlide = slideContents[++curIndex];
        curSlide.classList.add('slide_active');
    }, autoSlideSpeed);
}
/** Next Button Event */
slideBtnNext.addEventListener('click', function() {
    clearInterval(slideAuto);
    slideNum++;
    numImgUpdate();
    if (curIndex <= slideLen - 1) {
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = "translateX(-" + (slideWidth * (curIndex + 2)) + "px)";
    }
    if (curIndex === slideLen - 1) {
        setTimeout(function() {
            slideList.style.transition = "0ms";
            slideList.style.transform = "translateX(-" + slideWidth + "px)";
        }, slideSpeed);
        curIndex = -1;
    }
    curSlide.classList.remove('slide_active');
    curSlide = slideContents[++curIndex];
    curSlide.classList.add('slide_active');
    this.setAttribute("disabled",true);
    setTimeout(function() {
        slideBtnNext.removeAttribute("disabled");
    }, slideSpeed);
    startInterval();
});
/** Prev Button Event */
slideBtnPrev.addEventListener('click', function() {
    clearInterval(slideAuto);
    slideNum--;
    numImgUpdate();
    if (curIndex >= 0) {
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = "translateX(-" + (slideWidth * curIndex) + "px)";
    }
    if (curIndex === 0) {
        setTimeout(function() {
            slideList.style.transition = "0ms";
            slideList.style.transform = "translateX(-" + (slideWidth * slideLen) + "px)";
        }, slideSpeed);
        curIndex = slideLen;
    }
    curSlide.classList.remove('slide_active');
    curSlide = slideContents[--curIndex];
    curSlide.classList.add('slide_active');
    this.setAttribute("disabled",true);
    setTimeout(function() {
        slideBtnPrev.removeAttribute("disabled");
    }, slideSpeed);
    startInterval();
});

// 로딩바 설정 
function startBarAuto() {
    const barAuto = bar.animate([
            {width: '0'},
            {width: '240px'}
        ], 5000);
}
function numImgUpdate() {
    if(slideNum == 4) slideNum = 1;
    if(slideNum < 1) slideNum = 3;
    nowNum.innerText = `0${slideNum}`;
    if(slideNum == 1){
        mainImg1.setAttribute('src', 'img/blur_main_1.png');
        txt2.animate([
            {transform: 'translateY(0)', opacity: '1'},
            {transform: 'translateY(40px)', opacity: '0'}
        ], 400);
        setTimeout(() => {
            txt2.style.display = 'none';
            txt1.style.display = 'block';
            txt1.animate([
                {transform: 'translateY(-40px)', opacity: '0'},
                {transform: 'translateY(0)', opacity: '1'}
            ], 1000);
        }, 400);
        if(txt3.style.display === 'block'){
            // console.log(13);
            txt3.animate([
                {transform: 'translateY(0)', opacity: '1'},
                {transform: 'translateY(40px)', opacity: '0'}
            ], 400);
            setTimeout(() => {
                txt3.style.display = 'none';
                txt1.style.display = 'block';
                txt1.animate([
                    {transform: 'translateY(-40px)', opacity: '0'},
                    {transform: 'translateY(0)', opacity: '1'}
                ], 1000);
            }, 400);
        }
    }
    else if(slideNum == 2){
        mainImg1.setAttribute('src', 'img/blur_main_2.png');
        txt1.animate([
            {transform: 'translateY(0)', opacity: '1'},
            {transform: 'translateY(40px)', opacity: '0'}
        ], 400);
        setTimeout(() => {
            txt1.style.display = 'none';
            txt2.style.display = 'block';
            txt2.animate([
                {transform: 'translateY(-40px)', opacity: '0'},
                {transform: 'translateY(0)', opacity: '1'}
            ], 1000);
        }, 400);
        if(txt3.style.display === 'block'){
             // console.log(23);
            txt3.animate([
                {transform: 'translateY(0)', opacity: '1'},
                {transform: 'translateY(40px)', opacity: '0'}
            ], 400);
            setTimeout(() => {
                txt3.style.display = 'none';
                txt2.style.display = 'block';
                txt2.animate([
                    {transform: 'translateY(-40px)', opacity: '0'},
                    {transform: 'translateY(0)', opacity: '1'}
                ], 1000);
            }, 400);
        }
    }
    else if(slideNum == 3){
        mainImg1.setAttribute('src', 'img/blur_main_3.png');
        txt1.animate([
            {transform: 'translateY(0)', opacity: '1'},
            {transform: 'translateY(40px)', opacity: '0'}
        ], 400);
        setTimeout(() => {
            txt1.style.display = 'none';
            txt3.style.display = 'block';
            txt3.animate([
                {transform: 'translateY(-40px)', opacity: '0'},
                {transform: 'translateY(0)', opacity: '1'}
            ], 1000);
        }, 400);
        if(txt2.style.display === 'block'){
            // console.log(32);
            txt2.animate([
                {transform: 'translateY(0)', opacity: '1'},
                {transform: 'translateY(40px)', opacity: '0'}
            ], 400);
            setTimeout(() => {
                txt2.style.display = 'none';
                txt3.style.display = 'block';
                txt3.animate([
                    {transform: 'translateY(-40px)', opacity: '0'},
                    {transform: 'translateY(0)', opacity: '1'}
                ], 1000);
            }, 400);
        }
    }
}

// 슬라이드 콘텐츠에서
// 버튼을 사용해 다음 슬라이드로 이동함.
// 오른쪽 버튼을 클릭하면, 왼쪽 버튼 보임, 오른쪽 버튼 숨김, 이미지 리스트를 0.3초동안 왼쪽으로 이동시킴.
// 왼쪽 버튼을 클릭하면, 왼쪽 버튼 숨김, 오른쪽 버튼 보임, 이미지 리스트를 0.3초동안 원래대로 돌려놓음.

//모임
$meetingLeftBtn=$(".meeting_left_btn");
$meetingRightBtn=$(".meeting_right_btn");
$meetingList=$(".meeting_list");

$meetingRightBtn.click(function(){
    $meetingLeftBtn.css({ 
        'display':'block'
    });
    $meetingRightBtn.css({
        'display':'none'
    });
    $meetingList.animate({
        marginLeft:"-1142px"
    },300);
}) //meetingRightBtn.click.end

$meetingLeftBtn.click(function(){
        $meetingLeftBtn.css({ 
            'display':'none'
        });
        $meetingRightBtn.css({ 
            'display':'block'
         });

        $meetingList.animate({
            marginLeft:"-14px"
        },300); 
})

// 인기 피드 슬라이드 콘텐츠 넘기기 
$feedLeftBtn=$(".feed_left_btn");
$feedRightBtn=$(".feed_right_btn");
$containerFeedList=$(".container_feed_list");


$feedRightBtn.click(function(){
    $feedLeftBtn.css({ 
        'display':'block'
    });
    $feedRightBtn.css({
        'display':'none'
    });
    $containerFeedList.animate({
        marginLeft:"-1142px"
    },300);
}) //meetingRightBtn.click.end

$feedLeftBtn.click(function(){
        $feedLeftBtn.css({ 
            'display':'none'
        });
        $feedRightBtn.css({ 
            'display':'block'
         });

         $containerFeedList.animate({
            marginLeft:"-14px"
        },300); 
})

// 열정 회원 슬라이드 콘텐츠 넘기기
$memberLeftBtn=$(".member_left_btn");
$memberRightBtn=$(".member_right_btn");
$memberList=$(".member_list");

$memberRightBtn.click(function(){
    $memberRightBtn.css({
        'display': 'none'
    })
    $memberLeftBtn.css({
        'display':'block'
    })
    $memberList.animate({
        marginLeft:"-1142px"
    },300);
}); //memberRightBtn.click.end

$memberLeftBtn.click(function(){
    $memberLeftBtn.css({
        'display': 'none'
    });
    $memberRightBtn.css({
        'display':'block'
    });
    $memberList.animate({
        marginLeft:"-14px"
    },300);
}); //memberRightBtn.click.end

// 피드 스크립트 
$(document).on("click",'.defaultBookmark',function () {
$(this).replaceWith('<i class="fas fa-bookmark fullBookmark"></i>');
})
$(document).on("click",'.fullBookmark',function () {
    $(this).replaceWith('<i class="far fa-bookmark defaultBookmark"></i>');
})

$(document).on("click",'.default-heart',function () {
    $(this).replaceWith('<i class="fas fa-heart full-heart"></i>');
})
$(document).on("click",'.full-heart',function () {
    $(this).replaceWith('<i class="far fa-heart default-heart"></i>');
})

$reportBtn = $(".fa-ellipsis-v");
$reportBtn.click(function () {
    $(this).parent().children('.container_feed_box_header_report').toggleClass('report_on');
})


$detailBtn = $(".container_feed_content_p_detail_btn");

$detailBtn.click(function () {
    $(this).parent().children('.container_feed_content_p').removeClass('container_feed_content_p_cut');
    $(this).remove();
})


$val1 = $('.container_feed_list li:nth-child(1)').children(".container_feed_box").children(".container_feed_content_p").height();
$val2 = $('.container_feed_list li:nth-child(2)').children(".container_feed_box").children(".container_feed_content_p").height();
$val3 = $('.container_feed_list li:nth-child(3)').children(".container_feed_box").children(".container_feed_content_p").height();
$val4 = $('.container_feed_list li:nth-child(4)').children(".container_feed_box").children(".container_feed_content_p").height();
if($val1>67){
    $('.container_feed_list li:nth-child(1)').children(".container_feed_box").children(".container_feed_content_p").addClass("container_feed_content_p_cut");
}else {
    $('.container_feed_list li:nth-child(1)').children(".container_feed_box").children(".container_feed_content_p_detail_btn").remove();
}
if($val2>67){
    $('.container_feed_list li:nth-child(2)').children(".container_feed_box").children(".container_feed_content_p").addClass("container_feed_content_p_cut");
}else {
    $('.container_feed_list li:nth-child(2)').children(".container_feed_box").children(".container_feed_content_p_detail_btn").remove();
}
if($val3>67){
    $('.container_feed_list li:nth-child(3)').children(".container_feed_box").children(".container_feed_content_p").addClass("container_feed_content_p_cut");
}else {
    $('.container_feed_list li:nth-child(3)').children(".container_feed_box").children(".container_feed_content_p_detail_btn").remove();
}
if($val4>67){
    $('.container_feed_list li:nth-child(4)').children(".container_feed_box").children(".container_feed_content_p").addClass("container_feed_content_p_cut");
}else {
    $('.container_feed_list li:nth-child(4)').children(".container_feed_box").children(".container_feed_content_p_detail_btn").remove();
}

    
