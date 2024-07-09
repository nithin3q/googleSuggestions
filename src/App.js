import './App.css';
import React,{Component} from 'react'
import axios from 'axios'
import ItemsEach from './ItemsEach/'

class App extends Component{
  state = {search_result: '', suggestions: []}
  getSearch = event =>{
    this.setState({search_result: event.target.value})
  }
  getSuggestions = async() =>{
    const {search_result} = this.state
    try{
      const response = await axios.get('https://suggestqueries.google.com/complete/search', {
        params: {
          client: 'firefox',
          q: search_result
        },
        headers: {
          'Access-Control-Allow-Origin': '*', 
        },
      })
      this.setState({suggestions: response.data[1]})
    }
    catch(e){
      console.log(e)
    }
  }
  render(){
    const {suggestions} = this.state
    return(
      <div className = 'main-background'>
        <img src = 'https://assets.ccbp.in/frontend/react-js/google-logo.png' alt = 'logo google' className=  'google-image'/>
        <br/>
        <input type = 'search' placeholder = 'Enter that what do you want to search' onChange = {this.getSearch} className = 'input-box'/>
        <button onClick = {this.getSuggestions} className = 'button'>submit</button>
        
        <ul>
          {suggestions.map((eachItem, index) =>(
            <ItemsEach key = {index} item = {eachItem}/>
          ))}
        </ul>
      </div>
    )
  }
}

export default App;
