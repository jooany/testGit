
//캘린더 드롭다운
$calendarBtn=$(".calendar_btn");
$calendar=$(".calendar");

let isOpen2=true;

$calendarBtn.click(function(){
    if(isOpen2==true){
        $calendar.css('display','block');
        $(this).css('color','rgb(100,100,100)');

        isOpen2=false;
    }else{
        $calendar.css('display','none');
        $(this).css('color','rgb(150, 150, 150)');

        isOpen2=true;
    }
})

let calendarBtn = document.querySelector('.calendar_btn')
let isDayClick=true;

let calendar = document.querySelector('.calendar')
const calendarDays = document.querySelector('.calendar-days')
const dateInput = document.querySelector('.date_input')
const promiseInput = document.querySelector('.promise_input')
const promiseBtn = document.querySelector('.promise_btn')
const monthPicker = document.querySelector('.month-picker')
const nowYear=document.querySelector('#year')
const promiseBoxWrap=document.querySelector('.promise_box_wrap');

let n=0; // 데이터의 promiseId 값을 다르게 하기 위한 변수

// json에서 데이터 가져오기
let response;
function fetchData() {
    const url = 'data/promise.json'
    return fetch(url).then(function(response) {
        return response.json();
    });
}
promiseInput.style.display = 'none';

// 마지막 값 id 받아서 변수 선언, 하나씩 늘려줌, 삭제할 때 키값으로 사용, class 이름으로 넣던가 하세요
// id를 다 다르게 주는 방법도 생각
// let으로 변수 하나 선언해서 변수에 response 데이터에서 id값을 훑어봐서 제일 큰 값
let promiseData =
    {
    "result":
        [
            // {
            //     "promiseId": "",
            //     "promise": "",
            //     "date": {
            //         "year": "",
            //         "month": "",
            //         "day": "",
            //         "hour": "",
            //         "minute": ""
            //     }
            // },
        ]
    }


