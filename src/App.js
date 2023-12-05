import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constants/index.js";

function App() {
  const [account, setAccount] = useState("");
  const [newValue, SetNewvalue] = useState("");
  const [ address, setAddress] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  //const nonce = 5;
 
  const connectMetamask = async (event) => {
    event.preventDefault();
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        console.log(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const getValue = async (event) => {
    event.preventDefault();
    try {
      
      console.log(contract.address);
      
      
      const txResponse = await contract.getState();
      
      console.log(txResponse.toNumber());
      window.alert("Current Value: " + txResponse.toNumber());
    } catch (error) {
      console.error(error);
    }
    
  };

  const UpdateNewValue = async (event) => {
    event.preventDefault();
    try {
      const txResponse = await contract.updateState(newValue);
      await txResponse.wait();
      window.alert("Successfully Update the Value");
      //console.log(txResponse);
    } catch (error) {
      //console.error(error);
      window.alert("You are not whitelisted");
    }
    
  };

  const whitelist = async (event) => {
    event.preventDefault();
    try {
      const txResponse = await contract.updateWhitelist(address , true);
      await txResponse.wait();
      //console.log(txResponse);
      window.alert("Whitelist Address added");
    } catch (error) {
      //console.error(error);
      window.alert("You are not Owner");
    }
    
  };

 
  return (
    <div className="App">
      <div className="desktop-1">
      <div className="word-break-parent">
      <form className="f1">
      <p className="head">Zenith X</p>
      <br />
    
        <button className="connect" onClick={connectMetamask}>
          Connect Metamask
        </button>
       
        <br></br>
        <button className="lock" onClick={getValue}>
          Current Value
        </button>
        <br></br>
        <button className="withdraw" onClick={UpdateNewValue}>
          Update
        </button>
        <input type="text" className="value" placeholder="Value" value={newValue} onChange={(e) => SetNewvalue(e.target.value)}></input>
        <br></br>
        <button className="withdraw" onClick={whitelist}>
          Add Address
        </button>
        <input type="text" className="value" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}></input>
        <br></br>

        {account ==="" ? (
      <p></p>
): account !=="" ?(
      <p className="account">Hello: {account}</p>
      ): null}
      </form>
      
      <br />
     

    </div>
    </div>
    </div>
  );
}

export default App;
