import { spawn } from 'node:child_process';
import { SocksProxyAgent } from "socks-proxy-agent";
import axios from "axios"

const proxy = 'socks5h://127.0.0.1:9050';
const agent = new SocksProxyAgent(proxy);
// FIXME: Add correct path..
const tor = "/home/aaron/GITHUB/testing/resources/tor/linux/tor/tor"

const torProcess = spawn(tor, []);


torProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});
torProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
torProcess.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

export const checkTor = () => {
    axios.get('http://check.torproject.org', { httpAgent: agent, httpsAgent: agent }).then((response) => {
        if (response.data.includes('Congratulations')) {
            console.log('Successfully connected through Tor!');
        } else {
            console.log('Not connected to Tor.');
        }
    }).catch((error) => {
        console.error('Error:', error);
    });

}

export const forceQuitTor = () => {
    if (torProcess) {
        torProcess.kill("SIGTERM")
    }
    return null
}