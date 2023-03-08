// import { Gamepad, Giftpad } from "./listIcons";

class ObjIcons{
    id = 0;
    name = "";
    iconObjs = "🙋";

    constructor(id = 0, name = "", iconObjs = ""){
        this.id = id;
        this.name = name;
        this.iconObjs = iconObjs;
    }

}

export class LisObjIcons{
    
    ListIcons = [];

    constructor(){
        this.ListIcons.push(new ObjIcons(1,"Asistencia","🙋"));
        this.ListIcons.push(new ObjIcons(2,"Mano Malo","👎"));
        this.ListIcons.push(new ObjIcons(3,"Mano Bueno","👍"));
        this.ListIcons.push(new ObjIcons(4,"Mano Extendida","✋"));
        this.ListIcons.push(new ObjIcons(5,"Cooperacion","🤝"));
        this.ListIcons.push(new ObjIcons(6,"Cerebro","🧠"));
        this.ListIcons.push(new ObjIcons(7,"Planeta","🌎"));
        this.ListIcons.push(new ObjIcons(8,"Primer Lugar","🥇"));
        this.ListIcons.push(new ObjIcons(9,"Segundo Lugar","🥈"));
        this.ListIcons.push(new ObjIcons(10,"Tercer Lugar","🥉"));
    }

    getListJson(){
        return this.ListIcons.map((item)=>{
            return {
                id: item.id,
                name: item.name,
                iconObjs: item.iconObjs
            };
        });
    }

    getIcon(keyicon = 0){
        let icons = this.getListJson();
        return icons.filter((item)=>{
            return item.id == keyicon;
        })[0];
    }
}