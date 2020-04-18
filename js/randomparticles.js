var para = {
    num: 100,
    color: false, // 颜色  如果是false 则是随机渐变颜色
    r: 0.9, // 圆每次增加的半径
    o: 0.09, // 判断圆消失的条件，数值越大，消失的越快
    a: 1,
  },
  color,
  color2,
  round_arr = []; // 存放圆的数组

function animateMouseMove() {
  if (!para.color) {
    color += 0.1;
    color2 = "hsl(" + color + ",100%,80%)";
  }

  content.clearRect(0, 0, WIDTH, HEIGHT);

  for (var i = 0; i < round_arr.length; i++) {
    content.fillStyle = color2;
    content.beginPath();
    content.arc(
      round_arr[i].mouseX,
      round_arr[i].mouseY,
      round_arr[i].r,
      0,
      Math.PI * 2
    );
    content.closePath();
    content.fill();
    round_arr[i].r += para.r;
    round_arr[i].o -= para.o;
    if (round_arr[i].o <= 0) {
      round_arr.splice(i, 1);
      i--;
    }
  }
  window.requestAnimationFrame(animateMouseMove);
}

window.onmousemove = function (event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  round_arr.push({
    mouseX: mouseX,
    mouseY: mouseY,
    r: para.r, // 设置半径每次增大的数值
    o: 1,
  });
};

if (para.color) {
  color2 = para.color;
} else {
  color = Math.random() * 360;
}

animateMouseMove();
