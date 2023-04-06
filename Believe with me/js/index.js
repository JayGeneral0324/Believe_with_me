// /* 获取类名 */
const getElement = (selector) => document.querySelector(selector);
const getElements = (selector) => document.querySelectorAll(selector);
const [wheel, gu, gugugu, FirstClick, SecondClick, ThirdClick, FourthClick, Music1, Music2, Music3, Music4, UpText, StartTitle, Top, Twenty_two, box, A7, A8, A9, down, End, Picture1, Picture2, Picture3, Picture4, Picture5, Say,] = [".wheel", ".gu", ".gugugu", ".FirstClick", ".SecondClick", ".ThirdClick", ".FourthClick", ".music1", ".music2", ".music3", ".music4", ".upuptext", ".start_title", ".top", ".twenty-two", ".box", ".architecture_7", ".architecture_8", ".architecture_9", ".down", ".End", ".Picture1", ".Picture2", ".Picture3", ".Picture4", ".Picture5", ".say"].map(getElement);
const [BounceZero, BounceOne, BounceTwo, BounceThree, BounceFour, BounceFive, BounceSix, BounceSeven] = [".Bounce0", ".Bounce1", ".Bounce2", ".Bounce3", ".Bounce4", ".Bounce5", ".Bounce6", ".Bounce7"].map(getElements);
const UpJt = getElements(".upJT");

/* 渐进箭头 */
function reverseArrowAnimation() {
  function showOne(index) { // 定义一个函数，用于控制指定位置元素的透明度为 0.2，其他为 1
    for (let i = 0; i < UpJt.length; i++) {
      if (i === index) {
        UpJt[i].style.opacity = 1;
      } else {
        UpJt[i].style.opacity = 0.2;
      }
    }
  }
  let currentIndex = UpJt.length - 1; // 定义当前显示元素的索引为最后一个
  setInterval(() => { // 每隔一定时间切换显示元素
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = UpJt.length - 1;
    }
    showOne(currentIndex);
  }, 100); // 时间间隔为 1 秒钟
}

/* 封装滑动 */
function slide_up(threshold, callback) {
  let touchStartX = 0; // 记录手指触摸屏幕时的横坐标
  let touchStartY = 0; // 记录手指触摸屏幕时的纵坐标
  document.addEventListener('touchstart', function (event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  });
  document.addEventListener('touchmove', function (event) {
    let touchEndX = event.touches[0].clientX;
    let touchEndY = event.touches[0].clientY;
    let distanceX = touchEndX - touchStartX;
    let distanceY = touchEndY - touchStartY;
    let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY); // 计算手指滑动的距离
    if (distance > threshold) { // 如果手指滑动距离超过阈值，则执行回调函数
      callback();
    }
  });
}

/* 上滑启动 */
setTimeout(() => {
  UpText.style.display = 'block'; // 2秒后显示上滑提示
  reverseArrowAnimation(); // 调用函数开始动画
  slide_up(90, function () {  // 调用滑动事件 （当向上滑动超过3cm时执行 下方命令）
    Bounce0();        // 初始建筑升起
    UpText.style.display = 'none';  // 滑动提示隐藏
    Picture1.style.display = "none";
    Picture2.style.display = "block";
  });
}, 2000);

/* 摩天轮 */
function StartWheel() { //创建一个摩天轮的函数
  let wheelNum = 1; // 声明摩天轮src默认路径 
  setInterval(() => {  // 循环定时 
    wheelNum++;      // 每100ms ++  
    if (wheelNum > 3) {  //全部三张图 当路径名大于 3 时，
      wheelNum = 1;      //  重新回到 1  
    }
    wheel.setAttribute("src", `./images/cut_map/z18-${wheelNum}.png`);  // 将循环++的摩天轮路径引入到路径
  }, 100);
}
StartWheel(); // 默认调用摩天轮函数

/* 小鸡动画 */
let stopTime = "";   // 声明一个全局变量 （方便之后关闭小鸡行走的动画定时）
function StartAnimation() {  // 创建一个行走动画函数

  let i = 2;  // 声明小鸡动作src 默认动作
  stopTime = setInterval(() => {  // 循环定时并将返回值传给全局变量
    i++; // 每200ms ++ 
    if (i > 5) {    // 判断大于最大动作时，
      i = 1;        // 重新回到第一个动作
    }
    gugugu.setAttribute("src", `./images/gugugu/gz${n}${i}.png`); // 将循环++ 的小鸡动作引入到路径
  }, 150);
}

