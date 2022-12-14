import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  
  getLists() {
    return this.webReqService.get('lists');
  }
    
    getTasks(listId: string){
        return this.webReqService.get(`lists/${listId}/tasks`);
    }
    
    createList(title: string) {
        return this.webReqService.post('lists', { title }); 
    }
    
    createTask(title: string, listId: string) {
        return this.webReqService.post(`lists/${listId}/tasks`, { title });
    }

    complete(task: any) {
        return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
          completed: !task.completed
        });
    }
}
