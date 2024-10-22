<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="manifest" href="favicon/site.webmanifest">
    <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

    <title>LOL2D</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/loading-scene.css">
    <link rel="stylesheet" href="styles/menu-scene.css">
    <link rel="stylesheet" href="styles/game-scene.css">
    <link rel="stylesheet" href="styles/hud.css">

    <!-- global libraries -->
    <!-- <script src="https://quinton-ashley.github.io/q5.js/q5.js"></script> -->
    <script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.min.js"></script>
    <script src="https://mrdoob.github.io/stats.js/build/stats.min.js"></script>
    <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
    <!-- <script src="https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js"></script> -->
</head>

<body>
    <script src="src/app.js" type="module"></script>

    <div class="center-page-container">
        <div id="game-scene">
            <div id="InGameHUD"></div>
            <div id="stats"></div>
        </div>

        <div id="loading-scene">
            <img class="logo" src="./assets/images/others/logo.svg" alt="">
            <div class="progress">
                <div class="progress-bar">
                </div>
            </div>
            <div class="loading-text"></div>
            <h2 class="error-text"></h2>
        </div>

        <div id="menu-scene">
            <div class="background"></div>
            <div class="logo">
                <div class="shiny">
                    <img src="./assets/images/others/newlogo-vi.png" alt="logo" class="logo">
                </div>
                <p class="p2d slide-bck-center">2D</p>
            </div>

            <button id="play-btn" class="hextech-btn">Chơi</button>

            <button id="fullscreen-btn">
                <i class="fas fa-expand"></i>
            </button>
        </div>
    </div>
</body>

</html>