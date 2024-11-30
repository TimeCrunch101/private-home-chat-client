import { spawn } from 'node:child_process';
import { SocksProxyAgent } from "socks-proxy-agent";
import axios from "axios"
import { sendMessageToRenderer } from "../../src/hoistMessage.js"

const proxy = 'socks5h://127.0.0.1:9050';
const agent = new SocksProxyAgent(proxy);
// FIXME: Add correct path..
const tor = "/home/aaron/GITHUB/private-home-chat-client/resources/tor/linux/tor/tor"

let torProcess = null;

export const startupTor = () => {
    torProcess = spawn(tor, []);
    torProcess.stdout.on('data', (data) => {
        sendMessageToRenderer("message", data.toString())
      console.log(`stdout: ${data}`);
    });
    torProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    torProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
}


export const checkTor = () => {
    sendMessageToRenderer("message", "Checking connection to tor...")
    axios.get('http://check.torproject.org', { httpAgent: agent, httpsAgent: agent }).then((response) => {
        if (response.data.includes('Congratulations')) {
            console.log('Successfully connected through Tor!');
            sendMessageToRenderer("message", "Connected to tor...")
        } else {
            console.log('Not connected to Tor.');
        }
    }).catch((error) => {
        console.error('Error:', error);
    });

}

export const forceQuitTor = () => {
    if (torProcess !== null) {
        torProcess.kill("SIGTERM")
    }
    return null
}


setTimeout(() => {
    checkTor()
}, 5000);