let open = true; // 声明一个开关
let [clickCount1, clickCount2, clickCount3, clickCount4] = [0, 0, 0, 0]; // 初始化点击次数为0
/* 第一段点击 */
FirstClick.onclick = function () { // 创建第一个按键的点击事件
  if (open == true) {  // 判断开关状态
    open = false;  // 点击后关闭开关
    clickCount1++; // 点击次数加1
    // console.log('第一次的点击次数' + clickCount1 + open); 
    if (clickCount1 == 1) { // 第一次点击，执行以下操作
      Music4.play(); // 走路音效开启
      let childs = FirstClick.children[0]; // 获取光圈
      FirstClick.removeChild(childs); //清除光圈
      Say.style.display = "none"; // 清除鸽子说话
      gu.className = ""; //清除其他所有类名
      gu.classList.add('animation1', 'gu'); //添加动画类名
      StartAnimation()  // 调用行走动画
      n = 0  // n = 0 / 1 / 2 / 3  代表四个方向
      let t = 0; // 利用定时器判断时间转变方向
      let stopTT = setInterval(() => {  // 循环定时并把返回值传给 stopTT （用于关闭定时）
        t++; //每100ms ++ 
        if (t == 0) {
          n = 0;
        }
        if (t == 14) {
          n = 1;
        }
        if (t == 24) {
          n = 0;
        }
        if (t == 49) {
          n = 1;
        }
        if (t == 60) {
          clearTimeout(stopTime); // 结束行走动画
          clearTimeout(stopTT); // 结束方向变化
          Bounce2();  // 调用电话台阶上升
          Music4.pause(); // 走路音效关闭
          Music2.play(); // 开启第二段台阶的音效
          open = true; // 重启开关
          Picture2.style.display = "none";
          Picture3.style.display = "block";
          Say.style.opacity = "0"; // 清除鸽子说话
          // console.log('第一段动画完成后' + open);
        }
      }, 100);
    }
    if (clickCount1 > 1) {  // 不是第一次之后，执行以下操作
      n = 0;  // 设定一个方向 （可能没用，但不想试试）
      gu.className = "";  // 清空小鸡附带的所有类名
      gu.classList.add('absolute1', 'gu');  // 给小鸡添加固定位置的类名 "absolute1" 和 基础 "gu" 类名 （闪现）
      open = true;  // 重启开关 （闪现时开关永远启动） 
      Say.style.opacity = "0"; // 清除鸽子说话
      Picture1.style.display = "none";
      Picture2.style.display = "none";
      Picture4.style.display = "none";
      Picture5.style.display = "none";
      Picture3.style.display = "block";
      // console.log('第一段第二次点击开关状态' + open);
    }
  }
}

/* 第二段点击 */
SecondClick.onclick = function () {  // 创建第二个按键的点击事件
  if (open == true) {  // 判断开关状态
    open = false;  // 点击后关闭开关
    clickCount2++;  // 点击次数加1
    // console.log('第二次的点击次数' + clickCount2 + open);
    if (clickCount2 == 1) {  // 第一次点击，执行以下操作
      let childs = SecondClick.children[0];
      SecondClick.removeChild(childs);
      gu.className = ""; // 清空小鸡附带的所有类名
      gu.classList.add('animation2', 'gu');  //添加动画类名
      Music4.play(); // 走路音效开启
      StartAnimation()  // 调用行走动画
      n = 0  // n = 0 / 1 / 2 / 3  代表四个方向
      let t = 0;  // 利用定时器判断时间转变方向
      let stopTT = setInterval(() => {  // 循环定时并把返回值传给 stopTT （用于关闭定时）
        t++; //每100ms ++ 
        if (t == 0) {
          n = 0;
        }
        if (t == 7) {
          n = 1;
        }
        if (t == 45) {
          Bounce4(); // 调用WiFi台阶上升
          clearTimeout(stopTime); // 结束行走动画
          clearTimeout(stopTT);  // 结束方向变化
          Music4.pause(); // 走路音效关闭
          Music2.play(); // 开启第三段台阶的音效
          Picture1.style.display = "none";
          Picture2.style.display = "none";
          Picture3.style.display = "none";
          Picture4.style.display = "block";
          // console.log('第二段动画完成后' + open);
        }
      }, 100)
    }
    if (clickCount2 > 1) {  // 不是第一次之后，执行以下操作
      n = 2; // 设定一个方向 （但可能没卵用）
      gu.className = ""; // 清空小鸡附带的所有类名
      gu.classList.add('absolute2', 'gu'); // 闪现
      open = true; // 重启开关 
      Picture1.style.display = "none";
      Picture2.style.display = "none";
      Picture3.style.display = "none";
      Picture5.style.display = "none";
      Picture4.style.display = "block";
      // console.log('第二段第二次点击开关状态' + open);
    }
  }
}

