import ipfsAPI from 'ipfs-api'

export const ipfs = new ipfsAPI({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})

