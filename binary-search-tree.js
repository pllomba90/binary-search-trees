class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new BinarySearchTree(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (val === current.val) return undefined;
      if (val < current.val) {
        if (!current.left) {
          current.left = new Node;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = new Node;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, Node = this.root) {
    if (!this.root) {
      this.root = new BinarySearchTree(val);
      return this;
    }
    if (val === Node.val) return undefined;
    if (val < Node.val) {
      if (!Node.left) {
        Node.left = new BinarySearchTree(val);
        return this;
      }
      return this.insertRecursively(val, Node.left);
    } else {
      if (!Node.right) {
        Node.right = new BinarySearchTree(val);
        return this;
      }
      return this.insertRecursively(val, Node.right);
    }
  }
  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {
    if (!node) return undefined;
    if (val === node.val) return node;
    if (val < node.val) {
      return this.findRecursively(val, node.left);
    } else {
      return this.findRecursively(val, node.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const result = [];
    function traverse(node) {
      result.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      result.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result.push(node.val);
    }
    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];
    const queue = [];
    let current = this.root;
    queue.push(current);

    while (queue.length) {
      current = queue.shift();
      result.push(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return result;
  }
  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    const removeNode = (node, val) => {
        if (!node) return null;
        
        if (val === node.val) {
            if (!node.left && !node.right) return null;
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            
            let minRight = node.right;
            while (minRight.left) {
                minRight = minRight.left;
            }
            
            node.val = minRight.val;
            node.right = removeNode(node.right, minRight.val);
        } else if (val < node.val) {
            node.left = removeNode(node.left, val);
        } else {
            node.right = removeNode(node.right, val);
        }
        return node;
    };

    this.root = removeNode(this.root, val);
    return this;
}

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const getHeight = (node) => {
        if (!node) return 0;
        const leftHeight = getHeight(node.left);
        const rightHeight = getHeight(node.right);
        
        if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }
        
        return Math.max(leftHeight, rightHeight) + 1;
    };

    return getHeight(this.root) !== -1;
}

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
        return undefined;
    }
    
    const findSecondHighestNode = (node) => {
        if (!node.right && node.left) {
            let maxNode = node.left;
            while (maxNode.right) {
                maxNode = maxNode.right;
            }
            return maxNode;
        }
        if (!node.right && !node.left) {
            return node.parent;
        }
        if (node.right) {
            return findSecondHighestNode(node.right);
        }
    };

    return findSecondHighestNode(this.root);
}

  dfsInOrderIteratively() {
    const result = [];
    const stack = [];
    let current = this.root;

    while (current || stack.length) {
      while (current) {
          stack.push(current);
          current = current.left;
      }

      current = stack.pop();
      result.push(current.val);
      current = current.right;
  }

    return result;
}

}

module.exports = BinarySearchTree;
