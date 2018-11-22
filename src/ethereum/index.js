import Web3 from 'web3'

export const isAddress = str =>
  Web3.utils.isAddress(str)

export const fromWeiToEther = str =>
  parseFloat(Web3.utils.fromWei(str.toString(), 'ether')).toFixed(6) + ' Ξ'

export const shortenAddr = addr =>
  addr.substr(0, 15) + '...'

export const shortenHash = addr =>
  addr.substr(0, 20) + '...'