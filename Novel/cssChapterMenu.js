// 动态读取章节目录
// 使用 Fetch API 读取 menu.txt 文件内容
fetch('../textFile/Menu.txt')
.then(response => response.text())
.then(data => {
    const chapters = data.split('\n').filter(line => line.trim() !== '').map(line => {
        const [id, title, url, text] = line.split('|');
        return { id, title, url, text };
    });

    // 获取父元素
    const menuChapter = document.getElementById('menu_chapter');

    // 动态插入章节
    chapters.forEach(chapter => {
        // 创建章节 div
        const chapterDiv = document.createElement('div');
        chapterDiv.id = chapter.id;
        chapterDiv.title = chapter.title;

        // 创建链接 a
        const chapterLink = document.createElement('a');
        chapterLink.href = chapter.url;

        // 创建段落 p
        const chapterParagraph = document.createElement('p');
        chapterParagraph.textContent = chapter.text;

        // 组装元素
        chapterLink.appendChild(chapterParagraph);
        chapterDiv.appendChild(chapterLink);
        menuChapter.appendChild(chapterDiv);
    });
})
.catch(error => console.error('Error fetching the menu.txt file:', error));

