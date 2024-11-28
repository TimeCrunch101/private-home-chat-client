import NodeRSA from "node-rsa";
import fs from "node:fs/promises";
import keytar from "keytar";
import crypto from "crypto";
import os from "os";



export class HomeRSA {
    constructor(bitLength) {
        this.bitLength = bitLength
        this.key = null;
        this.ready = false;
        this.checkStore().then((exists) => {
            if (exists) {
                this.ready = true;
                console.info("Keys Exist..")
            } else {
                console.info("Generating new key pairs..")
                this.generateKeyPair().then((res) => {
                    console.log("New keypair created")
                }).catch((err) => {
                    throw err;
                })
            }
        })
    }
    async checkStore() {
        const privatekey = await keytar.getPassword("home-chat", "privatekey");
        const publickey = await keytar.getPassword("home-chat", "publickey");
        if (privatekey === null || publickey === null) {
            return false;
        } else {
            const key = new NodeRSA()
            key.importKey(privatekey)
            key.importKey(publickey)
            this.key = key
            return true;
        }
    }

    async generateKeyPair() {
        const key = new NodeRSA({b: this.bitLength});
        await keytar.setPassword("home-chat", "privatekey", key.exportKey("private"))
        await keytar.setPassword("home-chat", "publickey", key.exportKey("public"))
        this.key = key
        return;
    }

    exportPublicKey() {
        const pub = this.key.exportKey("public");
        return pub;
    }

    encryptOwn(data) {
        try {
            const encrypted = this.key.encrypt(data, "base64")
            return encrypted;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    decryptOwn(data) {
        try {
            const decrypted = this.key.decrypt(data, "utf8")
            return decrypted;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    encrypt(recieverPublicKey, data) {
        try {
            const encryptedData = recieverPublicKey.encrypt(data, "base64")
            return encryptedData;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    decrypt(senderData) {
        try {
            const decrypted = this.key.decrypt(senderData, "utf8")
            return decrypted
        } catch (error) {
            console.error(error)
            return null;
        }
    }

}

// await keytar.setPassword("test", "account", "securepassword")
