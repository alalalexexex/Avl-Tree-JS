const canvas = document.querySelector('canvas'); 
const myTree = new AvlTree(); 
const c = canvas.getContext('2d'); 
// get the animation frame for the right browser. 
const requestAnimationFrame = window.requestAnimationFrame || 
window.mozRequestAnimationFrame || 
window.webkitRequestAnimationFrame || 
window.msRequestAnimationFrame;

// change the canvas dimensions
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 

//get button and insert boxes. 
const insert = document.getElementById('in-button'); 
const inBox = document.getElementById('in-box');

insert.addEventListener('click', (e) => {
    if(isNaN(Number(inBox.value))){
        alert('Please enter a number.'); 
    }else{
        addToTree(Number(inBox.value));
    }
    addToTree(Number(inBox.value));      
}); 

inBox.addEventListener('keyup', (e) => {
    if(e.key === "Enter"){ 
        if(isNaN(Number(inBox.value))){
            alert('Please enter a number.'); 
        }else{
            addToTree(Number(inBox.value));
        }
    }
}); 

const drawNode = (newNode) => {
    c.beginPath(); 
    c.textAlign = 'center'; 
    c.textBaseline = 'middle'; 
        c.arc(newNode.x, newNode.y, 20, 0, Math.PI * 2, false); 
        c.lineWidth = 1; 
        c.strokeStyle = "#6c7596"; // circle outline color
        c.fillStyle = "#e5e5e5"; // circle background color 
        c.fill(); 

        c.font = '11px Arial'; 
        c.fillStyle = "black"; // the font color 
        c.fillText(newNode.value, newNode.x, newNode.y); 
        c.stroke();   
        inBox.value = ""; 
    c.closePath(); 
    
}; 

const clearNode = (node) => {
    c.globalCompositeOperation = 'destination-out'; 
    c.beginPath(); 
    c.arc(node.x, node.y, 21, 0, Math.PI * 2 , false); 
    c.fill(); 
    c.closePath(); 
    c.globalCompositeOperation = 'source-over'; 
}; 

const rotateRightDraw = (nodeN, nodeC) => {
    //first need to clear the positions of each node 
}; 

const addToTree = (value) => {
    let newNode = myTree.add(value); 
    drawNode(newNode); 
    console.log(myTree); 
}; 

// const fillCoordinates = (value) => {
//     let current = Number(value) > 0 ? Number(value) : Number(value) * -1;                                   
//     current = Math.floor(current/10); 
//     let x = 6; 
//     while(current > 0){
//         x += 6; 
//         current = Math.floor(current/10); 
//     }
//     return x; 
// }; 


// this is where we draw a line 
// c.beginPath(); 
// c.moveTo(50, 300); 
// c.lineTo(300, 100); 
// c.lineTo(1000, 1000); 
// c.strokeStyle = '#457899'; 
// c.stroke(); 

// create an arc