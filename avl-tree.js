const Node = require('./avl-node'); 

const AvlTree = function(){
    this.head = null; 
}

/**************************
 * Use this idea when making things private and public
 */

// Restaurant.prototype = (function() {
//     var private_stuff = function() {
//         // Private code here
//     };

//     return {

//         constructor:Restaurant,

//         use_restroom:function() {
//             private_stuff();
//         }

//     };
// })();

AvlTree.prototype.add = function(value){
    let newNode = new Node(value); 

    let current = this.head; 
    let prev = null; 

    while(current){
        prev = current; 
        if(value > current.value){
            current = current.right; 
        }else{
            current = current.left;
        }
    }

    if(prev === null){
        this.head = newNode; 
        return; 
    }else if(value > prev.value){
        prev.right = newNode; 
        newNode.parent = prev; 
    }else{
        prev.left = newNode; 
        newNode.parent = prev; 
    }

    // adjust the heights of the previous nodes  
    this.adjustHeight(newNode); 
    
    //this.rebalance(this.head); 

};

AvlTree.prototype.adjustHeight = function(startNode){ 
    if(!startNode.parent.left || !startNode.parent.right){
        let current = startNode.parent; 
        let prev = startNode; 
        while(current){
            current.height = Math.max(current.height, prev.height + 1); 
            //console.log('Current height for', current.value, current.height); 
            this.rebalance(current); 
            prev = current; 
            current = current.parent; 
        }
    }
}; 

AvlTree.prototype.inOrderTraverse = function(){
    if(this.head === null) return; 

    let stack = []; 
    let current = this.head; 

    while(stack.length != 0 || current != null){
        if(current){
            stack.push(current); 
            current = current.left; 
        }else{
            current = stack.pop(); 
            console.log(current.value); 
            current = current.right; 
        }
    }
};

AvlTree.prototype.rotateRight = function(nodeN){
    let nodeC = nodeN.left; 
    if(this.head == nodeN){
        this.head = nodeC;
    }
    nodeC.parent = nodeN.parent; 
    nodeN.left = nodeC.right; 

    if(nodeN.parent){
        if(nodeN.parent.left == nodeN){
            nodeN.parent.left = nodeC;
        }else{
            nodeN.parent.right = nodeC;
        }
    }

    if(nodeN.left){
        nodeN.left.parent = nodeN; 
    }
    nodeC.right = nodeN;

    // reset the node heights. 
    nodeN.height = Math.max( nodeN.left ? nodeN.left.height : -1, nodeN.right ? nodeN.right.height : -1) + 1;
    nodeC.height = Math.max( nodeC.left ? nodeC.left.height : -1, nodeC.right ? nodeC.right.height : -1) + 1;
    nodeN.parent = nodeC;  

    return nodeC; 
};

const setParent = function(node){
    if(node.parent){
        if(node.parent.left == node){

        }
    }
}

AvlTree.prototype.rotateLeft = function(nodeN){
    // grab nodeC as the next root for this subtree
    let nodeC = nodeN.right; 
    if(this.head == nodeN){
        this.head = nodeC;  
    }
    nodeC.parent = nodeN.parent;
    nodeN.right = nodeC.left; 
    
    if(nodeN.parent){
        if(nodeN.parent.left == nodeN){
            nodeN.parent.left = nodeC;
        }else{
            nodeN.parent.right = nodeC;
        }
    }

    // check to make sure that nodeC.left is actually a thing
    if(nodeN.right){
        nodeN.right.parent = nodeN;
    } 
    nodeC.left = nodeN;  
    nodeN.parent = nodeC;

    //reset the node heights. 
    nodeN.height = Math.max( nodeN.left ? nodeN.left.height : -1, nodeN.right ? nodeN.right.height : -1) + 1;
    nodeC.height = Math.max( nodeC.left ? nodeC.left.height : -1, nodeC.right ? nodeC.right.height : -1) + 1;
    return nodeC; 
};

AvlTree.prototype.rotateRightLeft = function(nodeN){
    /*******
     * TODO: Adjust parent pointers 
     * after double rotations. 
     */

    let nodeC = nodeN.right; 
    nodeN.right = this.rotateRight(nodeC); 
    return this.rotateLeft(nodeN); 
};

AvlTree.prototype.rotateLeftRight = function(nodeN){
    /*******
     * TODO: Adjust parent pointers 
     */
    let nodeC = nodeN.left; 
    nodeN.left = this.rotateLeft(nodeC); 
    return this.rotateRight(nodeN); 
};

// const height = function(nodeN){
//     // negative one because the recursive call adds one, even at the head of the node 
//     if(!nodeN){
//         return -1; 
//     }

//     return Math.max(height(nodeN.left), height(nodeN.right)) + 1; 
// };

const getHeightDifference = function(nodeN){
    let left = nodeN.left ? nodeN.left.height : -1; 
    let right = nodeN.right ? nodeN.right.height : -1; 
    return left - right; 
};

AvlTree.prototype.rebalance = function(nodeN){
    let difference = getHeightDifference(nodeN); 
    // left child is off balance 
    if(difference > 1){
        // node was added in left subtree of left child
        if(getHeightDifference(nodeN.left) > 0){
            nodeN = this.rotateRight(nodeN); 
        }else{
            // node was added in right subtree of left child
            nodeN = this.rotateLeftRight(nodeN); 
        }
    }else if(difference < -1){
        // right child is off balance
        if(getHeightDifference(nodeN.right) < 0){
            // node was added in right subtree of right child 
            nodeN = this.rotateLeft(nodeN); 
        }else{
            // node was added in left subtree of right child
            nodeN = this.rotateRightLeft(nodeN); 
        }
    }
    return nodeN; 
}; 


let myTree = new AvlTree(); 

//Test 1
// passed
myTree.add(100); 
myTree.add(90); 
myTree.add(80);

//Test 2
//passed 
// myTree.add(50); 
// myTree.add(20); 
// myTree.add(80);
// myTree.add(60); 
// myTree.add(90); 
// myTree.add(70);

//Test 3
// myTree.add(869); 
// myTree.add(714); 
// myTree.add(874);
// myTree.add(233); 
// myTree.add(168); 
// myTree.add(253);
// myTree.add(981); 
// myTree.add(933);
// myTree.add(273); 
// myTree.add(368);
console.log(myTree.head); 
//myTree.rebalance(myTree.head); 
//console.log('After rotation...\n', myTree); 