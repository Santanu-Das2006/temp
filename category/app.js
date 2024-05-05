window.addEventListener('load', (e) => {
    if (window.innerWidth < 550) {
        let nameArr = ["General-Knowledge", "Books", "Film", "Music", "Theatres", "Television", "Video-Games", "Board-Games", "Nature", "Computers", "Mathematics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Comics", "Gadgets", "Anime&Manga", "Cartoon"]
        let nextDom = document.getElementById('next');
        let prevDom = document.getElementById('prev');
        let resImg = document.querySelector('.item img')
        let topic = document.querySelector('.topic')
        let responsive = 0;
        let difficult = localStorage.getItem('dif') || 'MEDIUM'
        document.querySelector('.author').innerHTML = difficult
        let carouselDom = document.querySelector('.carousel');
        let SliderDom = carouselDom.querySelector('.carousel .list');
        let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
        let final = document.querySelector('.play')
        carouselDom.removeChild(thumbnailBorderDom)
        SliderDom.innerHTML = `
        <div class="item">
        <img src="img/General-Knowledge.jpg" />
        <div class="content">
          <div class="author">${difficult}</div>
          <div class="title">Your topic is</div>
          <div class="topic">General-Knowledge</div>
          <div class="buttons">
            <button class="play">Play</button>
          </div>
        </div>
      </div>
        `


        nextDom.addEventListener('click', function () {
            responsive++
            if (responsive == nameArr.length) {
                responsive = 0;
            }
            SliderDom.innerHTML = `
        <div class="item">
        <img src="img/${nameArr[responsive]}.jpg" />
        <div class="content">
          <div class="author">${difficult}</div>
          <div class="title">Your topic is</div>
          <div class="topic">${nameArr[responsive]}</div>
          <div class="buttons">
            <button class="play">Play</button>
          </div>
        </div>
      </div>
        `

        })
        prevDom.addEventListener('click', function () {
            responsive--
            if (responsive == -1) {
                responsive = 23;
            }
            SliderDom.innerHTML = `
        <div class="item">
        <img src="img/${nameArr[responsive]}.jpg" />
        <div class="content">
          <div class="author">${difficult}</div>
          <div class="title">Your topic is</div>
          <div class="topic">${nameArr[responsive]}</div>
          <div class="buttons">
            <button class="play">Play</button>
          </div>
        </div>
      </div>
        `
        })

        final, addEventListener('click', (e) => {
            let option = responsive + 9
            localStorage.setItem("option", option)
            console.log('sucess');
            window.location.href = '#'
        })
    }
    else {
        let final = document.querySelectorAll('.play')
        let nextDom = document.getElementById('next');
        let prevDom = document.getElementById('prev');
        let carouselDom = document.querySelector('.carousel');
        let SliderDom = carouselDom.querySelector('.carousel .list');
        let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
        let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
        let timeDom = document.querySelector('.carousel .time');
        let parents = document.querySelector('.arrows')
        let child1 = document.querySelector('.on')
        let child2 = document.querySelector('.tooltip-lens')
        let difficult = localStorage.getItem('dif') || 'MEDIUM'
        let diff = document.querySelectorAll('.author')
        diff.forEach(ele => {
            ele.innerHTML = difficult
        })



        //step 1: get DOM

        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        let timeRunning = 500;
        let clickTool = 0
        let clcikScroll = 0
        let responsive = 0;
        nextDom.onclick = function () {
            responsive++
            if (responsive == 24) {
                responsive = 0;
            }
            showSlider('next');
            clickTool++
            if (clickTool == 1) {
                parents.removeChild(child2)
            }
        }

        prevDom.onclick = function () {
            responsive--
            if (responsive == -1) {
                responsive = 23;
            }
            showSlider('prev');
            clickTool++
            if (clickTool == 1) {
                parents.removeChild(child2)
            }
        }

        final.forEach(play => {
            play.addEventListener('click', (e) => {
                let option = responsive + 9
                localStorage.setItem("option", option)
                console.log('sucess');
                window.location.href = '#'
            })
        })

        carouselDom.addEventListener('wheel', function (event) {
            if (event.deltaY < 0) {
                responsive--
                if (responsive == -1) {
                    responsive = 23;
                }
                showSlider('prev');
                clcikScroll++
                if (clcikScroll == 1) {
                    parents.removeChild(child1)
                }
            } else {
                responsive++
                if (responsive == 24) {
                    responsive = 0;
                }
                showSlider('next');
                clcikScroll++
                if (clcikScroll == 1) {
                    parents.removeChild(child1)
                }
            }
        });

        let runTimeOut;
        function showSlider(type) {
            let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
            let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

            if (type === 'next') {
                SliderDom.appendChild(SliderItemsDom[0]);
                thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
                carouselDom.classList.add('next');
            } else {
                SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
                thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
                carouselDom.classList.add('prev');
            }
            clearTimeout(runTimeOut);
            runTimeOut = setTimeout(() => {
                carouselDom.classList.remove('next');
                carouselDom.classList.remove('prev');
            }, timeRunning);
        }
    }

})