/* 第三段点击 */
ThirdClick.onclick = function () {   // 创建第三个按键的点击事件
  if (open == true) {  // 判断开关状态
    open = false;   // 点击后关闭开关
    clickCount3++;  // 点击次数加1
    // console.log('第三次的点击次数' + clickCount3 + open);
    if (clickCount3 == 1) {  // 第一次点击，执行以下操作
      let childs = ThirdClick.children[0];
      ThirdClick.removeChild(childs);
      gu.className = ""; // 清空小鸡附带的所有类名
      gu.classList.add('animation3', 'gu');   //添加动画类名
      Music4.play(); // 走路音效开启
      StartAnimation()   // 调用行走动画
      n = 2  // n = 0 / 1 / 2 / 3  代表四个方向
      let t = 0;  // 利用定时器判断时间转变方向
      let stopTT = setInterval(() => {   // 循环定时并把返回值传给 stopTT （用于关闭定时）
        t++;   //每100ms ++ 
        if (t == 0) {
          n = 2;
        }
        if (t == 14) {
          n = 3;
        }
        if (t == 24) {
          n = 2;
        }
        if (t == 40) {
          Bounce6();  // 调用金币台阶上升
          clearTimeout(stopTime);  // 结束行走动画
          clearTimeout(stopTT);  // 结束方向变化
          Music4.pause(); // 走路音效关闭
          Music2.play(); // 开启第四段台阶的音效
          Picture1.style.display = "none";
          Picture2.style.display = "none";
          Picture3.style.display = "none";
          Picture4.style.display = "none";
          Picture5.style.display = "block";
          // console.log('第三段动画完成后' + open);
        }
      }, 100)
    }
    if (clickCount3 > 1) {  // 不是第一次之后，执行以下操作
      n = 3;  // 设定一个方向 （但可能没卵用）
      gu.className = ""; // 清空小鸡附带的所有类名
      gu.classList.add('absolute3', 'gu');   // 闪现
      open = true;  // 重启开关 
      Picture1.style.display = "none";
      Picture2.style.display = "none";
      Picture3.style.display = "none";
      Picture4.style.display = "none";
      Picture5.style.display = "block";
      // console.log('第三段第二次点击开关状态' + open);
    }
  }
}

/* 第四段点击 */
FourthClick.onclick = function () {  // 创建第四个按键的点击事件
  if (open == true) {  // 判断开关状态
    open = false;   // 点击后关闭开关
    clickCount4++;  // 点击次数加1
    // console.log('第四次的点击次数' + clickCount4 + open);
    if (clickCount4 == 1) {   // 第一次点击，执行以下操作
      let childs = FourthClick.children[0];
      FourthClick.removeChild(childs);
      gu.className = ""; // 清空小鸡附带的所有类名
      gu.classList.add('animation4', 'gu');  //添加动画类名
      Music4.play(); // 走路音效开启
      StartAnimation()   // 调用行走动画
      n = 3   // n = 0 / 1 / 2 / 3  代表四个方向
      let t = 0;   // 利用定时器判断时间转变方向
      let stopTT = setInterval(() => {   // 循环定时并把返回值传给 stopTT （用于关闭定时）
        t++;   //每100ms ++ 
        if (t == 0) {
          n = 3;
        }
        if (t == 19) {
          n = 0;
        }
        if (t == 29) {
          n = 3;
        }
        if (t == 30) {
          clearTimeout(stopTime);   // 结束行走动画
          clearTimeout(stopTT); // 结束方向变化
          open = false; // 关闭开关
          Music4.pause(); // 走路音效关闭
          Say.style.opacity = "0"; // 清除鸽子说话
          Twenty_two.className = ""; // 清空飞升柱所有类名
          gu.classList.add('Bounce9') // 让小鸡起飞
          box.classList.add('box_top')  // 视角跟随上升
          down.classList.add('down_all')  // 所有建筑下降
          Twenty_two.classList.add('Bounce8') // 让飞升柱起飞
          Music3.play(); // 播放飞升音效
          StartTitle.style.display = "none"; // 标题隐藏
          Top.style.display = "none"; // 手机模型框隐藏
          setTimeout(() => {
            End.style.display = "block"; // 结尾显示
          }, 5000)
          // console.log('第四段动画完成后' + open);
        }
      }, 100)
    }
    if (clickCount4 > 1) {   // 不是第一次之后，执行以下操作
      n = 3;   // 设定一个方向 （但可能没卵用）
      gu.className = ""; // 清空小鸡附带的所有类名
      gu.classList.add('absolute4', 'gu'); // 闪现
      open = true; // 重启开关
      // console.log('第四段第二次点击开关状态' + open);
    }
  }
}

