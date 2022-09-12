import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  lists: any;
  tasks: any;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      
    this.route.params.subscribe(
        (params: Params) => {
            if(params.listId){
                this.taskService.getTasks(params.listId).subscribe( (tasks: any) => {
                    this.tasks = tasks;
                    })
                }
            else{
                this.tasks = undefined;
            }
            }
    )
    this.taskService.getLists().subscribe((lists: any) => {
        this.lists = lists;
      })
            
  }  

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      console.log("Completed successully!");
      task.completed = !task.completed;
    })
    }
}
