// 设置的平滑滚动
window.addEventListener('scroll', function () {
    var assembly = document.getElementById('assembly');
    if (window.scrollY > 66) {
        assembly.style.top = '-40px';
    } else {
        assembly.style.top = '50px';
    }
});







// 加载章节
// ajax请求
// 加载到底部自动刷新新的章节
// 从第二章开始
let currentChapterIndex = 2;

//章节段落 
var number = 2;
// 指定初始图片编号从第几章开始
// 指定初始图片编号从第几章开始，初始化为当前章节号
let currentIllustrationNumber = currentChapterNumber;
let isLoadingContent = false;

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('scroll', function () {
        if (!isLoadingContent && isScrollAtBottom()) {
            loadNextChapter();
        }
    });
});

// 获取当前页面的路径
var path = window.location.pathname;

// 使用 split 函数分割路径并提取最后一个部分（文件名）
var parts = path.split('/');
var filenameWithExtension = parts[parts.length - 1];

// 使用正则表达式提取文件名中的数字部分
var match = filenameWithExtension.match(/\d+/);
// 如果匹配到数字，则获取第一个匹配项，否则使用默认值1
var currentChapterNumber = match ? parseInt(match[0]) : 1;

// console.log("当前章节号：" + currentChapterNumber);

function isScrollAtBottom() {
    const totalHeight = document.body.scrollHeight;
    const visibleHeight = window.innerHeight;
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
    return scrollOffset + visibleHeight >= totalHeight;
}

