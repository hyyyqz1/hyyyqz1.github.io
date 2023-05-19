// 声明全局变量
var imageIndex;
var imageDir = './background/';
var imageList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];

// 将此代码块放在开始或在window的load事件侦听器中

// 将代码放在window的load事件侦听器中
window.addEventListener('load', function() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  if (window.matchMedia('(max-width: 600px)').matches) {
    imageDir = './background_m/';
  }

  var imageUrl = "url('" + imageDir + "HOTN.png')";
  document.documentElement.style.backgroundImage = imageUrl;

  imageIndex = getRandomInt(imageList.length);

  var preloadImage = new Image();
  preloadImage.src = imageDir + imageList[imageIndex] + ".jpg";


  var waitForImages = function() {
    var totalImages = 2; // HOTN.png 和随机背景图片总数
    var loadedImages = 0;
    var loaderEl = document.querySelector(".loader span");

    var checkCompletion = function() {
      loadedImages++;
      var loadProgress = loadedImages / totalImages;

      gsap.to(loaderEl, {
        duration: 1,
        scaleX: loadProgress,
        backgroundColor: 'hsl(' + loadProgress * 120 + ', 100%, 50%)'
      });

      if (totalImages === loadedImages) {
        gsap.timeline()
          .to(".loading__wrapper", {
            duration: 0.8,
            opacity: 0,
            pointerEvents: "none"
          })
          .call(function() {
          
          });
      }
    };

    var bgImg = new Image();
    bgImg.src = imageUrl.slice(5, -2); // 获取背景图片的 URL
    bgImg.onload = function() {
      checkCompletion();
    };

    var randomImg = new Image();
    randomImg.src = imageDir + imageList[imageIndex] + ".jpg";
    randomImg.onload = function() {
      checkCompletion();
    };
  };

  setTimeout(function() {
    var imageUrl = "url('" + imageDir + imageList[imageIndex] + ".jpg')";
    document.documentElement.style.backgroundImage = imageUrl;
  }, 1000);

  setTimeout(function() {
    var nextImageIndex = (imageIndex + 1) % imageList.length;
    var preloadNextImage = new Image();
    preloadNextImage.src = imageDir + imageList[nextImageIndex] + ".jpg";
  }, 20000);

  // Rest of the code

  waitForImages();
});

document.addEventListener("DOMContentLoaded", function() {
var button1 = document.getElementById("change-background-button1");
button1.addEventListener("click", function() {
  changeBackground(1);
});
var button11 = document.getElementById("change-background-button11");
button11.addEventListener("click", function() {
  changeBackground(1);
});

var button2 = document.getElementById("change-background-button2");
button2.addEventListener("click", function() {
  changeBackground(-1);
});
var button22 = document.getElementById("change-background-button22");
button22.addEventListener("click", function() {
  changeBackground(-1);
});

function changeBackground(direction) {
  imageIndex = (imageIndex + direction + imageList.length) % imageList.length;
  var imageUrl = "url('" + imageDir + imageList[imageIndex] + ".jpg')";
  document.documentElement.style.backgroundImage = imageUrl;
  var nextImageIndex = (imageIndex + direction + imageList.length) % imageList.length;
  var preloadNextImage = new Image();
  preloadNextImage.src = imageDir + imageList[nextImageIndex] + ".jpg";}
});


var input = document.getElementById('searchBox');
var list = document.getElementById('suggestionList');
var btn = document.getElementById('searchBtn');
var clearBtn = document.createElement('button');
var script;



function getHistory() {
  var history = [];
  if (localStorage.getItem('searchHistory')) {
    history = JSON.parse(localStorage.getItem('searchHistory'));
  }
  return history.reverse();
}


