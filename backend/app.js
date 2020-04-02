class MessageApp {
  constructor() {
    this.messages = []
  }

  //Create
  post(content) {
    let item = {
      id: this.messages.length,
      content: content,
      date: new Date()
    }
    this.messages.push(item)
    return this.messages
  }

  //Refactor
  get(id){
    return this.messages[id];
  }

  //Update
  update(id, update){
    this.messages[id].content = update
    return this.messages[id]
  }

  //Delete
  delete(id){
    this.messages.splice(id - 1, 1)
    return this.messages
  }
}

export default MessageApp