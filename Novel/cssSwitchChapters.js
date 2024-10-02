// 获取当前页面的路径
var path = window.location.pathname;
// 使用正则表达式提取路径中的所有数字
var matches = path.match(/\d+/g);
// 如果匹配到数字，则获取最后一个匹配项，否则使用默认值1
var currentChapterNumber = matches ? parseInt(matches[matches.length - 1]) : 1;
// 上一章按钮
var switchTopHref = document.querySelector("#switchTop>a")
// 第一章
if (currentChapterNumber == 1) {
    switchTopHref.href = `./Chapter${currentChapterNumber}.html`;
}
// 点击切换上一章
// 监听点击事件
switchTopHref.addEventListener('click', function (event) {
    event.preventDefault(); // 阻止默认行为，即阻止链接的默认跳转行为

    // 构建要请求的页面的URL
    const nextPageUrltop = `./Chapter${currentChapterNumber - 1}.html`;

    // 发起异步请求
    fetch(nextPageUrltop)
        .then(response => {
            // 检查响应的状态码
            if (response.ok) {
                // 如果页面存在，进行页面跳转
                window.location.href = nextPageUrltop;
            } else {
                // 错误处理
            }
        })
        .catch(error => {
            console.error('发生错误:', error);
        });
});
// 获取要点击的元素
var switchBottomHref = document.querySelector("#switchBottom > a");

// 监听点击事件
switchBottomHref.addEventListener('click', function (event) {
    event.preventDefault(); // 阻止默认行为，即阻止链接的默认跳转行为

    // 构建要请求的页面的URL
    const nextPageUrl = `./Chapter${currentChapterNumber + 1}.html`;

    // 发起异步请求
    fetch(nextPageUrl)
        .then(response => {
            // 检查响应的状态码
            if (response.ok) {
                // 如果页面存在，进行页面跳转
                window.location.href = nextPageUrl;
            } else {
                alert("已经是最后一章了！！！")
            }
        })
        .catch(error => {
            console.error('发生错误:', error);
        });
});

