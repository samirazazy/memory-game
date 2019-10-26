// Memory Game Script StaRT
const cards = document.querySelectorAll(".memoryGameCard");

var memoryCards = cards.length / 2;
var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;
var i = 0;
var matched = document.getElementById("correct");
var worng = document.getElementById("incorrect");
var completeGame = document.getElementById("completeGame");
var colors=['green','blue','orange', 'brown', 'yellow', 'red', 'black', 'whait']

function flipCard() {
  stopAudio();
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  };

  // second click
  secondCard = this;

  checkForMatch();
};

function checkForMatch() {
  var isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
};

function disableCards() {
 
  matched.play();
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);


firstCard.style.background = colors[i];
secondCard.style.background = colors[i];
  
i++;

 if (i == memoryCards) {
    $(".showAnsBtn").addClass("disabled");
    completeGame.play();
  }

  resetBoard();
};

function unflipCards() {
  lockBoard = true;
  setTimeout(() => { worng.play(); },600);

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1200);
};

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

cards.forEach(card => card.addEventListener("click", flipCard));

function realoadGame() {

  i = 0;
  $(".memoryGameCard").removeClass("flip");
    cards.forEach(card =>{
      card.addEventListener("click", flipCard);
      card.style.background = "";
    }
  );
  resetBoard();
  setTimeout(()=>shuffle(),400);
};

function showCards() {
  $(".memoryGameCard").addClass("flip");
  cards.forEach(card => card.removeEventListener("click", flipCard));
  colorOnShow()
};

function colorOnShow(){
  $(".image1").css("background",colors[0]);
  $(".image2").css("background",colors[1]);
  $(".image3").css("background",colors[2]);
  $(".image4").css("background",colors[3]);
  $(".image5").css("background",colors[4]);
  $(".image6").css("background",colors[5]);
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
};

// Memory Game Script

var isMusic1Playing = false;
var isMusic2Playing = false;
var $audio1 = $("#audioPlayer1");
var $audio2 = $("#audioPlayer2");
var slider = document.getElementById("myRange");

var lastAudio = 0;

var totalItems = $(".item").length;
var currentIndex = $("div.active").index() + 1;

function fnTemplate2_v1(_div) {
  $(".pageContent").css(
    "background",
    "rgb(255, 255, 255)  repeat scroll 20% 30%"
  );

  var slide = $(_div);

  $audio1[0].currentTime = 0;
  // $("#slider").slider({"value": 0});
  slider.value = 0;
  $audio1[0].pause();
  $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
  // isMusic1Playing = true;
  $("#pButton .playImg").show();
  $("#pButton .pauseImg").hide();

  setAudio($(slide).attr("data-audioSrc"));
  //fnStartAudio('play');

  $(slide)
    .find(".callout")
    .on("click", function () {
      if ($(this).hasClass("itemDisable")) {
        return false;
      }
      fnTitleAudioClick(this);
      var $that = $(this);
      setTimeout(function () {
        $(".callout").css("background-color", "#ffffff");
        $that.css("background-color", "#FFFF00");
        //fnStartAudio('pause');
      }, 25);
    });
}

function fnReloadAll() {
  stopAudio();
  realoadGame();
  $(".showAnsBtn").removeClass("disabled");

  $(".callout").css("background-color", "#ffffff");
  $("#myCarousel").carousel(0);
  $(".callout").off("click");
  stopAudio();
  fnTemplate2_v1($("div.active"));
}

function fnReloadScreen() {
  $(".callout").css("background-color", "#ffffff");
  $(".callout").off("click");
  stopAudio();
  fnTemplate2_v1($("div.active"));
}

function setAudio(_src) {
  if (_src == "") {
    $(".controlsDiv").addClass("hide");
  } else {
    $(".controlsDiv").removeClass("hide");
  }
  $audio1[0].setAttribute("src", _src);
  $audio1[0].load();
}

/* Title Audio function */
function fnTitleAudioClick(obj) {
  if ($(obj).hasClass("hide")) {
    return false;
  }
  //$audio1[0].currentTime = 0;
  //$("#slider").slider({"value": 0});
  $audio1[0].pause();
  $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
  $("#pButton .playImg").show();
  $("#pButton .pauseImg").hide();
  var titleAudioPath = $(obj).attr("data-audioSrc");
  $audio2[0].setAttribute("src", titleAudioPath);
  $audio2[0].load();
  $audio2[0].play();
  isMusic1Playing = false;
  isMusic2Playing = true;
}

