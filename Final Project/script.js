function getCurrentURL()
{
    let protocol = window.location.protocol; // http or https
    let hostname = window.location.hostname; // www.example.com
    let port = window.location.port;
    return currentURL = protocol + '//' + hostname + (port ? ':' + port : '') // full URL
}

function resolveRelative(relativeURL, wantedURL = getCurrentURL())
{
    return wantedURL + relativeURL
}

let displayFav = false
const Games = [
    {
        author: 'Adam Al-Attar',
        name: 'Tic Tac Toe',
        description: 'A board game that consists of a 9x9 grid, played by 2 players, X and O, whoever marks on a straight line Wins!',
        info: 'Tic Tac Toe is a board game played on a 3x3 grid by two players, usually referred to as X and O. The players take turns marking a single cell within the grid with their respective symbols. The objective is to create a straight line of three matching symbols (either horizontally, vertically, or diagonally). The first player to achieve this goal wins the game, and if the entire grid is filled without a winner, the game results in a draw.',
        id: 'tic-tac-toe',
        link: resolveRelative('/Final%20Project/tic-tac-toe/index.html'),
        fav: 0
    },
    {
        author: 'Onrizon',
        name: 'Gartic Phone',
        description: 'An entertaining online game combining drawing and sentence interpretation with a hilarious twist. Play with up to 30 friends in one room and experience 11 unique game modes!',
        info: `Gartic Phone is an engaging online game designed for a group of friends looking for a good time. With the capacity to host up to 30 players in a single room, this game infuses the classic Telephone game with creative drawing and witty sentence interpretation. As you progress through the rounds, you'll take turns drawing and guessing, leading to amusing and unexpected results. Choose from a variety of 11 game modes, each offering a distinct challenge and endless laughter.`,
        id: 'gartic-phone',
        link: 'https://garticphone.com/',
        fav: 0
    },
    {
        author: 'ticedev',
        name: 'Skribbl.io',
        description: 'A drawing & guessing browser game. Create a private room, share the link with up to 7 friends, and compete in timed rounds. Draw or guess words for points. Most points at the end wins!',
        info: `Skribbl is a side-splitting browser game that seamlessly blends the joy of drawing and guessing. In each round, players take turns illustrating a word while the others attempt to decipher the "unique" artworks. Its user-friendly nature allows you to effortlessly set up a private room and share the link with up to 7 pals. As the laughter-filled rounds unfold, strive to accumulate points, and revel in the satisfaction of watching your avatar claim victory. Skribbl's whimsical gameplay guarantees an entertaining experience for all ages!`,
        id: 'skribbl-io',
        link: 'https://skribbl.io/',
        fav: 0
    },
    {
        author: 'Sidney de Vries',
        name: 'Krunker.io',
        description: 'Join fast-paced pixel battles in Krunker. Engage players globally in 19 game modes, from Free for All to Team Deathmatch. Pixelated chaos for casual and competitive gamers.',
        info: `Krunker (.io) is a lightning-paced pixelated first-person shooter. Drop into pixelated arenas, battling players worldwide. Enjoy 19 game modes, including Free for All and Team Deathmatch. Simple interface for easy private matches with friends. Score by eliminating foes; reach zero health to win points. Krunker offers thrilling casual and competitive gaming experiences.`,
        id: 'krunker-io',
        link: 'https://krunker.io/',
        fav: 0
    }
];

function findFavoriteGames() {
    return Games.filter((game) => game.fav == 1);
}

function findGameById(game_id)
{
    return Games.find((game) => game.id == game_id);
}

function findGameByName(game_name)
{
    return Games.find((game) => game.name == game_name);
}

function getGameIndexById(game_id)
{
    return Games.findIndex((game) => game.id == game_id);
}

function getGameIndexByName(game_name)
{
    return Games.findIndex((game) => game.name == game_name);
}

function showElem(element_id)
{
    let element = document.getElementById(element_id)
    element.classList.remove("hide-disp")
    element.classList.add("show-disp")
    element.style.display = "flex"
}

function hideElem(element_id, callback = () => {})
{
    let element = document.getElementById(element_id)
    element.classList.remove("show-disp")
    element.classList.add("hide-disp")
    // a delay before it changes the display type to none, to sync with the fade animation
    setTimeout(() => {
        element.style.display = "none";
        callback()
    }, 0.2 * 1000);
}

