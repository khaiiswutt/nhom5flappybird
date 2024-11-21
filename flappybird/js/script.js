$(function () {
    // Khai báo các object
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var scoreDisplay = $('#score');
    var levelDisplay = $('#level');
    var restartButton = $('#restart_btn');
    var playButton = $('#play_btn');
    
    // Các biến cho game
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 10; // tốc độ mặc định của các ống
    var go_up = false;
    var score = 0;
    var level = 1;
    var interval = 40;
    var gameActive = false;
    var gameInterval;
    var score_updated = false;

    // Cập nhật điểm số và level
    function updateScoreLevel() {
        scoreDisplay.text('Score: ' + score);
        levelDisplay.text('Level: ' + level);
    }

    // Cập nhật level và thay đổi tốc độ interval
    function updateLevel() {
        if (score >= 50) {
            clearInterval(gameInterval);
            alert("Chiến thắng! Bạn đã đạt Level 4!");
            restartButton.show(); // Hiển thị nút chơi lại
        } else if (score >= 40) {
            level = 4;
            interval = 20;
        } else if (score >= 20) {
            level = 3;
            interval = 25;
        } else if (score >= 5) {
            level = 2;
            interval = 30;
        } else {
            level = 1;
            interval = 40;
        }
    }

    // Hàm bắt đầu game
    function playGame() {
        gameActive = true;
        score = 0;
        level = 1;
        interval = 40;
        updateScoreLevel();
        playButton.hide();
        restartButton.hide();
        gameLoop();
    }

    // Hàm vòng lặp chính của game
    function gameLoop() {
        gameInterval = setInterval(function () {
            if (collision(bird, pole_1) || collision(bird, pole_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > container_height - bird_height) {
                stopTheGame();
            } else {
                var pole_current_position = parseInt(pole.css('right'));
                if (pole_current_position > container_width - bird_left) {
                    if (!score_updated) {
                        score++;
                        score_updated = true;
                        updateLevel(); // Kiểm tra cập nhật level
                        updateScoreLevel();
                    }
                }
                
                if (pole_current_position > container_width) {
                    var new_height = parseInt(Math.random() * 100); // Tạo chiều cao ngẫu nhiên
                    pole_1.css('height', 170 + new_height);
                    pole_2.css('height', 170 - new_height);
                    score_updated = false;
                    pole_current_position = -64;
                }

                pole.css('right', pole_current_position + speed);

                if (!go_up) {
                    goDown(); // Nếu không bay lên, chim sẽ rơi xuống
                }
            }
        }, interval); // Điều chỉnh tốc độ theo từng level
    }

    // Hàm di chuyển chim xuống
    function goDown() {
        bird.css('top', parseInt(bird.css('top')) + 10);
        bird.css('transform', 'rotate(50deg)');
    }

    // Hàm di chuyển chim bay lên
    function up() {
        bird.css('top', parseInt(bird.css('top')) - 20);
        bird.css('transform', 'rotate(-10deg)');
    }

    // Hàm dừng game
    function stopTheGame() {
        clearInterval(gameInterval);
        gameActive = false;
        restartButton.show();
    }

    // Kiểm tra va chạm giữa 2 object
    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;

        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
            return false;
        } else {
            return true;
        }
    }

    // Sự kiện khi nhấp chuột vào khung game
    $('#container').mousedown(function () {
        go_up = setInterval(up, 40);
    });

    // Khi nhả chuột ra
    $('#container').mouseup(function () {
        clearInterval(go_up);
        go_up = false;
    });

    // Khi nhấn nút chơi game
    playButton.click(function () {
        playGame();
    });

    // Khi nhấn nút chơi lại
    restartButton.click(function () {
        location.reload();
    });

    // Đoạn mã kiểm tra va chạm và cập nhật level/score
    setInterval(function () {
        if (gameActive) {
            updateLevel();
        }
    }, interval);
});
