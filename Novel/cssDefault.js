// 导入创建Bootstrap5.3.3版本
// 创建Bootstrap CSS链接元素
var bootstrapCSS = document.createElement("link");
bootstrapCSS.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
bootstrapCSS.rel = "stylesheet";
bootstrapCSS.integrity = "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH";
bootstrapCSS.crossOrigin = "anonymous";
document.head.appendChild(bootstrapCSS);
// 创建Popper.js脚本元素
var popperJS = document.createElement("script");
popperJS.src = "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js";
popperJS.integrity = "sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r";
popperJS.crossOrigin = "anonymous";
document.head.appendChild(popperJS);
// 创建Bootstrap JS脚本元素
var bootstrapJS = document.createElement("script");
bootstrapJS.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js";
bootstrapJS.integrity = "sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy";
bootstrapJS.crossOrigin = "anonymous";
document.head.appendChild(bootstrapJS);
// 导入jquery
var jqueryJS = document.createElement("script");
jqueryJS.src = "http://code.jquery.com/jquery-latest.js";
document.head.appendChild(jqueryJS);


// 设置网页标题图片
document.addEventListener("DOMContentLoaded", function () {
    var link = document.createElement('link');
    link.rel = 'shortcut icon';
    link.href = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/image/logoLogoBlank.svg';
    document.head.appendChild(link);
});



// logo设置
// 白logo
// 获取当前所有class为logo的图片，并且进行统一的设置
var logoElements = document.getElementsByClassName("logowhite");
var imageLinks = [];
for (var i = 0; i < logoElements.length; i++) {
    var logoElement = logoElements[i];
    var imgElement = logoElement.querySelector("img");

    if (imgElement) {
        // 图片GitHub地址
        imgElement.src = "https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/image/logoLogowhite.svg";
    }
}
// 黑logo
// 获取当前所有class为logo的图片，并且进行统一的设置
var logoElements = document.getElementsByClassName("logoBlank");
var imageLinks = [];

for (var i = 0; i < logoElements.length; i++) {
    var logoElement = logoElements[i];
    var imgElement = logoElement.querySelector("img");

    if (imgElement) {
        // 图片GitHub地址
        imgElement.src = "https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/image/logoLogoBlank.svg";
    }
}

// 获取所有的a标签，并设置打开方式
document.addEventListener('DOMContentLoaded', function () {
    // 获取所有的a标签
    var elementA = document.querySelectorAll("a");

    // 遍历所有的a标签，并设置打开方式
    for (var i = 0; i < elementA.length; i++) {
        elementA[i].target = "_blank";
    }
});

