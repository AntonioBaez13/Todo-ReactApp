export class TodoItemViewModel{
    id;
    task;
    notes;
    status;
    created;
    dueDate;
    dateCompleted;
    teamName;

    constructor(object){
        if(!object){
            return;
        }

        this.id = object.id;
        this.task = object.task;
        this.notes = object.notes;
        this.status = object.status;
        this.created = object.created;
        this.dueDate = object.dueDate;
        this.dateCompleted = object.dateCompleted;
        this.teamName = object.teamName;
    }
}