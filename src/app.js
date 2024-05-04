const PLAYERS = [
    "Spiderman",
    "Captain America",
    "Wonderwoman",
    "Popcorn",
    "Gemwoman",
    "Bolt",
    "Antwoman",
    "Mask",
    "Tiger",
    "Captain",
    "Catwoman",
    "Fish",
    "Hulk",
    "Ninja",
    "Black Cat",
    "Volverine",
    "Thor",
    "Slayer",
    "Vader",
    "Slingo"
];

// initialize players with image and strength
const initPlayers = (players) => {
    let detailedPlayers = [];
    for (let i = 0; i < players.length; i++) {
        let player = {
            name: PLAYERS[i],
            strength: getRandomStrength(),
            image: "images/super-" + (i + 1) + ".png",
        };
        if (i % 2 === 0) {
            player.type = "hero";
        } else {
            player.type = "villain";
        }
        detailedPlayers.push(player);
    }

    return detailedPlayers;
};

// getting random strength
const getRandomStrength = () => {
    let randomint = Math.ceil(Math.random() * 100);
    return randomint;
};

const buildPlayers = (players, type) => {
    let fragment = '';

    for (let i = 0; i < players.length; i++) {
        if (type === "hero" && players[i].type === "hero") {
            fragment += `<div class="player">
            <img src="${players[i].image}">
            <div class="name">${players[i].name}</div>
            <div class="strength">${players[i].strength}</div>
            </div>`;
        }

        if (type === "villain" && players[i].type === "villain") {
            fragment += `<div class="player">
            <img src="${players[i].image}">
            <div class="name">${players[i].name}</div>
            <div class="strength">${players[i].strength}</div>
            </div>`;
        }
    }

    return fragment;
};

const viewPlayers = (players) => {
    document.getElementById('heroes').innerHTML = buildPlayers(players, 'hero');
    document.getElementById('villains').innerHTML = buildPlayers(players, 'villain');
};

const isFight = (players) => {
    let heroExists = false;
    let villainExists = false;

    for (let i = 0; i < players.length; i++) {
        if (players[i].type === "hero" && players[i].strength > 0) {
            heroExists = true;
        } else if (players[i].type === "villain" && players[i].strength > 0) {
            villainExists = true;
        }
    }

    if (heroExists && villainExists) {
        return 'clash';
    } else {
        return 'peace';
    }
};

const calculateScore = (players) => {
    const totalScore = players.reduce((acc, player) => {
        return acc + player.strength;
    }, 0);

    return totalScore;
};

const checkWin = (players) => {
    const heroTotalStrength = totalStrength(players, 'hero');
    const villainTotalStrength = totalStrength(players, 'villain');

    if (heroTotalStrength > villainTotalStrength) {
        return 'hero';
    } else if (villainTotalStrength > heroTotalStrength) {
        return 'villain';
    } else {
        return 'endure';
    }
};

const totalStrength = (players, type) => {
    const filteredPlayers = players.filter(player => player.type === type);
    const total = filteredPlayers.reduce((acc, player) => {
        return acc + player.strength;
    }, 0);

    return total;
};

window.onload = () => {
    const players = initPlayers(PLAYERS);
    viewPlayers(players);
    const fightStatus = isFight(players);
    console.log("Fight Status:", fightStatus);
    const heroesScore = calculateScore(players.filter(player => player.type === 'hero'));
    const villainsScore = calculateScore(players.filter(player => player.type === 'villain'));
    console.log("Heroes Score:", heroesScore);
    console.log("Villains Score:", villainsScore);
    const winner = checkWin(players);
    console.log("Winner:", winner);
};