const month_names = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}
// 비동기 처리
generateCalendar = async (month, year) => {

    response = await fetchData(); //밖에서 가져온 데이터 잘 넣을때까지 기다렸다가 동작함.

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date() //현재 날짜 생성
    // if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let date=currDate.getDate()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    let first_day = new Date(year, month, 1)
   // console.log(first_day.getDay());
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) { //달력 day div 개수 만큼 도는 for문
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>` //이게 무슨 코드임?

            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('now-date') //오늘 날짜
            }

            // 일정 가져오기
            for(let j = 0; j < response.result.length; j++){
                if (i - first_day.getDay() + 1 == Number(response.result[j].date.day)
                    && year == Number(response.result[j].date.year)
                    && month + 1 == Number(response.result[j].date.month)) {
                    day.classList.add('promise-date');
                }
            }
            for(let j = 0; j < promiseData.result.length; j++){
                if (i - first_day.getDay() + 1 == Number(promiseData.result[j].date.day)
                    && year == Number(promiseData.result[j].date.year)
                    && month + 1 == Number(promiseData.result[j].date.month)) {
                    day.classList.add('promise-date');
                }
            }

            //캘린더 클릭 시,  초기화면 - 현재 날짜 일정 입력 화면
            calendarBtn.addEventListener("click", (event)=>{

                isDayClick=false; // 날짜를 클릭한 것이 아니라 캘린더를 클릭했다면 false 저장
                promiseBoxWrap.innerHTML = ''; //일정 칸 초기화하는 것

                //클릭한 날짜 보여줌
                dateInput.value = `${year}년 ${month + 1}월 ${currDate.getDate()}일`;

                //일정을 입력할 박스 생성
                promiseInput.style.display = 'block';
                promiseInput.value = '';

                // 저장되어있는 json 데이터 가져오기
                // 현재 날짜와 json 데이터의 날짜 값을 비교하여 해당하는 데이터가 있다면,
                // 그 데이터를 가져와서 태그를 생성하여 보여줌.
                for(let j = 0; j < response.result.length; j++){
                    if (currDate.getDate() == Number(response.result[j].date.day)
                        && year == Number(response.result[j].date.year)
                        && month + 1 == Number(response.result[j].date.month)) {

                        const promiseBox=document.createElement("div");
                        promiseBox.className="promise_box";


                        const promise= document.createElement("div");
                        promise.className="promise";
                        promise.innerText = response.result[j].promise;

                        const erase= document.createElement("button");
                        erase.type="button";
                        erase.className="erase_btn";
                        erase.innerText = "x" ;

                        const alarmBox=document.createElement("div");
                        alarmBox.className="alarm_box";

                        const alarm=document.createElement("div");
                        alarm.className="alarm";
                        alarm.innerText=response.result[j].date.time;

                        promiseBox.append(promise,erase);
                        document.querySelector(".promise_box_wrap").append(promiseBox);
                        alarmBox.append(alarm);
                        promiseBox.append(alarmBox);

                        // console.log(response.result);
                    }
                }
                // 입력한 일정 데이터 가져오기
                // 현재 날짜와 입력하여 저장한 일정 데이터가 있다면,
                // 그 데이터를 가져와서 태그를 생성하여 보여줌.
                for(let j = 0; j < promiseData.result.length; j++){
                    if (currDate.getDate() == Number(promiseData.result[j].date.day)
                        && year == Number(promiseData.result[j].date.year)
                        && month + 1 == Number(promiseData.result[j].date.month)) {

                        const promiseBox=document.createElement("div");
                        promiseBox.className="promise_box";
                        promiseBox.className += ' box_'+promiseData.result[j].promiseId;


                        const promise= document.createElement("div");
                        promise.className="promise";
                        promise.innerText = promiseData.result[j].promise;

                        const erase= document.createElement("button");
                        erase.className="erase_btn";
                        erase.type="button";
                        erase.innerText = "x" ;

                        const alarmBox=document.createElement("div");
                        alarmBox.className="alarm_box";

                        const alarm=document.createElement("div");
                        alarm.className="alarm";
                        alarm.innerText=promiseData.result[j].date.time;

                        promiseBox.append(promise,erase);
                        document.querySelector(".promise_box_wrap").append(promiseBox);
                        alarmBox.append(alarm);
                        promiseBox.append(alarmBox);
                    }
                }

            })

            //날짜를 클릭할 시, 이벤트 처리
            day.addEventListener('click', (event) => {

                // 오늘 날짜가 아닌 다른 날짜 클릭 시, border 제거
                if(event.target!=document.querySelector(".now-date")){
                    $(".calendar-days div.now-date,.calendar-days div.now-date:hover").css("border","none");
                }else{
                    $(".calendar-days div.now-date,.calendar-days div.now-date:hover").css("border","1px solid #ff4781");
                }

                isDayClick=true;
                promiseBoxWrap.innerHTML = ''; //일정 칸 초기화하는 것
                const children = Array.from(calendarDays.children);
                //날짜 div 다 불러와서 foreach문 돌려 curr-date 제거 (curr-date: 지금 선택된 날짜)
                children.forEach(element => element.classList.remove('curr-date'));

                const currentTarget = event.currentTarget; //currentTarget: 이벤트 부착된 부모 위치를 반환
                currentTarget.classList.add("curr-date");
               //day, month, year 어디서 가져오는건지 헷갈림

                //클릭한 날짜 보여줌
                dateInput.value = `${year}년 ${month + 1}월 ${i - first_day.getDay() + 1}일`;

                //일정을 입력할 박스 생성
                promiseInput.style.display = 'block';
                promiseInput.value = '';

                // 저장되어있는 json 데이터 가져오기
                // 클릭한 날짜와 json 데이터의 날짜 값을 비교하여 해당하는 데이터가 있다면,
                // 그 데이터를 가져와서 태그를 생성하여 보여줌.
                for(let j = 0; j < response.result.length; j++){
                    if (i - first_day.getDay() + 1 == Number(response.result[j].date.day)
                        && year == Number(response.result[j].date.year)
                        && month + 1 == Number(response.result[j].date.month)) {

                        const promiseBox=document.createElement("div");
                        promiseBox.className="promise_box";

                        const promise= document.createElement("div");
                        promise.className="promise";
                        promise.innerText = response.result[j].promise;

                        const erase= document.createElement("button");
                        erase.type="button";
                        erase.className="erase_btn";
                        erase.innerText = "x" ;

                        const alarmBox=document.createElement("div");
                        alarmBox.className="alarm_box";

                        const alarm=document.createElement("div");
                        alarm.className="alarm";
                        alarm.innerText=response.result[j].date.time;

                        promiseBox.append(promise,erase);
                        document.querySelector(".promise_box_wrap").append(promiseBox);
                        alarmBox.append(alarm);
                        promiseBox.append(alarmBox);


                        // console.log(response.result);
                    }
                }
                // 입력한 일정 데이터 가져오기
                // 클릭한 날짜와 입력하여 저장한 일정 데이터가 있다면,
                // 그 데이터를 가져와서 태그를 생성하여 보여줌.
                for(let j = 0; j < promiseData.result.length; j++){
                    if (i - first_day.getDay() + 1 == Number(promiseData.result[j].date.day)
                        && year == Number(promiseData.result[j].date.year)
                        && month + 1 == Number(promiseData.result[j].date.month)) {

                        const promiseBox=document.createElement("div");
                        promiseBox.className="promise_box";
                        promiseBox.className += ' box_'+promiseData.result[j].promiseId;


                        const promise= document.createElement("div");
                        promise.className="promise";
                        promise.innerText = promiseData.result[j].promise;

                        const erase= document.createElement("button");
                        erase.className="erase_btn";
                        erase.type="button";
                        erase.innerText = "x" ;

                        //유경
                        const alarmBox=document.createElement("div");
                        alarmBox.className="alarm_box";

                        const alarm=document.createElement("div");
                        alarm.className="alarm";
                        alarm.innerText=promiseData.result[j].date.time;

                        promiseBox.append(promise,erase);
                        document.querySelector(".promise_box_wrap").append(promiseBox);
                        alarmBox.append(alarm);
                        promiseBox.append(alarmBox);
                    }
                }
            })// day.click.end();

        }// if 함수
        calendar_days.appendChild(day)
    }//큰 for문 끝나는 지점
    
        
    
    //일정 입력 버튼 클릭 시, 이벤트 처리
    promiseBtn.addEventListener('click', (event) => {

        // 일정 입력 시,
        $(".curr-date").css({
            "background-color": "#ff4781",
            "border-radius":"50%",
            "color":"white"
        });

        //현재 날짜와 누른 날짜가 같고
        //입력값이 비어있지 않고, 시간 선택을 했다면
        //promiseData에 값을 push(저장)해준다.

        if(promiseInput.value != '' && document.querySelector('.time_sel').innerText!='시간 선택'){
            if(isDayClick==true) {
                promiseData.result.push({
                    "promiseId": n++, //삭제하면 효과 없으니까 다시 짜기
                    "promise": promiseInput.value,
                    "date": {
                        "year": nowYear.innerText,
                        "month": monthPicker.innerText.slice(0, -1),
                        "day": document.querySelector(".curr-date").innerText,
                        "time": document.querySelector(".time_picker_text").innerText

                    }
                })
            }else {
                promiseData.result.push({
                    "promiseId": n++, //삭제하면 효과 없으니까 다시 짜기
                    "promise": promiseInput.value,
                    "date": {
                        "year": year,
                        "month": month+1,
                        "day": date,
                        "time": document.querySelector(".time_picker_text").innerText

                    }
                })
            }


            // console.log(promiseData.result);

            // generateCalendar(month, year) //달력 다시 만들어주기

            const promiseBox=document.createElement("div");
            promiseBox.className="promise_box";            
            promiseBox.className += ' box_'+(n-1);


            const promise= document.createElement("div");
            promise.className="promise";
            promise.innerText = promiseData.result[promiseData.result.length-1].promise;

            const timeStr = document.querySelector('.time_picker_text').innerText;
            const alarmBox=document.createElement("div");
            alarmBox.className="alarm_box";

            const alarm=document.createElement("div");
            alarm.className="alarm";
            alarm.innerText=timeStr;

            const erase= document.createElement("button");
            erase.className="erase_btn";
            erase.type="button";
            erase.innerText = "x" ;

            promiseBox.append(promise,erase);
            alarmBox.append(alarm);
            promiseBox.append(alarmBox);
            document.querySelector(".promise_box_wrap").append(promiseBox);
            promiseInput.value = '';

        } //if().end    입력값이 비어있지 않다면 ;
    }) //promiseBtn.addEventListener.end;


    // 제거 버튼 클릭 시, 제거 버튼의 부모 박스 제거 (해당 일정 view 제거)
    $(document).on("click",".erase_btn",function(){
        $(this).parent().remove();
    })//eraseBtn.end
} // 캘린더 종료

//시간 설정 드롭 다운
$(document).on('click', '.time_dropdown>li', function(){
    $(this).children('ul').slideToggle(300);
});
//시간 클릭 시, time_sel에 보여짐.
$('.time_picker>li').on('click', function(){
    // console.log(event.target.innerText);
    let time = event.target.innerText;
    $('.time_sel').text(time);
})

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show') //month-list 없어지고 해당 월로 이동
        curr_month.value = index // let curr_month = `${month_names[month]}` 참고
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()
// console.log(currDate);

let curr_month = {value: currDate.getMonth()} 
let curr_year = {value: currDate.getFullYear()}
let curr_date ={value:currDate.getDate()}
let curr_day={value:currDate.getDay()}
generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    if(curr_month.value == 0){
        curr_month.value = 11;
        --curr_year.value;
    } else {
        --curr_month.value
    }
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    if(curr_month.value == 11){
        curr_month.value = 0;
       ++curr_year.value; 
    } else {
        ++curr_month.value
    }
    generateCalendar(curr_month.value, curr_year.value)
}

