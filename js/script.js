window.onload = function () {
  AOS.init();
  // 스크롤 기능
  // 스크롤바의 상단위치
  let scy = 0;
  let scActive = 50;
  scy = window.document.documentElement.scrollTop;
  let header = document.querySelector(".header");
  header.addEventListener("mouseenter", function () {
    header.classList.add("header-active");
  });
  header.addEventListener("mouseleave", function () {
    if (scy < scActive) {
      header.classList.remove("header-active");
    }
  });
  //   새로고침시
  window.addEventListener("scroll", function () {
    scy = window.document.documentElement.scrollTop;
    // console.log(scy);
    if (scy > scActive) {
      header.classList.add("header-active");
    } else {
      header.classList.remove("header-active");
    }
  });
  //   클릭 스크롤
  const navBar = document.querySelectorAll(".header-right > div");
  const goPortfolio = document.querySelector(".vmw");
  navBar.forEach((navBarItem) => {
    navBarItem.addEventListener("click", (e) => {
      link = e.currentTarget.dataset.link;
      scrollIntoView(link);
    });
  });
  goPortfolio.addEventListener("click", () => {
    scrollIntoView(goPortfolio.datatset.link);
  });
  // // 스크롤 이동 함수
  function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
  }
  // json파일 로드 및 데이터 출력
  fetch("lee.json")
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      const portfolioItems = data.portfolioItems;
      const dataVisual = document.getElementById("data-visual");
      portfolioItems.forEach((item) => {
        // console.log(item);
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
          <div class="project">
          <div class="pj-img">
              <img src="${item.src}" class"stx-gif"/>
          </div>
          <div class="study-project">
              <h2 class="pp">${item.h}</h2>
              <h1>${item.title}</h1>
              <p>${item.date}</p>
              <span>
                  제작 인원: ${item.contributors} <br />
                  사용 프로그램: ${item.technologies}
              </span>
              <div class="swiper-btn">
              <a href="${item.link.work || item.link.Notion}" target="_blank">${item.link.workLabel}</a>
              <a href="${item.link.github || item.link.GitHub}" target="_blank">${item.link.githubLabel}</a>
              <a href="${item.link.origin || item.link.Figma}" target="_blank">${item.link.originLabel}</a>
              </div>
          </div>
        </div>
          `;
        dataVisual.appendChild(slide);
      });
      // Swiper 슬라이더 초기화 코드 추가
      new Swiper(".swVisual", {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        },
        // 추가적인 Swiper 설정을 여기에 추가할 수 있습니다.
      });
    })
    .catch((error) => {
      console.error("JSON 파일 로드 중 오류 발생:", error);
    });
  // 스킬 툴 스크롤 감지
  const SNT = document.querySelector(".snt-box");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animatedProgressSpans = document.querySelectorAll(".animated-progress span");
        animatedProgressSpans.forEach(function (span) {
          const dataProgress = span.getAttribute("data-progress");
          span.style.width = dataProgress + "%";
          span.textContent = dataProgress + "%";
          const duration = 1000;
          const start = performance.now();
          const end = start + duration;
          function animate() {
            const now = performance.now();
            const timeFraction = (now - start) / duration;
            if (timeFraction > 1) {
              span.style.width = dataProgress + "%";
              return;
            }
            const progress = timeFraction;
            span.style.width = progress * dataProgress + "%";
            requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
        });
      }
    });
  });
  observer.observe(SNT);
};
