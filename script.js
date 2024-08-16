document.addEventListener('DOMContentLoaded', () => {
    const tunnels = document.querySelectorAll('.green-tunnel');
    const totalPoints = document.querySelector('.total-points');
    let currentPoints = 0;
    let maxToads = 1; 
    let maxPlants = 1; 

    function resetGame() {
        currentPoints = 0;
        totalPoints.textContent = 'Points: 0';
        maxToads = 1;
        maxPlants = 1;
        spawnToadsAndPlants();
    }

    function getRandomPosition(tunnel) {
        const tunnelRect = tunnel.getBoundingClientRect();
        const tunnelHeight = tunnel.querySelector('img').height;

        const x = Math.random() * (tunnelRect.width - 50); 
        const y = Math.random() * (tunnelRect.height - tunnelHeight - 50); 
        return { x, y };
    }

    function spawnToadsAndPlants() {
        clearTunnels(); 

        for (let i = 0; i < maxToads; i++) {
            spawnToad();
        }

        for (let i = 0; i < maxPlants; i++) {
            spawnPlant();
        }
    }

    function clearTunnels() {
        tunnels.forEach(tunnel => {
            tunnel.querySelector('.toad').style.display = 'none';
            tunnel.querySelector('.plant').style.display = 'none';
            tunnel.querySelector('.toad').style.pointerEvents = 'auto';
            tunnel.querySelector('.plant').style.pointerEvents = 'auto';
        });
    }

    function spawnToad() {
        const randomTunnel = tunnels[Math.floor(Math.random() * tunnels.length)];
        const toad = randomTunnel.querySelector('.toad');
        const toadPos = getRandomPosition(randomTunnel);

        toad.style.top = `${toadPos.y}px`;
        toad.style.left = `${toadPos.x}px`;
        toad.style.display = 'block';

        setTimeout(() => {
            if (toad.style.display === 'block') {
                toad.style.display = 'none';
                spawnToadsAndPlants();
            }
        }, 2000); 

        toad.addEventListener('click', () => {
            if (toad.style.display === 'block') {
                currentPoints += 10;
                totalPoints.textContent = `Points: ${currentPoints}`;
                toad.style.display = 'none';
                spawnToadsAndPlants();

                
                if (currentPoints % 30 === 0) { 
                    maxToads++;
                    maxPlants++;
                }
            }
        });
    }

    function spawnPlant() {
        const randomTunnel = tunnels[Math.floor(Math.random() * tunnels.length)];
        const plant = randomTunnel.querySelector('.plant');
        const plantPos = getRandomPosition(randomTunnel);

        plant.style.top = `${plantPos.y}px`;
        plant.style.left = `${plantPos.x}px`;
        plant.style.display = 'block';

        plant.addEventListener('click', () => {
            if (plant.style.display === 'block') {
                alert(`Game Over! Your final score is ${currentPoints} points.`);
                const playAgain = confirm('Do you want to play again?');
                if (playAgain) {
                    resetGame();
                } else {
                    clearTunnels();
                }
            }
        });
    }

    resetGame();
});
