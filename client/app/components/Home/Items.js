import React, {Component} from 'react'
import Component from './Components'

class Items extends Component{

  constructor(props){
    super(props)
    this.state = {
      noteText: '',
      notes: [],
    }
  }


  updateNoteText(noteText){
    this.setState({noteText: noteText.target.value})
  }


  addNote(){
    if(this.state.noteText === ''){
      return
    }

    let notesArr = this.state.notes
    notesArr.push(this.state.noteText)
    this.setState({noteText: ''})
    this.textInput.focus()
  }



  deleteNote(index){
    let notesArr = this.state.notesArr
    notesArr.slice(index, 1)
    this.setState({notes:notesArr})
  }

  render (){
    return(

      notes = this.state.notes.map((val, key) => {
        return <Note key={key} text = {val}
          deleteMethod = {()=> this.deleteNote(key)}/>
      })

      <div className = "container">
      <div className = "header" >Borrow Items</div>

      {notes}

      <div className = "btn" onClick={this.addNote.bind(this)}>+</div>
      <input type = "text"
        ref = {((input) => {
          this.textInput = input
          className = "textInput"
          value = {this.state.noteText}
          onChange = {noteText => this.updateNoteText(noteText)}

        })} />
      </div>
    )
  }

}
export default Items
