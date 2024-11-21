$(function () {
    // Khai báo các object
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var scoreDisplay = $('#score'); // Hiển thị điểm
    var levelDisplay = $('#level'); // Hiển thị level
    var restartButton = $('#restart_btn');
    var playButton = $('#play_btn');
    
    // Các biến cho game
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 10; // tốc độ mặc định của các ống
    var go_up = false;
    var score = 0; // Đảm bảo điểm số bắt đầu từ 0
    var level = 1;
    var interval = 40;
    var gameActive = false;
    var gameInterval;
    var score_updated = false;

    // Hàm cập nhật điểm số và level
    function updateScoreLevel() {
        scoreDisplay.text('Điểm: ' + score); // Hiển thị điểm
        levelDisplay.text('Level: ' + level); // Hiển thị level
    }

  // Khi nhấn vào Chơi game
    $('#play_btn').click(function() {
         playGame(); // Chạy hàm bắt đầu chơi game
         $(this).hide(); // Ẩn nút chơi game
    });

    // Khi nhả chuột ra trong khung game
    $('#container').mouseup(function (e) {    
        clearInterval(go_up); // Xoá realtime hành động bay lên cho chú chim
        go_up = false;
    });

    // Khi nhấp chuột vào trong khung game
    $('#container').mousedown(function (e) {
        go_up = setInterval(up, 40); // Realtime hành động bay lên cho chú chim
    });

    // Thêm sự kiện keydown cho phím mũi tên xuống (ArrowDown)
    $(document).keydown(function(e) {
        if (e.key === "ArrowDown") {  // Kiểm tra nếu phím là "ArrowDown"
            go_down(); // Gọi hàm cho chim rơi xuống
        }
    });


    // Hàm di chuyển chú chim rơi xuống
    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 10);
        bird.css('transform', 'rotate(50deg)'); // Nghiêng chú chim khi rơi xuống
    }

    // Hàm di chuyển chú chim bay lên
    function up() {
        bird.css('top', parseInt(bird.css('top')) - 20);
        bird.css('transform', 'rotate(-10deg)'); // Nghiêng chú chim khi bay lên
    }

    // Khi nhả chuột ra trong khung game
    $('#container').mouseup(function () {    
        clearInterval(go_up); // Xoá hành động bay lên
        go_up = false;
    });

    // Khi nhấp chuột vào trong khung game
    $('#container').mousedown(function () {
        go_up = setInterval(up, 40); // Realtime hành động bay lên cho chú chim
    });

    // Hàm thua game
    function stop_the_game() {
        clearInterval(gameInterval); // Dừng game
        gameActive = false;
        restartButton.slideDown(); // Hiện nút chơi lại
    }

    // Khi click vào nút Chơi lại
    restartButton.click(function () {
        location.reload(); // Tải lại trang
    });

    // Hàm va chạm giữa 2 object
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

});