function openPlayPopUp(game_id)
{
    showElem("play-popup-container")
    let game = findGameById(game_id)
    if (game == undefined || game == null)
    {
        document.getElementById(`popup-title`).innerText = "Unavaliable"
        return
    }
    console.log(game)

    // Main title content
    document.getElementById(`popup-title`).innerHTML =
    `
    ${game.name}
    <span class="popup-author">
        Made by: <span>${game.author}</span>
    </span>
    `

    // popup Description/Info
    document.getElementById(`popup-desc`).innerHTML =
    `
    Info:
    <span class="popup-desc">
        ${game.info}
    </span>
    `

    // edit the button to redirect to the proper page
    document.getElementById(`continue-button`).onclick = () => {visit(game.link)}
}

function closePlayPopUp()
{
    hideElem(`play-popup-container`)
}

function playGame(game_id)
{
    openPlayPopUp(game_id)
}

function selectFav(game_id)
{
    let favIco_off = document.getElementById(`${game_id}-fav-ico-off`) // unselected
    let favIco_on = document.getElementById(`${game_id}-fav-ico-on`) // selected

    if (Games[getGameIndexById(game_id)].fav == 0)
    {
        favIco_off.style.display = "none"
        favIco_on.style.display = "flex"
        Games[getGameIndexById(game_id)].fav = 1
    } else {
        favIco_off.style.display = "flex"
        favIco_on.style.display = "none"
        Games[getGameIndexById(game_id)].fav = 0
    }
}

function genGameCard(game)
{
    let game_id = game.id
    let fav_selected = game.fav == 1 ? 'flex' : 'none'
    let fav_unselected = game.fav != 1 ? 'flex' : 'none'
    return `
    <div class="game-card" id="${game_id}">
    <!-- Game Title -->
    <p class="game-card-title">
        ${game.name}
    </p>

    <!-- Game Description -->
    <p class="game-card-desc">
        ${game.description}
    </p>

    <!-- Play Button -->
    <button type="button" class="play-button" id="${game_id}-play-button" onclick="playGame('${game_id}')">
        <svg class="play-ico" width="2vh" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        </svg>

        Play
    </button>

    <!-- Favorite Button-->
    <button type="button" class="fav-button" id="${game_id}-fav-button" onclick="selectFav('${game_id}')">
        <!-- Off Star Icon (Selected) -->
        <svg class="fav-ico-on" id="${game_id}-fav-ico-on" style='display: ${fav_selected};' width="2vh" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
        </svg>

        <!-- On Star Icon (Unselected) -->
        <svg class="fav-ico-off" id="${game_id}-fav-ico-off" style="display: ${fav_unselected};" width="2vh" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>

        Favorite
    </button>
</div>
    `
}

function loadGames()
{
    let containerDiv = document.getElementById(`games-container`)
    containerDiv.innerHTML = ""
    
    if (displayFav) {
        findFavoriteGames().forEach((game) => {
            containerDiv.innerHTML += genGameCard(game)
        })
    }
    else {
        Games.forEach((game) => {
            containerDiv.innerHTML += genGameCard(game)
        })
    }
}

function genGameId(game_name)
{
    return game_name.replace(/\s+/g, '-').toLowerCase();
}

function submitGame(event)
{
    event.preventDefault();
    
    let newGame = {
        author: document.getElementById("inp-auth-name").value,
        name: document.getElementById("inp-game-name").value,
        description: document.getElementById("inp-game-desc").value,
        info: document.getElementById("inp-game-info").value,
        id: genGameId(document.getElementById("inp-game-name").value),
        link: document.getElementById("inp-game-link").value,
        fav: 0
    }

    Games.push(newGame)
    loadGames()

    closeSubmitPopUp()
}

function closeSubmitPopUp()
{
    hideElem(`form-popup-container`, () => document.getElementById(`form-add-game`).reset())
}

function openSubmitPopUp()
{
    showElem(`form-popup-container`)
}

function selectTab(tab_id)
{
    let tabs = ['all-games-tab', 'favorites-tab']
    let selectedTab = tab_id
    let currentTab = selectedTab == 0 ? 1 : 0
    
    document.getElementById(tabs[currentTab]).classList.remove('select-tab')
    document.getElementById(tabs[selectedTab]).classList.add('select-tab')

    displayFav = selectedTab
    loadGames()
}

function visit(url)
{
    window.open(url, '_blank')
}