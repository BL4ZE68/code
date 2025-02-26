document.querySelectorAll('cyber-nav a').for
Each(link=>{
    link.addEventListener('mousemove', (e) =>{
        link.style.textShadow = `${e.offsetX - 10}px ${e.offsetY - 5}px 10px ${getRandomNeonColor()},
        ${e.offsetX - 10}px ${e.offsetY - 5}px 10px ${getRandomNeonColor()}`;
        
        link.addEventListener('mouseleave', ()=>{
            link.style.textShadow = none
        });

    });
});
function getRandomNeonColor(){
    const color = ['#ff003c', '#00f3ff', '#9400ff']
    return colors[Math.floor(Math.random() * colors.length)];
};