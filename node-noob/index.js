const db = require('./db')
const inquirer = require('inquirer')

module.exports.add =  async (title) => {
  // read current task list from the file
  const list = await db.read()
  // add task to the list
  list.push({title, done: false})
  // write the code in the file
  await db.write(list)
}

module.exports.clear = async (title) => {
  await db.write([])
}

module.exports.showOptions = async () => {
  // read current task
  const list = await db.read()

  inquirer
  .prompt([
    {
      type: 'list',
      name: 'index',
      message: 'Please choose a task',
      choices: [
        {name: 'Exit', value: '-1'}, 
        {name: '+New', value: '-2'},
        ...list.map((task, index)=> {
        return {
          name:  `${task.done ? '[x]' : '[_]'}  ${index + 1} - ${task.title}`,
          value: index.toString()
        }
      }), 
     ],
    },
  ])
  .then((answer) => {
    const index = parseInt(answer.index)
    if (index >= 0) {
      // user picked a task
      inquirer.prompt({
        type: 'list',
        name: 'action',
        choices: [
          {name: 'Exit', value: 'exit'},
          {name: 'Complete', value: 'complete'},
          {name: 'Undone', value: 'undone'},
          {name: 'Delete', value: 'delete'},
          {name: 'Edit', value: 'edit'},
        ]
      }).then(answer2 => {
        switch (answer2.action) {
          case 'exit':
            break;
          case 'complete':
            list[index].done = true
            db.write(list)
            break;
          case 'undone':
            list[index].done = false
            db.write(list)
            break;
          case 'delete':
            list.splice(index, 1)
            db.write(list)
            break;
          case 'edit':
            inquirer.prompt({
              type: 'input',
              name: 'title',
              message: 'enter a new title',
              default: list[index].title
            }).then((answer3)=> {
              list[index].title  = answer3.title
              db.write(list)
            })
            break;
        }
      })
    } else if (index === -2) {
      // user create a new task
      inquirer.prompt({
        type: 'input',
        name: 'title',
        message: 'Please enter a task title'
      }).then((answer4)=> {
        list.push({
          title: answer4.title,
          done: false
        })
        db.write(list)
      })
    }
  });
}