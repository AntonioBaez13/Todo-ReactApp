export class TodoItemViewModel{
    id;
    task;
    notes;
    isCompleted;
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
        this.isCompleted = object.isCompleted;
        this.created = object.created;
        this.dueDate = object.dueDate;
        this.dateCompleted = object.dateCompleted;
        this.teamName = object.teamName;
    }
}