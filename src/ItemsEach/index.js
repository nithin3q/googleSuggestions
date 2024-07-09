import {Component} from 'react'
import './index.css'
class ItemsEach extends Component{
    render(){
        const {item} = this.props
        return(
            <li className = 'animated-heading'>{item}</li>
        )
    }
}

export default ItemsEach