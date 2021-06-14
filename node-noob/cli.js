const program  = require('commander');
const api = require('./index')

program
  .option('-, --test', 'show me the test code')

/**
 * add a new task
 */
program
  .command('add')
  .description('add a new task')
  .action((...args) => {
    const input = args.slice(0, -1).join(' ')
    api.add(input).then(()=> {
      console.log('add task successful!')
    }, ()=> {
      console.log('add task fail!')
    })
  });

/**
 * clear all the task
 */
program
.command('clear')
.description('clean all the tasks')
.action(() => {
 api.clear().then(()=> {
  console.log('clear all the task successful!')
 }, ()=> {
  console.log('clear task fail!')
 })
});

program.parse(process.argv);
/**
 * show all options if user doesn't choose a action
 */
if(process.argv.length === 2) {
  api.showOptions()
}
