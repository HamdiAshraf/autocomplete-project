// trie.js
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let currentNode = this.root;

        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
            }
            currentNode = currentNode.children[char];
        }

        currentNode.isEndOfWord = true;
    }

    search(prefix) {
        let currentNode = this.root;

        for (let i = 0; i < prefix.length; i++) {
            const char = prefix[i];
            if (!currentNode.children[char]) {
                return [];
            }
            currentNode = currentNode.children[char];
        }

        return this.getAllWordsFromNode(currentNode, prefix);
    }

    getAllWordsFromNode(node, prefix) {
        const words = [];
        if (node.isEndOfWord) {
            words.push(prefix);
        }

        for (const char in node.children) {
            const childNode = node.children[char];
            words.push(...this.getAllWordsFromNode(childNode, prefix + char));
        }

        return words;
    }
}

module.exports = Trie;
