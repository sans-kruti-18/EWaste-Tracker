let web3;
let recyclingManager;
let recyclerAddress;
let eWasteTracker;
let contractsInitialized = false;

const recyclingManagementABI = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_userManagementAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_eWasteTrackerAddress",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "wasteId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "recycler",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "reason",
              "type": "string"
            }
          ],
          "name": "NonCompliance",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "wasteId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "method",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "recycledAt",
              "type": "uint256"
            }
          ],
          "name": "WasteRecycled",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "eWasteTracker",
          "outputs": [
            {
              "internalType": "contract eWasteTracking",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "recycledWaste",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "wasteId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "method",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "recycler",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "recycledAt",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "userManagement",
          "outputs": [
            {
              "internalType": "contract UserManagement",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_wasteId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_method",
              "type": "string"
            }
          ],
          "name": "processRecycling",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_wasteId",
              "type": "uint256"
            }
          ],
          "name": "getRecycledItem",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "wasteId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "method",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "recycler",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "recycledAt",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        }
 ];
// Replace with your contract ABIs and addresses
const eWasteTrackingABI = [ 
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "_userManagementAddress",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "wasteType",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "origin",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "name": "WasteLogged",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "WasteProcessed",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "userManagement",
        "outputs": [
          {
            "internalType": "contract UserManagement",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "wasteCounter",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "wasteRecords",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "wasteType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "origin",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "loggedAt",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isProcessed",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_wasteType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_origin",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_deadline",
            "type": "uint256"
          }
        ],
        "name": "logWaste",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "markAsProcessed",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "getWasteItem",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "wasteType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "origin",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "loggedAt",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isProcessed",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }
];

const eWasteTrackingAddress = "0xe851C5A246e49852C9888343e730F29ecC226b11";
const recyclingManagementAddress = "0xe851C5A246e49852C9888343e730F29ecC226b11";

async function initializeWeb3() {
  if (window.ethereum) {
      web3 = new Web3(window.ethereum);  // Assign Web3 instance
      try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3.eth.getAccounts();
          recyclerAddress = accounts[0];
          console.log("Recycler address:", recyclerAddress);

          // Initialize contracts after web3 is defined
          eWasteTracker = new web3.eth.Contract(eWasteTrackingABI, eWasteTrackingAddress);
          recyclingManager = new web3.eth.Contract(recyclingManagementABI, recyclingManagementAddress);
          contractsInitialized = true;  // Mark contracts as initialized
      } catch (error) {
          console.error("Error connecting to MetaMask:", error);
      }
  } else {
      console.error("MetaMask not installed.");
  }
}


// Fetch eWaste items from track-ewaste.js
async function fetchTrackedWasteItems() {
  try {
      const wasteItems = await contract.methods.getWasteItems().call(); 

      // Convert BigInt values to strings
      const formattedItems = wasteItems.map(item => ({
          id: item.id.toString(),  // Convert BigInt to string
          weight: item.weight.toString(), // Convert BigInt to string
          timestamp: item.timestamp.toString(), // Convert BigInt to string
          location: item.location,
          status: item.status
      }));

      console.log("Fetched Waste Items:", formattedItems);
      return formattedItems;
  } catch (error) {
      console.error("Error fetching waste items:", error);
  }
}


// Confirm Receipt of eWaste
async function confirmReceipt() {
    const wasteId = document.getElementById("wasteId").value;
    try {
        await recyclingManager.methods
            .processRecycling(wasteId, "Confirmed Receipt")
            .send({ from: recyclerAddress });
        document.getElementById("receiptStatus").innerText = "Receipt confirmed successfully!";
    } catch (error) {
        document.getElementById("receiptStatus").innerText = "Error: " + error.message;
    }
}

// Update Recycling Details
async function updateRecycling() {
    const wasteId = document.getElementById("recyclingWasteId").value;
    const method = document.getElementById("recyclingMethod").value;
    try {
        await recyclingManager.methods
            .processRecycling(wasteId, method)
            .send({ from: recyclerAddress });
        document.getElementById("recyclingStatus").innerText = "Recycling details updated successfully!";
    } catch (error) {
        document.getElementById("recyclingStatus").innerText = "Error: " + error.message;
    }
}

// View eWaste Details
async function viewWasteDetails() {
    const wasteId = document.getElementById("viewWasteId").value;
    try {
        // Fetch waste details from eWasteTracker contract
        const wasteDetails = await eWasteTracker.methods.getWasteItem(wasteId).call();

        // Fetch recycling details from recyclingManager contract
        const recycledDetails = await recyclingManager.methods.getRecycledItem(wasteId).call();

        // Display details
        document.getElementById("wasteDetails").innerHTML = `
            <p><strong>ID:</strong> ${wasteDetails.id}</p>
            <p><strong>Type:</strong> ${wasteDetails.wasteType}</p>
            <p><strong>Origin:</strong> ${wasteDetails.origin}</p>
            <p><strong>Quantity:</strong> ${wasteDetails.quantity}</p>
            <p><strong>Deadline:</strong> ${new Date(wasteDetails.deadline * 1000).toLocaleString()}</p>
            <p><strong>Logged At:</strong> ${new Date(wasteDetails.loggedAt * 1000).toLocaleString()}</p>
            <p><strong>Processed:</strong> ${wasteDetails.isProcessed ? "Yes" : "No"}</p>
            <p><strong>Recycling Method:</strong> ${recycledDetails.method}</p>
            <p><strong>Recycled At:</strong> ${new Date(recycledDetails.recycledAt * 1000).toLocaleString()}</p>
        `;
    } catch (error) {
        document.getElementById("wasteDetails").innerText = "Error: " + error.message;
    }
}

// Initialize Web3 and fetch tracked waste items on page load
window.addEventListener("load", async () => {
    await initializeWeb3();
    await fetchTrackedWasteItems();
});