function fnUpdateTimer() {
  var progressValue = Math.round(
    ($audio1[0].currentTime / $audio1[0].duration) * 100
  );

  slider.value = progressValue;
}

function fnStartAudio(_state) {
  $audio2[0].pause();
  if (_state == "play") {
    $("#pButton .playImg").hide();
    $("#pButton .pauseImg").show();
    $audio1[0].play();
    isMusic1Playing = true;
  } else {
    $("#pButton .playImg").show();
    $("#pButton .pauseImg").hide();
    $audio1[0].pause();
    lastAudio = 0;
    isMusic1Playing = false;
  }
  $audio1[0].addEventListener("timeupdate", fnUpdateTimer);
}

function showAns() {
  stopAudio();
  // music.pause();
  // pButton.className = "";
  // pButton.className = "play";
  if ($(".showAnsBtn").hasClass("disabled")) {
    return false;
  }
  showCards();

  $audio1[0].pause();
  $audio2[0].pause();

  // $('.showAnswerTickMark').fadeIn('slow');
  $("div.active")
    .find('.option[data-Answer="correct"]')
    .addClass("correctTick");
  $("div.active")
    .find('.option[data-Answer="incorrect"]')
    .addClass("disabled");
  $("div.active")
    .find(".option")
    .addClass("optDisable")
    .off("click");
  // $(".option[data-Answer='incorrect']").css('opacity','0.6');
  $(this).addClass("disabled");
}

function stopAudio() {
  $audio1[0].pause();
  $("#pButton .playImg").show();
  $("#pButton .pauseImg").hide();
  $audio1[0].currentTime = 0;
  slider.value = 0;
  isMusic1Playing = false;
  $audio2[0].pause();
  isMusic2Playing = false;
  lastAudio = 0;
}

function fnSetPlayer() {
  if (currentIndex == 1) {
    $(".backBtn").addClass("disabled");
  }

  if (totalItems == 1) {
    $(
      ".navigationControls, .nextBtn, .reloadBtnScreen, .backBtn, .pageNumber"
    ).addClass("hide");
  }

  if ($(".title").attr("data-audioSrc") == "") {
    $(".title").addClass("hide");
    $(".headingTitle")
      .removeClass("col-xs-10")
      .addClass("col-xs-11");
  }

  $audio1[0].addEventListener("playing", function () {
    lastAudio = 1;
    isMusic1Playing = true;
  });

  $audio2[0].addEventListener("playing", function () {
    lastAudio = 2;
    isMusic2Playing = true;
  });

  $audio1[0].addEventListener("pause", function () {
    isMusic1Playing = false;
  });

  $audio2[0].addEventListener("pause", function () {
    isMusic2Playing = false;
  });

  $audio2[0].addEventListener("ended", function () {
    $(".callout").css("background-color", "#ffffff");
    lastAudio = 0;
  });

  $audio1[0].addEventListener("ended", function () {
    lastAudio = 0;
    isMusic1Playing = false;
    $audio1[0].currentTime = 0;
    slider.value = 0;
    $audio1[0].pause();
    $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
    $("#pButton .playImg").show();
    $("#pButton .pauseImg").hide();
  });

  $audio2[0].addEventListener("ended", function () {
    lastAudio = 0;
  });

  slider.addEventListener(
    "input",
    function () {
      // console.log(">> input "+slider.value);
      // $audio1[0].pause();
      $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
      var setTime = Math.round((slider.value * $audio1[0].duration) / 100);
      $audio1[0].currentTime = setTime;
    },
    false
  );

  slider.addEventListener(
    "change",
    function () {
      // console.log("change >> "+isMusic1Playing);
      if (isMusic1Playing) {
        $audio1[0].play();
        $audio1[0].addEventListener("timeupdate", fnUpdateTimer);
      }
    },
    false
  );

  $("#myCarousel").on("slid.bs.carousel", function () {
    currentIndex = $("div.active").index() + 1;
    $(".pageNumber").html(currentIndex + " of " + totalItems);
    if (currentIndex == 1) {
      $(".backBtn").addClass("disabled");
    } else {
      $(".backBtn").removeClass("disabled");
    }

    if (currentIndex == totalItems) {
      $(".nextBtn").addClass("disabled");
    } else {
      $(".nextBtn").removeClass("disabled");
    }

    // need to edit template function name here:
    fnTemplate2_v1($("div.active"));
  });

  $(".pageNumber").html(currentIndex + " of " + totalItems);
}
