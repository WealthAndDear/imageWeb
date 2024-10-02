var automaticSpeedElement = document.getElementById("automaticSpeed");
var automaticSpeedValue = parseFloat(automaticSpeedElement.textContent) || 0.0; // 将文本内容转换为浮点数

var scrollInterval; // 用于存储滚动的间隔
var isAutoScrolling = false; // 记录自动滚动状态
var autoScrollDelay = 10; // 自动滚动暂停后恢复的延迟时间（毫秒）

// 获取按钮元素
var playPauseBtn = document.getElementById('autoPlayLink');
var speedElement = document.getElementById("automaticSpeed");
var addBtn = document.getElementById("automaticAdd");
var reduceBtn = document.getElementById("automaticreduce");

// 标记首次点击或首次快捷键操作
var hasStarted = false;

// 设置速度的最大值和最小值
const MAX_SPEED = 5;
const MIN_SPEED = -5;

// 为点击“阅读”按钮添加点击事件监听器
playPauseBtn.addEventListener('click', function (event) {
    event.preventDefault(); // 阻止默认行为

    if (!isAutoScrolling) { // 如果当前没有自动滚动
        if (!hasStarted) { // 首次点击
            automaticSpeedValue = Math.min(MAX_SPEED, automaticSpeedValue + 1); // 增加速度并限制最大值
            speedElement.textContent = (automaticSpeedValue).toFixed(1); // 更新速度元素的内容
            hasStarted = true; // 标记已启动
        }
        startAutoScroll(); // 开始自动滚动
    } else { // 如果当前正在自动滚动
        stopAutoScroll(); // 停止自动滚动
    }
});

// 开始自动滚动
function startAutoScroll() {
    isAutoScrolling = true;
    scrollInterval = setInterval(function () {
        var scrollDistance = automaticSpeedValue;
        window.scrollBy(0, scrollDistance); // 执行滚动
        console.log('本次滚动距离：', scrollDistance);
    }, 10); // 每隔 40ms 触发一次滚动
    document.getElementById('toggleText').innerText = '停止';
}

// 停止自动滚动
function stopAutoScroll() {
    isAutoScrolling = false;
    clearInterval(scrollInterval); // 停止滚动
    document.getElementById('toggleText').innerText = '阅读';
}

// 为加号元素添加点击事件监听器
addBtn.addEventListener("click", function () {
    automaticSpeedValue = Math.min(MAX_SPEED, automaticSpeedValue + 1); // 增加 1 并限制最大值
    speedElement.textContent = (automaticSpeedValue).toFixed(1); // 更新速度元素的内容并保留一位小数
    console.log('automaticSpeedValue：', automaticSpeedValue);
});

// 为减号元素添加点击事件监听器
reduceBtn.addEventListener("click", function () {
    automaticSpeedValue = Math.max(MIN_SPEED, automaticSpeedValue - 1); // 减少 1 并限制最小值
    speedElement.textContent = (automaticSpeedValue).toFixed(1); // 更新速度元素的内容并保留一位小数
    console.log('automaticSpeedValue：', automaticSpeedValue);
});

// 快捷键控制
var isIncreasing = false;
var isDecreasing = false;

// 获取视口高度的 1%
function getScrollDistance() {
    return window.innerHeight * 10; // 1vh
}

// 快捷键控制
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || event.key === ' ') { // 按下 Esc 或空格键时触发
        event.preventDefault(); // 防止空格键默认行为（例如页面滚动）
        if (!isAutoScrolling) { // 如果没有自动滚动
            if (!hasStarted) { // 首次启动
                automaticSpeedValue = Math.min(MAX_SPEED, automaticSpeedValue + 1); // 增加速度并限制最大值
                speedElement.textContent = (automaticSpeedValue).toFixed(1); // 更新速度元素的内容
                hasStarted = true; // 标记已启动
            }
            startAutoScroll(); // 启动自动滚动
        } else { // 如果正在自动滚动
            stopAutoScroll(); // 停止自动滚动
        }
    } else if (event.key === '+' || event.key === '=') { // '+' 键或 '=' 键
        if (!isIncreasing) {
            isIncreasing = true;
            increaseSpeed();
        }
    } else if (event.key === '-' || event.key === '_') { // '-' 键或 '_' 键
        if (!isDecreasing) {
            isDecreasing = true;
            decreaseSpeed();
        }
    } else if (event.key === 'ArrowUp') { // 上箭头键
        event.preventDefault(); // 防止默认滚动行为
        stopAutoScroll(); // 暂停自动滚动
        window.scrollBy(0, -getScrollDistance()); // 向上滚动 1vh
        setTimeout(startAutoScroll, autoScrollDelay); // 10ms 后恢复自动滚动
    } else if (event.key === 'ArrowDown') { // 下箭头键
        event.preventDefault(); // 防止默认滚动行为
        stopAutoScroll(); // 暂停自动滚动
        window.scrollBy(0, getScrollDistance()); // 向下滚动 1vh
        setTimeout(startAutoScroll, autoScrollDelay); // 10ms 后恢复自动滚动
    }
});


document.addEventListener('keyup', function (event) {
    if (event.key === '+' || event.key === '=') {
        isIncreasing = false;
    } else if (event.key === '-' || event.key === '_') {
        isDecreasing = false;
    }
});

// 增加速度
function increaseSpeed() {
    if (isIncreasing) {
        automaticSpeedValue = Math.min(MAX_SPEED, automaticSpeedValue + 1); // 增加 1 并限制最大值
        speedElement.textContent = (automaticSpeedValue).toFixed(1); // 更新速度元素的内容并保留一位小数
        console.log('automaticSpeedValue：', automaticSpeedValue);
        setTimeout(increaseSpeed, 100); // 每 100ms 增加一次速度
    }
}

// 减少速度
function decreaseSpeed() {
    if (isDecreasing) {
        automaticSpeedValue = Math.max(MIN_SPEED, automaticSpeedValue - 1); // 减少 1 并限制最小值
        speedElement.textContent = (automaticSpeedValue).toFixed(1); // 更新速度元素的内容并保留一位小数
        console.log('automaticSpeedValue：', automaticSpeedValue);
        setTimeout(decreaseSpeed, 100); // 每 100ms 减少一次速度
    }
}
