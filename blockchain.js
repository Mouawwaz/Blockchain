const sha256 = require('js-sha256')

function blockhain() {
    this.chain = [];
    this.pendingTransactions = [];
    this.createNewBlock(100,'0 ', '0');  
}

blockhain.prototype.createNewBlock = function (nonce, hash,prevBlockHash) {
    const newBlock = {
        index : this.chain.length +1,
        transactions:this.pendingTransactions,
        timestamp : Date.now(),
        nonce: nonce,
        hash: hash,
        prevBlockHash : prevBlockHash
    };
    this.chain.push(this.createNewBlock);
    this.pendingTransactions = [];
    return newBlock;
}
blockhain.prototype.getLastBlock = function () {
    return this.chain[this.chain.length -1];
}


blockhain.prototype.createNewTransactions = function (amount,sender,recipient) {
    const newTransaction = {
        amount:amount,
        sender:sender,
        recipient:recipient,
    };
    this.pendingTransactions.push(this.createNewTransactions);
    return this.getLastBlock()['index'] +1;
}
blockhain.prototype.hashBlock = function (nonce,currentBlockData, prevBlockHash) {
    const dataAsString = prevBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
}

blockhain.prototype.proofOfWork = function (prevBlockHash,currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(nonce,currentBlockData,prevBlockHash);
    while (hash.substring(0,4) !=='0000') {
        nonce++,
        hash = this.hashBlock(nonce,currentBlockData,prevBlockHash);
        console.log(hash);
    }
    return nonce;
}
