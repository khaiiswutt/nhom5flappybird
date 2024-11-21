function createRain() {
    const container = document.getElementById('container');

    // Tạo hạt mưa mỗi 100ms
    setInterval(() => {
        const rainDrop = document.createElement('div');
        rainDrop.classList.add('rain-drop');
        
        // Gán vị trí ngẫu nhiên cho hạt mưa
        rainDrop.style.setProperty('--start-x', `${Math.random() * 100}%`);

        // Thêm hạt mưa vào container
        container.appendChild(rainDrop);

        // Xóa hạt mưa khi rơi khỏi màn hình
        setTimeout(() => {
            rainDrop.remove();
        }, 2000); // Thời gian sống của hạt mưa
    }, 100); // Tạo hạt mưa mới mỗi 100ms
}