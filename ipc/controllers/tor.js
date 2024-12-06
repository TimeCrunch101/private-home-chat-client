import { spawn } from 'node:child_process';
import { SocksProxyAgent } from "socks-proxy-agent";
import axios from "axios"
import { sendMessageToRenderer } from "../utils/hoistMessage.js"

const proxy = 'socks5h://127.0.0.1:9050';
const agent = new SocksProxyAgent(proxy);
// FIXME: Add correct path..
const tor = "C:\\Users\\aallen\\GITHUB\\private-home-chat-client\\resources\\tor\\windows\\tor\\tor.exe"

let torProcess = null;

export const startupTor = (cb) => {
    torProcess = spawn(tor, []);
    torProcess.stdout.on('data', (data) => {
        sendMessageToRenderer("message", data.toString())
        if (data.toString().includes("Bootstrapped 100% (done): Done")) {
            return cb(true)
        }
    });
    torProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        return cb(false)
    });
    torProcess.on('close', (code) => {
        console.log(`Tor process exited with code ${code}`);
    });
}


export const checkTor = () => {
    sendMessageToRenderer("message", "Checking connection to tor...")
    axios.get('http://check.torproject.org', { httpAgent: agent, httpsAgent: agent }).then((response) => {
        if (response.data.includes('Congratulations')) {
            console.log('Successfully connected through Tor!');
            sendMessageToRenderer("message", "CONNECTED!")
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