function showHistory() {
  var history = getHistory();
  list.innerHTML = '';
  history.forEach(function(item) {
    var listItem = document.createElement('li');
    listItem.innerText = item;
    list.appendChild(listItem);
    listItem.addEventListener('click', function(e) {
      input.value = e.target.innerText;
      search();
    });
  });

  input.style.boxShadow = '0px -5px 10px rgba(0, 0, 0, 0.5)';
  input.style.borderRadius = '15px 15px 0px 0px';
  input.style.transition = 'box-shadow 0.3s ease-in-out 0s, border-radius 0.2s ease-in-out 0s';
  clearBtn.innerText = '······ 清除搜索记录 ······';
  clearBtn.style.backgroundColor = 'rgba(79, 110, 255, 0.3)';
  clearBtn.style.color = '#0019ed';
  clearBtn.style.border = '0px';
  clearBtn.style.height = '40px';
  clearBtn.style.borderRadius = '1px 1px 15px 15px';
  clearBtn.style.width = input.offsetWidth + 'px';
  clearBtn.addEventListener('click', function() {
    localStorage.removeItem('searchHistory');
    showHistory();
  });
  list.appendChild(clearBtn);
// 添加延时
  setTimeout(function() {
    list.classList.add('show');
  }, 200);
}


function saveHistory(searchText) {
  var history = getHistory();
  if (history.indexOf(searchText) === -1) {
    history.push(searchText);
    if (history.length > 10) {
      history.splice(0, history.length - 8);
    }
    localStorage.setItem('searchHistory', JSON.stringify(history.reverse()));
  }
}


function search() {
  var searchText = input.value.trim();
  if (searchText.length > 0) {
    saveHistory(searchText);
    window.location.href = 'https://www.baidu.com/s?wd=' + encodeURIComponent(searchText);
  }
}


input.addEventListener('input', function() {
  if (script) {
    document.body.removeChild(script);
  }
  script = document.createElement('script');
  script.src = 'https://www.baidu.com/su?wd=' + input.value + '&p=3&cb=showSuggestion';
  document.body.appendChild(script);

  // 判断输入框是否为空，如果是则清空列表
setTimeout(function() { 
  if (input.value === '') {
      list.classList.remove('show');
      input.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';  
      input.style.borderRadius = '22px';
      input.style.transition = 'box-shadow 0.15s ease-in-out 0.3s, border-radius 0.15s ease-in-out 0.3s';

   }
  }, 800);  
  // 判断列表是否为空，如果是恢复搜索框  
setTimeout(function() {
    if (list.innerHTML.trim() === '') {
    	list.classList.remove('show');
        input.style.borderRadius = '22px';
        input.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';  
        input.style.transition = 'box-shadow 0.3s ease-in-out 0s, border-radius 0.3s ease-in-out 0s';
    }
    else {
    	input.style.borderRadius = '15px 15px 0px 0px';
    	input.style.boxShadow = '0px -5px 10px rgba(0, 0, 0, 0.5)';
          }
  }, 500);


});


function showSuggestion(data) {
  list.innerHTML = '';
  for (var i = 0; i < data.s.length; i++) {
    var item = document.createElement('li');
    item.innerText = data.s[i];
    list.appendChild(item);
    item.addEventListener('click', function(e) {
      input.value = e.target.innerText;
      search();
    });
  }
    input.style.boxShadow = '0px -5px 10px rgba(0, 0, 0, 0.5)';
    input.style.borderRadius = '15px 15px 0px 0px';
    input.style.transition = 'box-shadow 0.3s ease-in-out 0s, border-radius 0.2s ease-in-out 0s';
// 添加延时
  setTimeout(function() {
    list.classList.add('show');
  }, 200);

}


btn.addEventListener('click', search);


input.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    search();
  }
});
input.addEventListener('focus', function() {
  showHistory();
});

document.addEventListener('click', function(e) {
  if (!list.contains(e.target) && e.target !== input) {
  	  input.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';    
      list.classList.remove('show');
      input.style.borderRadius = '22px';
      input.style.transition = 'box-shadow 0.3s ease-in-out 0.3s, border-radius 0.3s ease-in-out 0.3s';
        }
});