// 点击回到顶部
document.addEventListener("DOMContentLoaded", function () {
    // 创建回到顶部按钮
    var btnTop = document.createElement('div');
    btnTop.className = 'btnTop';
    btnTop.innerText = '回到顶部';
    document.body.appendChild(btnTop);

    // 创建回到底部按钮
    var btnBottom = document.createElement('div');
    btnBottom.className = 'btnBottom';
    btnBottom.innerText = '回到底部';
    document.body.appendChild(btnBottom);

    // 为回到顶部按钮添加点击事件
    btnTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 为回到底部按钮添加点击事件
    btnBottom.addEventListener('click', function () {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });

    var progressDiv = document.createElement('div');
    progressDiv.className = 'progress';


    // 将按钮插入到body的最顶部
    document.body.insertBefore(btnTop, btnBottom, document.body.firstChild);
    document.body.insertBefore(progressDiv, document.body.firstChild);
    // 设置样式
    var style = document.createElement('style');
    style.innerHTML = `
.btnTop,.btnBottom {
    width: 110px;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 5px;
    border: 1px solid white;
    height: 50px;
    line-height: 50px;
    position: fixed;
    right: 20px;
    bottom: 80px;
    z-index: 1;
    display: none;
}
.btnBottom{
    bottom: 20px;
}
.btnTop:hover {
    color: red;
}
.btnBottom:hover {
    color: red;
}
.progress {
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    height: 5px !important;
    background-color: #23A8F2 !important;
    transform-origin: 0 50%;
    z-index: 9999;
}

@keyframes grow-progress {
    from {
        transform: scaleX(0);
    }
    to {
        transform: scaleX(1);
    }
}

.progress {
    animation: grow-progress 3s linear;
}

.progress {
    animation-timeline: scroll();
}
  /* 自定义滚动条 */
  /*定义整个滚动条高宽及背景：高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 10px;
    background-color: #F5F5F5;
}

/*定义滚动条轨道：内阴影+圆角*/
::-webkit-scrollbar-track {
    background-color: #F5F5F5;
}

/*定义滑块：内阴影+圆角*/
::-webkit-scrollbar-thumb {
    background-color: #555;
}

/*定义滑块：内阴影+圆角*/
::-webkit-scrollbar-thumb:hover {
    background-color: red;
}

// * {
//     -moz-user-select: none;
//     /* Firefox私有属性 */
//     -webkit-user-select: none;
//     /* WebKit内核私有属性 */
//     -ms-user-select: none;
//     /* IE私有属性(IE10及以后) */
//     -khtml-user-select: none;
//     /* KHTML内核私有属性 */
//     -o-user-select: none;
//     /* Opera私有属性 */
//     user-select: none;
//     /* CSS3属性 */
// }

body {
    font-family: "宋体", sans-serif !important;
}

a {
    text-decoration: none !important;
    color: black !important; 
}

    `;
    document.head.appendChild(style);

    // 监听滚动事件
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) { // 滚动超过100px时显示按钮
            btnTop.style.display = 'block';
            btnBottom.style.display = 'block';

        } else {
            btnTop.style.display = 'none';
            btnBottom.style.display = 'none';

        }
    });
});

window.onload = function () {
    // 设置 AuthorImg 元素
    var authorImages = document.querySelectorAll('.AuthorImg');
    authorImages.forEach(function (img) {
        img.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgAuthor.svg';
        img.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    });

    // 设置 TagImg 元素
    var tagImgs = document.querySelectorAll('#TagImg');
    tagImgs.forEach(function (tagImg) {
        tagImg.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgTag.svg';
        tagImg.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    });

    // 设置 heartImage 元素
    var heartImage = document.getElementById('heartImage');
    if (heartImage) {
        heartImage.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgheart.svg';
        heartImage.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    }

    // 设置 EyeImg 元素
    var EyeImg = document.getElementById('EyeImg');
    if (EyeImg) {
        EyeImg.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgEye.svg';
        EyeImg.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    }

    // 设置 EyeImg 元素
    var eyeImgs = document.getElementsByClassName('EyeImg');
    Array.from(eyeImgs).forEach(eyeImg => {
        eyeImg.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgEye.svg';
        eyeImg.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    });

    // 设置 AgeImg 元素
    var AgeImg = document.getElementById('AgeImg');
    if (AgeImg) {
        AgeImg.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgAge.svg';
        AgeImg.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    }

    // 设置 imageDetailsUp 元素
    var imageDetailsUp = document.getElementById('imageDetailsUp');
    if (imageDetailsUp) {
        imageDetailsUp.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Picture/imageDetails.svg';
        imageDetailsUp.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    }

    // 设置 imageamplify 元素
    var imageamplify = document.getElementById('imageamplify');
    if (imageamplify) {
        imageamplify.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Picture/imageEnlarge.svg';
        imageamplify.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    }

    // 设置 imagereduce 元素
    var imagereduce = document.getElementById('imagereduce');
    if (imagereduce) {
        imagereduce.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Picture/imageSmall.svg';
        imagereduce.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    }

    // 设置 imageleftRotate 元素
    var imageleftRotate = document.getElementById('imageleftRotate');
    if (imageleftRotate) {
        imageleftRotate.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Picture/imageleftRotate.svg';
        imageleftRotate.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    }

    // 设置 imagerightRotate 元素
    var imagerightRotate = document.getElementById('imagerightRotate');
    if (imagerightRotate) {
        imagerightRotate.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Picture/imagerightRotate.svg';
        imagerightRotate.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    }

    // 设置 autoplayimage 元素
    var autoplayimage = document.getElementById('autoplayimage');
    if (autoplayimage) {
        autoplayimage.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Picture/imagePlay.svg';
        autoplayimage.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    }

    // 设置 imageDownloadUp 元素
    var imageDownloadUp = document.getElementById('imageDownloadUp');
    if (imageDownloadUp) {
        imageDownloadUp.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Picture/imageDownload.svg';
        imageDownloadUp.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    }

    // 设置 imaglabel 元素
    var imaglabel = document.querySelectorAll('.imaglabel');
    imaglabel.forEach(function (img) {
        img.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Picture/imagelabel.svg';
        img.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    });

    // 设置 imgCloseButton 元素
    var imgCloseButton = document.getElementById('imgCloseButton');
    if (imgCloseButton) {
        imgCloseButton.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Picture/imagecloseWindow.svg';
        imgCloseButton.onerror = function () {
            this.src = '#'; // 替换为实际备用图片 URL
        };
    }

};


