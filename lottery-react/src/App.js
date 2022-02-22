import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from "./lottery";

class App extends React.Component {
  state = {
    manager: '',
    players: [],
    currentUser: '',
    balance: '',
    value: '',
    message: '',
    loading: true,
    canSubmit: false,
    error: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.owner().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    const accounts = await web3.eth.getAccounts();

    this.setState({ manager, players, balance, currentUser: accounts[0], loading: false });
    
    window.ethereum.on('accountsChanged', (newAccounts) => {
      this.setState({ currentUser: newAccounts[0] });
    });
  }

  onChange = (event) => {
    this.setState({ value: event.target.value.trim() });

    if(!isNaN(event.target.value) && !isNaN(parseFloat(event.target.value))){
      this.setState({ canSubmit: true, error: '' });
    } else {
      this.setState({ canSubmit: false, error: 'Please input a number.' });
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    try{
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      this.setState({ value: '', message: 'You have been entered!' });
    } catch (err) {
      if(err.code === 4001) {
        this.setState({ value: '', message: 'Transaction rejected.' });
      } else {
        this.setState({ value: '', message: 'Some other shit happened, check yo console logs.' });
        console.log(err);
      }
    }
  };

  pickWinner = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!' });
  };

  render() {
    return (
      <div className="wrapper">
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label htmlFor="etherInput">Amount of ether to enter:</label>
            <input
              type="text"
              id="etherInput"
              value={this.state.value}
              onChange={this.onChange}
            />
            <button disabled={!this.state.canSubmit}>Enter</button>
            {
              this.state.error?
                <p>{this.state.error}</p>
              : null
            }
          </div>
        </form>

        <hr />

        {
          (!this.state.loading && this.state.currentUser.toLowerCase() === this.state.manager.toLowerCase()) ?
          <>
            <h4>Ready to pick a winner?</h4>
            <button onClick={this.pickWinner}>
              Pick winner!
            </button>

            <hr />
          </>
          : null
        }

        <h2>{this.state.message}</h2>
      </div>
    );
  }
}
export default App;
