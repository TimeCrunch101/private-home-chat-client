const axios = require('axios');


const { SocksProxyAgent } = require('socks-proxy-agent');


// sudo apt install tor
// This will install the tor service on a linux machine, sudo systemctl start tor. It runs on
// 9050 by default

// Tor SOCKS5 proxy address
const proxy = 'socks5h://127.0.0.1:9050';

// Create a SOCKS proxy agent
const agent = new SocksProxyAgent(proxy);

// Example: Send a GET request through Tor
axios
  .get('http://check.torproject.org', { httpAgent: agent, httpsAgent: agent })
  .then((response) => {
    if (response.data.includes('Congratulations')) {
        console.log(response.data)
      console.log('Successfully connected through Tor!');
    } else {
      console.log('Not connected to Tor.');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