// 动态小说阅读界面avg图标
// 目录
// 设置图片的 src 属性
var menuImage = document.getElementById('menuImage');
menuImage.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgmenu.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
menuImage.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};

// 设置
// 设置图片的 src 属性
var settingImage = document.getElementById('settingImage');
settingImage.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgsettings.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
settingImage.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};

// 收藏
// 设置图片的 src 属性
var heartImage = document.getElementById('heartImage');
heartImage.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgheart.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
heartImage.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};

// 打赏
// 设置图片的 src 属性
var collectImage = document.getElementById('collectImage');
collectImage.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgmoney.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
collectImage.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};

// 分享
// 设置图片的 src 属性
var shareImage = document.getElementById('shareImage');
shareImage.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgshare.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
shareImage.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};

// 书架
// 设置图片的 src 属性
var bookshelfImage = document.getElementById('bookshelfImage');
bookshelfImage.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgbookmark.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
bookshelfImage.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};

// 上一章
// 设置图片的 src 属性
var switchTopSvg = document.getElementById('switchTopSvg');
switchTopSvg.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgtop.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
switchTopSvg.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};

// 主页
// 设置图片的 src 属性
var homeSvg = document.getElementById('homeSvg');
homeSvg.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svghome.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
homeSvg.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};

// 下一章
// 设置图片的 src 属性
var switchBottomSvg = document.getElementById('switchBottomSvg');
switchBottomSvg.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgbottomChapters.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
switchBottomSvg.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};
// 自动播放
// 设置图片的 src 属性
var automaticSvg = document.getElementById('automaticSvg');
automaticSvg.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgautomatic.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
automaticSvg.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};

// 打赏
// 获取所有 .rewardImg 元素
var rewardImgs = document.querySelectorAll('.rewardImg');

// 遍历所有 .rewardImg 元素，并设置 src 和 onerror
rewardImgs.forEach(function (img) {
    img.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svggift.svg';
    img.onerror = function () {
        this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
    };
});

// 评论
// 获取所有 .commentImg 元素
var commentImgs = document.querySelectorAll('.commentImg');

// 遍历所有 .commentImg 元素，并设置 src 和 onerror
commentImgs.forEach(function (img) {
    img.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/image/svgmessageSquare.svg';
    img.onerror = function () {
        this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
    };
});

// 打赏
// 棒棒糖
// 设置图片的 src 属性
var lollipop = document.getElementById('lollipop');
lollipop.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/imagelollipopl.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
lollipop.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};

// 纸巾
// 设置图片的 src 属性
var tissue = document.getElementById('tissue');
tissue.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/imagetissue.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
tissue.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};

// 面包
// 设置图片的 src 属性
var bread = document.getElementById('bread');
bread.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/imagebread.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
bread.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};

// 扑克牌
// 设置图片的 src 属性
var Poker = document.getElementById('Poker');
Poker.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/imagePoker.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
Poker.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};


// 月亮
// 设置图片的 src 属性
var moon = document.getElementById('moon');
moon.src = 'https://cdn.jsdelivr.net/gh/WealthAndDear/imageWeb@main/Novel/imagemoon.svg';

// 设置 onerror 事件处理程序，当图片加载失败时加载备用图片
moon.onerror = function () {
    this.src = '备用图片的链接'; // 将 '备用图片的链接' 替换为实际的备用图片 URL
};