/* 开局建筑 */
function Bounce0() {
  for (let i = 0; i < BounceZero.length; i++) {
    setTimeout(() => {
      BounceZero[i].style.display = 'block';
      BounceZero[i].classList.add('_U_jump_I_jump')
      if (i == 3) {
        setTimeout(() => {
          Bounce1(); // 建筑全部升起1秒后自启动第一段台阶
          // Music2.play();
          Say.style.opacity = "1";
        }, 1000)
      }
    }, 200 * (i + 1))
  }
}

/* 第一段台阶 */
function Bounce1() {
  for (let i = 0; i < BounceOne.length; i++) {
    setTimeout(() => {
      BounceOne[i].style.display = 'block';
      BounceOne[i].classList.add('_U_jump_I_jump')
      /* 台阶全部停止后出现“点击圈” */
      setTimeout(() => {
        FirstClick.style.display = 'block';
        Music2.pause(); // 台阶音效关闭
      }, 5000)
    }, 500 * (i + 1))
  }
}

/* 电话台阶 */
function Bounce2() {
  for (let i = 0; i < BounceTwo.length; i++) {
    setTimeout(() => {
      BounceTwo[i].style.display = 'block';
      BounceTwo[i].classList.add('_U_jump_I_jump')
      if (i == 1) {
        setTimeout(() => {
          Bounce3(); // 电话台阶升起1秒后自启动第二段台阶
          A7.classList.add('up_bown')
        }, 1000)
      }
    }, 0 * (i + 1))

  }
}

/* 第二段台阶 */
function Bounce3() {
  for (let i = 0; i < BounceThree.length; i++) {
    setTimeout(() => {
      BounceThree[i].style.display = 'block';
      BounceThree[i].classList.add('_U_jump_I_jump')
      setTimeout(() => {
        SecondClick.style.display = 'block';
        Music2.pause(); // 台阶音效关闭
      }, 4000)
    }, 500 * (i + 1))
  }
}

/*  WiFi台阶 */
function Bounce4() {
  open = false;
  // console.log('调用Wifi时' + open);
  for (let i = 0; i < BounceFour.length; i++) {
    setTimeout(() => {
      BounceFour[i].style.display = 'block';
      BounceFour[i].classList.add('_U_jump_I_jump')
      if (i == 1) {
        setTimeout(() => {
          Bounce5(); // Wifi台阶升起1.5秒后自启动第三段台阶
          A8.classList.add('up_bown')
        }, 1500)
      }
    }, 0 * (i + 1))
  }
}

/* 第三段台阶 */
function Bounce5() {
  open = false;
  // console.log('调用台阶时' + open);
  for (let i = 0; i < BounceFive.length; i++) {
    setTimeout(() => {
      BounceFive[i].style.display = 'block';
      BounceFive[i].classList.add('_U_jump_I_jump')
      if (i == 4) {
        setTimeout(() => {
          open = true;
          // console.log('台阶上升完成时' + open);
          ThirdClick.style.display = 'block';
          Music2.pause(); // 台阶音效关闭
        }, 2000)
      }
    }, 500 * (i + 1))
  }
}

/*  金币台阶 */
function Bounce6() {
  open = false;
  // console.log('调用金币时' + open);
  for (let i = 0; i < BounceSix.length; i++) {
    setTimeout(() => {
      BounceSix[i].style.display = 'block';
      BounceSix[i].classList.add('_U_jump_I_jump')
      if (i == 1) {
        setTimeout(() => {
          Bounce7(); // Wifi台阶升起1.5秒后自启动第三段台阶
          A9.classList.add('up_bown')
        }, 1500)
      }
    }, 0 * (i + 1))
  }
}

/* 第四段台阶 */
function Bounce7() {
  open = false;
  // console.log('调用台阶时' + open);
  for (let i = 0; i < BounceSeven.length; i++) {
    setTimeout(() => {
      BounceSeven[i].style.display = 'block';
      BounceSeven[i].classList.add('_U_jump_I_jump')
      if (i == 3) {
        setTimeout(() => {
          FourthClick.style.display = 'block';
          open = true;
          // console.log('台阶上升完成时' + open);
          Music2.pause(); // 台阶音效关闭
        }, 2000)
      }
    }, 500 * (i + 1))
  }
}
