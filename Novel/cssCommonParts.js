// 章节目录的当前时间
function displayCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    const dateString = `当前时间为 ${year}-${month}-${day}`;
    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateTimeString = `${dateString} ${timeString}`;
    
    // 更新时间显示
    const timeElement = document.getElementById('Time').getElementsByTagName('span')[0];
    timeElement.textContent = dateTimeString;
}

window.onload = function () {
    displayCurrentDateTime();
    setInterval(displayCurrentDateTime, 1000); // 每秒更新时间
}
