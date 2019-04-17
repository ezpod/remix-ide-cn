const allPrograms = [
  {'ethers': 'ethers.js是一个紧凑但完整的以太坊JavaScript开发库'},
  {'remix': '以太坊集成开发环境与工具'},
  {'web3': 'web3.js包含一组模块，用于实现以太坊生态系统中的特定功能'},
  {'swarmgw': '这个库可以用于通过https://swarm-gateways.net/向swarm上传或下载文件'}
]

const allCommands = [
  {'remix.debug(hash)': '开始调试指定交易'},
  {'remix.debugHelp()': '显示调试相关帮助信息'},
  {'remix.execute(filepath)': '运行指定路径的脚本。如果filepath为空则运行编辑器当前显示的脚本'},
  {'remix.exeCurrent()': '运行编辑器里当前显示的脚本'},
  {'remix.getFile(path)': '返回指定路径文件的内容'},
  {'remix.help()': '显示本帮助信息'},
  {'remix.loadgist(id)': '在文件浏览器中载入一个gist'},
  {'remix.loadurl(url)': '在文件浏览器中载入指定的url，可以是github、swarm或ipfs的url'},
  {'remix.setFile(path, content)': '设置指定路径文件的内容'},
  {'remix.setproviderurl(url)': '修改当前提供器为Web3提供器，并设置url访问端结点'},

  {'swarmgw.get(url, cb)': '从Swarm下载文件，利用https://swarm-gateways.net/'},
  {'swarmgw.put(content, cb)': '向Swarm上传文件，利用https://swarm-gateways.net/'},

  {'ethers.Contract': '这个API提供区块链上已部署合约的优雅封装，可以直接调用合约方法，API已经封装了所有的二进制协议并进行相应的类型转换'},
  {'ethers.HDNode': '层级确定性钱包是一个树状的私钥集合，可以从初始种子安全地重现'},
  {'ethers.Interface': '接口对象时一个元类，对应solidity的ABI'},
  {'ethers.providers': '提供器抽象了与以太坊区块链的连接，用来发出查询请求，或者提交状态更新交易'},
  {'ethers.SigningKey': '签名密钥接口是对secp256k1椭圆曲线密码学开发包的抽象'},
  {'ethers.utils': 'ethers包和ethers-utils包中提供的辅助函数集合'},
  {'ethers.utils.AbiCoder': '创建一个新的ABI Coder对象'},
  {'ethers.utils.RLP': '这个编码方法在以太坊内部多处使用，例如交易编码和合约地址确定'},
  {'ethers.Wallet': '钱包管理在以太坊网络中用于交易签名和身份验证的密钥对'},
  {'ethers.version': 'ethers容器对象版本'},

  {'web3.bzz': 'Bzz模块，用来与swarm网络交互'},
  {'web3.eth': 'Eth模块，用来与以太坊网络交互'},
  {'web3.eth.accounts': '包含用于生成以太坊账号以及交易/数据签名的方法'},
  {'web3.eth.abi': '用来对EMV调用的参数进行ABI编码/解码 '},
  {'web3.eth.ens': 'ens模块，用来与ENS系统交互'},
  {'web3.eth.Iban': '将以太坊地址转换为IBAN/BBAN地址，或者反之'},
  {'web3.eth.net': 'Net模块，用来与网络属性交互'},
  {'web3.eth.personal': 'Personal模块，用来与以太坊账户交互'},
  {'web3.eth.subscribe': '订阅区块链上发生的事件'},
  {'web3.givenProvider': '在以太坊兼容浏览器中使用web3.js时，这个变量将被设置为浏览器注入的原生提供器'},
  {'web3.modules': '包含web3容器对象的版本信息'},
  {'web3.providers': '显示当前可用的提供器'},
  {'web3.shh': 'Shh模块，用来与whisper协议交互'},
  {'web3.utils': '这个包提供用于以太坊dapp和其他web3.js包的辅助函数'},
  {'web3.version': '包含web3容器对象的版本信息'},

  {'web3.eth.clearSubscriptions();': '复位已经订阅的事件'},
  {'web3.eth.Contract(jsonInterface[, address][, options])': '这个对象可以简化与以太坊合约的交互'},
  {'web3.eth.accounts.create([entropy]);': '用来生成以太坊账号、对交易和数据进行签名'}
]

module.exports = {
  allPrograms,
  allCommands
}
