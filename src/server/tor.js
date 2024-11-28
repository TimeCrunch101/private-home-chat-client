import axios from "axios";
import { SocksProxyAgent } from "socks-proxy-agent";
import { execFile } from "node:child_process";
 
const proxy = 'socks5h://127.0.0.1:9050';
const agent = new SocksProxyAgent(proxy);

const torBinary = "/home/aaron/GITHUB/private-home-chat-client/resources/tor/linux/tor/tor";

const checkTor = () => {
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

// const torProcess = execFile(torBinary, (error, stdout, stderr) => {
//     if (error) {
//       console.error('Failed to start Tor:', error);
//       return;
//     }
//     console.log('Tor started successfully');
//     console.log(stdout);
//     console.error(stderr);
//   }
// );

const torProcess = execFile(torBinary)

// Handle process exit
// torProcess.on('exit', (code) => {
//   console.log(`Tor process exited with code ${code}`);
// });

// Function to force quit the Tor process
export const forceQuitTor = () => {
  return new Promise((resolve, reject) => {
    if (torProcess) {
      console.log('Force quitting the Tor process...');
      torProcess.kill('SIGKILL');
      resolve(true)
    }
    resolve(null)    
  })
}


// setTimeout(() => {
//   checkTor()
// }, 3000);