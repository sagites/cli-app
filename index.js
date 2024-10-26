#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const program = new Command();
const TASKS_FILE = "tasks.json";

if (!fs.existsSync(TASKS_FILE)) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify([]));
}

const readTasks = () => JSON.parse(fs.readFileSync(TASKS_FILE));
const writeTasks = (tasks) =>
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));

program.version("1.0.0").description("A simple task tracker");

// Command to add a task
program
  .command("add <task>")
  .description("Add a new task")
  .action((task) => {
    const tasks = readTasks();
    tasks.push({ task, complete: false });
    writeTasks(tasks);
    console.log(`Task added: "${task}"`);
  });

// Command to list all tasks
program
  .command("list")
  .description("List all tasks")
  .action(() => {
    const tasks = readTasks();
    console.log("Your tasks:");
    tasks.forEach((t, index) => {
      console.log(`${index + 1}. [${t.complete ? "x" : " "}] ${t.task}`);
    });
  });

// Command to mark a task as complete
program
  .command("complete <taskNumber>")
  .description("Mark a task as complete")
  .action((taskNumber) => {
    const tasks = readTasks();
    const index = taskNumber - 1;

    if (tasks[index]) {
      tasks[index].complete = true;
      writeTasks(tasks);
      console.log(`Task ${taskNumber} marked as complete.`);
    } else {
      console.log(`Task number ${taskNumber} not found.`);
    }
  });

program
  .command("delete <taskNumber>")
  .description("Delete a task by its number")
  .action((taskNumber) => {
    const tasks = readTasks();
    const index = taskNumber - 1;

    if (tasks[index]) {
      const removedTask = tasks.splice(index, 1); // Remove the task
      writeTasks(tasks);
      console.log(`Task "${removedTask[0].task}" deleted.`);
    } else {
      console.log(`Task number ${taskNumber} not found.`);
    }
  });

program.parse(process.argv);
