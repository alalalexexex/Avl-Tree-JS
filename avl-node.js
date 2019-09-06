const Node = function(value){
    this.value = value; 
    this.left = undefined; 
    this.right = undefined; 
    this.parent = null; 
    this.height = 0; 
}; 

module.exports = Node; 
