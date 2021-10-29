const query = document.getElementById('search')
        const submitBtn = document.getElementById('submit')
        const BASE_URL = 'http://localhost:5000/api/words';
    
        //검색어가 특수문자일 때 검색이 안되도록 함
        function checkIfStringHasSpecialCharacter(str) {
            const re = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            return re.test(str);
        }
        //검색어가 숫자일 때 검색이 안되도록 함
        function checkIfStringHasNumbers(str) {
            return /\d/.test(str); 
        }
        
        function enableSubmitBtn(state){
            //버튼 활성화
            submitBtn.disabled = state
        }
        //서버 데이터 가져오기
        function getData(baseUrl, query){
            enableSubmitBtn(true)
            console.log('서버 접속중...')
            //사용자 입력 유효성 검증
            if(checkIfStringHasSpecialCharacter(query)){
                enableSubmitBtn(false)
                container.innerHTML = "특수문자가 포함되어 있습니다."
                return;
            }
            
            if(checkIfStringHasNumbers(query)){
                enableSubmitBtn(false)
                container.innerHTML = "숫자가 포함되어 있습니다."
                return;
            }
           
            
        
            
            fetch(`${baseUrl}/${query}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then( res => res.json())
            .then( data =>{
                enableSubmitBtn(false)
                console.log(data)
                const{words} = data;
                // 데이터 유효성 검증
                if(words.length === 0){
                    container.innerHTML = "단어를 찾을 수 없습니다."
                    return;
                }

                const template = words.map(word => {
                    
                    return (
                        `
                        <div class="item">
                                <div class="word"><a href=${word.r_link} target="_blank">${word.r_word}<sup>${word.r_seq? word.r_seq: ""}</sup> ${word.r_chi}</a> - ${word.r_pos}</div>
                                <p class="description">${word.r_des}</p>
                            </div>
                            <hr>
                        `
                    )
                })
                container.innerHTML = template.join("")//DOM에 Template 삽입
            })
            
        }
        submitBtn.addEventListener('click', function(){
            console.log(query.value)
            getData(BASE_URL, query.value)
        })
        query.addEventListener('keypress', function(e){
            console.log('key pressed')
            if(e.keyCode == 13){
                getData(BASE_URL, query.value)
            }
        })  
        window.addEventListener('DOMContentLoaded', function(){
            getData(BASE_URL)
        })