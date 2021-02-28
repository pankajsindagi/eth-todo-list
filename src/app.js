// const Web3 = require("web3");

App = {
    contracts: {},
    load: async () => {
        // // Load app..
        // console.log("app loading...");
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    // loadWeb3: async () => {
    //     if (typeof web3 !== 'undefined') {
    //         App.web3Provider = web3.currentProvider
    //         web3 = new Web3(web3.currentProvider)
    //     } else {
    //         window.alert("Please connect to Metamask.")
    //     }
    //     // Modern dapp browsers...
    //     if (window.ethereum) {
    //         window.web3 = new Web3(ethereum)
    //         try {
    //             // Request account access if needed
    //             await ethereum.enable()
    //             // Acccounts now exposed
    //             web3.eth.sendTransaction({/* ... */ })
    //         } catch (error) {
    //             // User denied account access...
    //         }
    //     }
    //     // Legacy dapp browsers...
    //     else if (window.web3) {
    //         App.web3Provider = web3.currentProvider
    //         window.web3 = new Web3(web3.currentProvider)
    //         // Acccounts always exposed
    //         web3.eth.sendTransaction({/* ... */ })
    //     }
    //     // Non-dapp browsers...
    //     else {
    //         console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    //     }
    // },


    loadWeb3: async () => {
        // Modern dapp browsers... 
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            App.web3Provider = web3.currentProvider;
            try {
                // Request account access if needed
                await ethereum.enable();
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */ });
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider);
            App.web3Provider = web3.currentProvider;
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */ });
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    },

    loadAccount: async () => {
        web3.eth.getAccounts().then(function (acc) {
            App.account = acc[0];
            console.log(App.account);
        })
    },

    loadContract: async () => {
        const todoList = await $.getJSON('TodoList.json');
        App.contracts.TodoList = TruffleContract(todoList);
        App.contracts.TodoList.setProvider(App.web3Provider);

        // Hydrate the smart contract 
        App.todoList = await App.contracts.TodoList.deployed();
    },

    render: async () => {
        $('#account').html(App.account);
    }
}

// window.addEventListener('load', async () => {
//     // Modern dapp browsers... 
//     if (window.ethereum) {
//         window.web3 = new Web3(ethereum);
//         try {
//             // Request account access if needed
//             await ethereum.enable();
//             // Acccounts now exposed
//             web3.eth.sendTransaction({/* ... */ });
//         } catch (error) {
//             // User denied account access...
//         }
//     }
//     // Legacy dapp browsers...
//     else if (window.web3) {
//         window.web3 = new Web3(web3.currentProvider);
//         // Acccounts always exposed
//         web3.eth.sendTransaction({/* ... */ });
//     }
//     // Non-dapp browsers...
//     else {
//         console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
//     }
// });

$(() => {
    $(window).load(() => {
        App.load();
    });
})