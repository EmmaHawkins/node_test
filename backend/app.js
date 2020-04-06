function newId(array){
  if(array.length > 0) {
    return array[array.length-1].id + 1;
  } else {
    return 1
  }
}

import fs from 'fs'
import path from 'path'
class MessageApp {
  constructor(filepath) {
    this.filepath = filepath
    this.messages = filepath ? this.readFromJson() : []
  }

  //Create
  post(content) {
    let item = {
      id: newId(this.messages),
      content: content,
      date: new Date()
    }
    this.messages.push(item)
    return this.messages
  }

  //Refactor
  get(id){
    return this.messages.filter(message => message.id === id)[0]
  }

  //Update
  update(id, update){
    let index = this.messages.findIndex(message => message.id === id)
    this.messages[index].content = update
  }

  //Delete
  delete(id){
    this.messages = this.messages.filter(message => message.id != id)
    return this.messages
  }

  //read from the JSON file
  readFromJson(){
    return JSON.parse(fs.readFileSync(
      __dirname+path.normalize(this.filepath),"utf8",(err, data)=> {
        if (err) throw err
      }
    ))
  }
}

export default MessageApp