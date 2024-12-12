export const bodySet = (type, name, description, idProject, idEpic) =>{
    if(type=="stories"){
        return {
        "assignedTo": [],
        "points": 5,
        "status": "todo",
        "name": name,
        "description": description,
        "epic": idEpic,
        "created": "2022-02-07T21:44:26.346Z",
        };
    }

    if(type=="epics"){
    return {
        "project" : idProject,
        "name": name,
        "description": description,
        "icon": null
        };
    }

    if(type=="projects"){
    return {      
        "members": localStorage.getItem('userID'),
        "name": name,
        "description": description,
        "icon": null
        };
    }

}