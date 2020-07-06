const IPFS = require('ipfs')

const main = async () => {
    // Spawning an IPFS node
    const node = await IPFS.create({silent: true})

    // Adding a file to IPFS
    const filesAdded = await node.add({
        path: 'hello.txt',
        content: Buffer.from('Hello World 101')
    });

    const fileBuffer = await node.cat(filesAdded[0])

    console.log('Added file contents:', fileBuffer.toString())
}

main()