function loadNextChapter() {
    isLoadingContent = true;
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    // 计算下一章的章节号
    const nextChapterNumber = currentChapterNumber + 1;

    // 读取本地文件
    const chapterFilename = `../textFile/Chapter${nextChapterNumber}.txt`;

    // 检查文件是否存在
    fetch(chapterFilename)
        .then(response => {
            if (!response.ok) {
                alert("已经到底啦...");
                throw new Error("当前页面加载完成");
            }
            return response.text();
        })
        .then(text => {
            const chapterContainer = createChapterElement(nextChapterNumber, text);

            // 创建一个新的内容容器，并将章节内容放入其中
            const newContentDiv = document.createElement('div');
            newContentDiv.id = 'content';

            newContentDiv.innerHTML = `
            <div id="chapter${nextChapterNumber}">
                <div class="container">
                    <div class="row p-2">
                        <div class="col-sm-12 col-12">
                            <div id="novel">
                                ${chapterContainer.outerHTML}
                            </div>
                            <div id="novel_button">
                                <div id="reward">
                                    <img class="rewardImg">
                                    <span>打赏</span>
                                </div>
                                <div id="comment">
                                    <img class="commentImg">
                                    <span>评论</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

            // 根据章节号设置不同的图片路径
            const chapterImagePath = `../image/${nextChapterNumber}.png`;

            // 创建一个新的内容容器，并将图片放入其中
            const illustration = document.createElement('div');
            illustration.id = 'illustration';

            illustration.innerHTML = `
                <div id="illustration">
                    <img src="${chapterImagePath}" alt="Your illustration">
                </div>
            `;

            // 将新章节追加到 body 元素的最后面
            document.body.appendChild(newContentDiv);
            // 追加图片
            document.body.appendChild(illustration);

            // 设置打赏和评论图片的 src 属性
            document.querySelectorAll('.rewardImg').forEach(img => {
                img.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svggift.svg';
                img.onerror = function () {
                    this.src = '备用图片的链接'; // 替换为实际的备用图片 URL
                };
            });

            document.querySelectorAll('.commentImg').forEach(img => {
                img.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgmessageSquare.svg';
                img.onerror = function () {
                    this.src = '备用图片的链接'; // 替换为实际的备用图片 URL
                };
            });

            console.log("第" + nextChapterNumber + "章加载成功");
            currentChapterNumber = nextChapterNumber; // 更新当前章节号
            currentIllustrationNumber++; // 图片编号递增
            isLoadingContent = false;
            loader.style.display = 'none';
        })
        .catch(error => {
            console.error("Error loading chapter:", error);
            loader.style.display = 'none';
        });
}

// 在适当的地方获取当前章节号，例如在加载下一章节的函数中
const nextChapterNumber = currentChapterNumber;

var content = document.getElementById("content")
// content.style.display = 'none'
// 创建一个新的图片元素
const illustrationImg = document.createElement('img');

// 设置图片的 src 和 alt 属性
illustrationImg.src = `../image/${nextChapterNumber}.png`;
illustrationImg.alt = 'Your illustration';

// 添加加载事件监听器
illustrationImg.addEventListener('load', function () {
    // 图片加载完成后，将其添加到 illustration 容器中
    const illustrationContainer = document.getElementById('illustration');
    illustrationContainer.innerHTML = ''; // 清空 illustration 容器
    illustrationContainer.appendChild(illustrationImg);
});

// 如果图片加载失败，可以显示一个错误占位符
illustrationImg.addEventListener('error', function () {
    const illustrationContainer = document.getElementById('illustration');
    illustrationContainer.innerHTML = 'Failed to load illustration'; // 显示错误信息
});

// 将新图片容器追加到 body 元素的最后面
document.body.appendChild(illustrationImg);


function createChapterElement(chapterIndex, content) {
    const chapterContainer = document.createElement('div');
    chapterContainer.id = 'chapter-' + chapterIndex;

    // 将内容分割成行
    const lines = content.split('\n');

    // 使用 <br> 标签在每行末尾添加换行
    const formattedContent = lines.slice(1).map(line => `<p>${line}</p>`).join('');

    // 获取第一行的内容
    const firstLine = lines[0].trim();

    // 设置章节容器的 HTML 内容
    if (firstLine !== '') {
        const firstLineHeader = `<h2 id="novel_chapter">${firstLine}</h2>`;
        chapterContainer.innerHTML = `${firstLineHeader}${formattedContent}`;
    } else {
        chapterContainer.innerHTML = formattedContent;
    }

    return chapterContainer;
}


// 获取当前页面的路径
var path = window.location.pathname;

// 使用正则表达式提取路径中的所有数字
var matches = path.match(/\d+/g);

// 如果匹配到数字，则获取最后一个匹配项，否则使用默认值1
var currentChapterNumber = matches ? parseInt(matches[matches.length - 1]) : 1;

console.log("当前章节号：" + currentChapterNumber);



// 默认文本动态化
// 读取本地文件
const chapterFilename = `../textFile/Chapter${currentChapterNumber}.txt`;

// 检查文件是否存在
fetch(chapterFilename)
    .then(response => {
        if (!response.ok) {
            alert("文件加载失败");
            throw new Error("文件加载失败");
        }
        return response.text();
    })
    .then(text => {
        // 获取包含小说内容的 div 元素
        const novelDiv = document.getElementById('novel');

        // 将文本内容插入到 div 元素中
        novelDiv.innerHTML = text;

        console.log("第" + currentChapterNumber + "章加载成功");
    })
    .catch(error => {
        console.error(error);
    });













// 阅读设置，字体文字，文字样式
var setting = document.getElementById("setting");
var settings = document.getElementById("settings");
var isSettingsVisible = false; // 初始状态为隐藏
var money = document.getElementById("money");
var moneys = document.getElementById("moneys");
var ismoneysVisible = false; // 初始状态为隐藏

money.onclick = function (event) {
    event.stopPropagation(); // 阻止点击事件冒泡，以防止立即隐藏设置

    if (ismoneysVisible) {
        moneys.style.display = 'none'; // 如果显示则隐藏
    } else {
        moneys.style.display = 'block'; // 如果隐藏则显示
        settings.style.display = 'none'; // 隐藏设置
        isSettingsVisible = false; // 更新设置的显示状态
    }

    ismoneysVisible = !ismoneysVisible; // 切换状态
};

setting.onclick = function (event) {
    event.stopPropagation(); // 阻止点击事件冒泡，以防止立即隐藏设置

    if (isSettingsVisible) {
        settings.style.display = 'none'; // 如果显示则隐藏
    } else {
        settings.style.display = 'block'; // 如果隐藏则显示
        moneys.style.display = 'none'; // 隐藏金额
        ismoneysVisible = false; // 更新金额的显示状态
    }

    isSettingsVisible = !isSettingsVisible; // 切换状态
};

// 点击页面其他地方隐藏设置或金额
document.addEventListener('click', function (event) {
    var targetElement = event.target;

    // 检查点击事件发生的位置是否在设置区域以外
    if (!settings.contains(targetElement) && targetElement !== setting) {
        settings.style.display = 'none';
        isSettingsVisible = false;
    }

    // 检查点击事件发生的位置是否在金额区域以外
    if (!moneys.contains(targetElement) && targetElement !== money) {
        moneys.style.display = 'none';
        ismoneysVisible = false;
    }
});

// 字体大小
var sizeButton = document.getElementById("size");
var currentFontSize = localStorage.getItem("fontSize") || 16;

// 设置初始字体大小到按钮
sizeButton.value = currentFontSize;

// 点击增加字体大小
document.getElementById("max_size").addEventListener("click", function () {
    currentFontSize = parseInt(currentFontSize) + 2;
    updateFontSize();
});

// 点击减小字体大小
document.getElementById("min_size").addEventListener("click", function () {
    currentFontSize = parseInt(currentFontSize) - 2;
    updateFontSize();
});

// 更新字体大小
function updateFontSize() {
    // 设置字体大小到按钮
    sizeButton.value = currentFontSize + "px";

    // 设置字体大小到内容区域
    var content = document.getElementById("content");
    content.style.fontSize = currentFontSize + "px";

    // 保存当前字体大小到localStorage
    localStorage.setItem("fontSize", currentFontSize);

    console.log('当前字体大小:', currentFontSize);
}

// 初始更新一次字体大小
updateFontSize();

// 获取当前文字高度
var contentDiv = document.getElementById("content");
var heightButton = document.getElementById("height");
var currentHeight = localStorage.getItem("lineHeight") || window.getComputedStyle(contentDiv).getPropertyValue("line-height");

// 设置 line-height 到按钮的 value
heightButton.value = currentHeight;

// 点击 min_height 按钮时减少文字高度
document.getElementById("min_height").addEventListener("click", function () {
    currentHeight = parseInt(currentHeight) - 2;
    updateLineHeight();
});

// 点击 max_height 按钮时增加文字高度
document.getElementById("max_height").addEventListener("click", function () {
    currentHeight = parseInt(currentHeight) + 2;
    updateLineHeight();
});

// 更新文字高度
function updateLineHeight() {
    contentDiv.style.lineHeight = currentHeight + "px";
    heightButton.value = currentHeight + "px";

    // 保存当前文字高度到localStorage
    localStorage.setItem("lineHeight", currentHeight);

    console.log('当前文字高度:', currentHeight);
}

// 初始更新一次文字高度
updateLineHeight();


// 获取当前字体设置
// 获取字体按钮元素
var fontButtons = document.querySelectorAll(".font-button");

// 遍历每个字体按钮，并为其添加点击事件监听器
fontButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        // 获取按钮上的 data-font 属性值，即字体名称
        var fontFamily = button.getAttribute("data-font");

        // 调用 setFontFamily 函数，设置相应的字体样式
        setFontFamily(fontFamily);
    });
});

function updateFontSize() {
    document.documentElement.style.setProperty('--current-font-size', currentFontSize + "px");
    sizeButton.value = currentFontSize + "px";
    localStorage.setItem("fontSize", currentFontSize);
    console.log('当前字体大小:', currentFontSize);
}

function updateLineHeight() {
    document.documentElement.style.setProperty('--current-line-height', currentHeight + "px");
    heightButton.value = currentHeight + "px";
    localStorage.setItem("lineHeight", currentHeight);
    console.log('当前文字高度:', currentHeight);
}

function setFontFamily(fontFamily) {
    document.documentElement.style.setProperty('--current-font-family', fontFamily);
    localStorage.setItem("fontFamily", fontFamily);
}

// 初始化
updateFontSize();
updateLineHeight();

// // 获取所有单选按钮元素
// var background1 = document.getElementById("flexRadioDefault1");
// var background2 = document.getElementById("flexRadioDefault2");
// var background3 = document.getElementById("flexRadioDefault3");
// var background4 = document.getElementById("flexRadioDefault4");
// var background5 = document.getElementById("flexRadioDefault5");
// var background6 = document.getElementById("flexRadioDefault6");
// var background7 = document.getElementById("flexRadioDefault7");

// // 定义一个函数用于切换背景颜色、字体颜色、#content 颜色和 .Top 颜色，并添加淡入淡出效果
// function changeColors(backgroundColor, fontColor, topColor, contentColor) {
//     var body = document.body;
//     var topElements = document.querySelectorAll('.Top');
//     var contentElement = document.getElementById('content');

//     // 添加过渡效果
//     body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
//     topElements.forEach(function(element) {
//         element.style.transition = 'background-color 0.5s ease';
//     });
//     if (contentElement) {
//         contentElement.style.transition = 'background-color 0.5s ease, color 0.5s ease';
//     }

//     // 改变颜色
//     body.style.backgroundColor = backgroundColor;
//     body.style.color = fontColor;
//     topElements.forEach(function(element) {
//         element.style.backgroundColor = topColor;
//     });
//     if (contentElement) {
//         contentElement.style.backgroundColor = contentColor;
//         contentElement.style.color = fontColor; // 让 #content 内部的元素字体颜色与 body 一致
//     }

//     // 保存颜色到 localStorage
//     localStorage.setItem('backgroundColor', backgroundColor);
//     localStorage.setItem('fontColor', fontColor);
//     localStorage.setItem('topColor', topColor);
//     localStorage.setItem('contentColor', contentColor);
// }

// // 设置默认颜色值
// var defaultBackgroundColor = '#FFFFFF'; // 默认背景颜色：白色
// var defaultFontColor = '#000000'; // 默认字体颜色：黑色
// var defaultTopColor = '#FFFFFF'; // 默认 .Top 元素颜色：浅灰色
// var defaultContentColor = '#FFFFFF'; // 默认 #content 颜色：浅灰色

// // 页面加载时从 localStorage 恢复颜色设置
// window.addEventListener('load', function() {
//     var savedBackgroundColor = localStorage.getItem('backgroundColor');
//     var savedFontColor = localStorage.getItem('fontColor');
//     var savedTopColor = localStorage.getItem('topColor');
//     var savedContentColor = localStorage.getItem('contentColor');

//     var body = document.body;
//     var topElements = document.querySelectorAll('.Top');
//     var contentElement = document.getElementById('content');

//     // 添加过渡效果
//     body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
//     topElements.forEach(function(element) {
//         element.style.transition = 'background-color 0.5s ease';
//     });
//     if (contentElement) {
//         contentElement.style.transition = 'background-color 0.5s ease, color 0.5s ease';
//     }

//     // 如果有保存的颜色设置则使用，否则使用默认值
//     body.style.backgroundColor = savedBackgroundColor || defaultBackgroundColor;
//     body.style.color = savedFontColor || defaultFontColor;
//     topElements.forEach(function(element) {
//         element.style.backgroundColor = savedTopColor || defaultTopColor;
//     });
//     if (contentElement) {
//         contentElement.style.backgroundColor = savedContentColor || defaultContentColor;
//         contentElement.style.color = savedFontColor || defaultFontColor;
//     }
// });

// // 为每个单选按钮添加点击事件监听器
// background1.addEventListener('click', function() {
//     changeColors('#F8F8F8', '#000000', '#F8F8F8', '#FFFFFF'); // 浅粉红背景，黑色字体，雾玫瑰色.Top，淡紫色#content
// });

// background2.addEventListener('click', function() {
//     changeColors('#CFD9E0', '#000000', '#CFD9E0', '#CFD7E0'); // 天蓝色背景，白色字体，钢蓝色.Top，亮钢蓝色#content
// });

// background3.addEventListener('click', function() {
//     changeColors('#E3D9BC', '#000000', '#E3D9BC', '#E3D5BC'); // 淡绿色背景，黑色字体，淡绿色.Top，蜂蜜露#content
// });

// background4.addEventListener('click', function() {
//     changeColors('#DDEBD6', '#000000', '#DDEBD6', '#DDEBD4'); // 金黄色背景，黑色字体，橙色.Top，玉米色#content
// });

// background5.addEventListener('click', function() {
//     changeColors('#F3D8D8', '#000000', '#F3D8D8', '#F3D5D8'); // 热粉色背景，白色字体，深粉红色.Top，粉红色#content
// });

// background6.addEventListener('click', function() {
//     changeColors('#242121', '#FFFFFF', '#FFFFF', '#000000'); // 蓝紫色背景，白色字体，中紫色.Top，薰衣草色#content
// });

// background7.addEventListener('click', function() {
//     changeColors('#FFFFFF', '#000000', '#FFFFFF', '#FFFFFF'); // 番茄红背景，黑色字体，橙红色.Top，鲜肉色#content
// });





// 打赏功能
// 获取书名标题
var title = document.title;

// 找到要插入的位置
var moneysNameDiv = document.getElementById('moneysName');

// 创建一个包含标题的新段落元素
var newParagraph = document.createElement('p');
newParagraph.textContent = "书名：" + title;

// 将新段落插入到指定位置
moneysNameDiv.appendChild(newParagraph);


// 获取作者信息文本
var authorInfo = document.getElementById("novel_Author").textContent;

// 找到要插入的位置
var moneysAuthorDiv = document.getElementById('moneysAuthor');

// 创建一个包含作者信息的新段落元素
var newMoneysAuthor = document.createElement('p');
newMoneysAuthor.textContent = authorInfo;

// 将新段落插入到指定位置
moneysAuthorDiv.appendChild(newMoneysAuthor);


// 限制次数
function countContent(input) {
    // 获取要显示已经输入字数文本框对象
    var content = document.getElementById('content_num');

    if (content && input) {
        // 获取输入框输入内容长度并更新到界面
        var value = input.value;
        // 将换行符不计算为单词数
        value = value.replace(/\n|\r/gi, "");
        // 更新计数
        content.innerText = value.length;
    }
}



// 分享内容地址
// 点击分享地址信息
function copyURL() {
    var url = window.location.href;
    // 获取书名标题
    var title = document.title;
    // 获取作者信息文本
    var authorInfo = document.getElementById("novel_Author").textContent;

    // 在URL中添加书名标题
    var urlWithTitle = "《甜甜的你，在这里》，" + "最大的中文免费小说网站，" + title + authorInfo + '  ' + url;

    // 创建一个临时的input元素
    var input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = urlWithTitle;
    document.body.appendChild(input);

    // 选中input元素中的文本
    input.select();
    input.setSelectionRange(0, 99999); // 为了兼容ios

    // 将选中的文本复制到剪贴板
    document.execCommand('copy');

    // 删除临时input元素
    document.body.removeChild(input);

    // 可以提供用户反馈，例如显示一个消息
    alert('当前地址已复制到剪切板');
}





// 收藏
collect.onclick = function () {
    alert("收藏成功！");
}




