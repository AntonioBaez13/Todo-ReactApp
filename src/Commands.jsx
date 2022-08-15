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

export class TaskAddedDateViewModel{
    totalCreated;
    new;
    inProgress;
    completed;

    constructor(object){
        if(!object){
            return;
        }

        this.totalCreated = object.totalCreated;
        this.new = object.new;
        this.inProgress = object.inProgress;
        this.completed = object.completed;
    }
}

export class TasksTimeFrameCommand{
    date;
    timeFrame;

    constructor(object){
        this.date = object.date;
        this.timeFrame = object.timeFrame;
    }
}