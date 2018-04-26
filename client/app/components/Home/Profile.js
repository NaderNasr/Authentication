import React, {Component} from 'react'
import Items from './Items.js'

class Profile extends React.Component {

  render (){
    return(
      <div className="container">
      <div className="row">
      <div className="col-sm-6">
      <div className="card hovercard" >
      <div className="cardheader">

      </div>
      <div className="avatar">
      <img alt="" src="https://ih1.redbubble.net/image.350781149.4748/flat,800x800,070,f.u1.jpg"></img>
      </div>
      <div className="info">
      <div className="title">
      <h1>{this.props.s}</h1>
      </div>
      <p>Passionate Mechanic</p>
      <p>Curious developer</p>
      <p>Drill Lover</p>
      </div>
      <div>
      </div>
      </div>

      <table>
  <thead>
    <tr>
        <th>Name</th>
        <th>Item Name</th>
        <th>Item Status</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Alvin</td>
      <td>Eclair</td>
      <td>Borrow</td>
    </tr>
    <tr>
      <td>Alan</td>
      <td>Jellybean</td>
      <td>Borrow</td>
    </tr>
    <tr>
      <td>Jonathan</td>
      <td>Lollipop</td>
      <td>Lend</td>
    </tr>
    <Items/>
  </tbody>
</table>
      </div>

      </div>

      </div>
  )
  }


}
export default Profile
