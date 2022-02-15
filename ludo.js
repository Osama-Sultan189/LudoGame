//all these variables are made global because once ludo loads some values are required throughout
var i=0;
const colorArr=["red","green","yellow","blue"];
const start=[1,14,27,40];
const left=['r','g','y','b'];
const pugGai=[0,0,0,0];
var turn=1;
var diceNum;
function rollDice(){
    ifStacked();
    //3 sixes are not allowed
    // foul occurs
    diceNum = Math.floor(Math.random() * 6) + 1;
    document.getElementById("diceImg").src = "images/ludo-dice/"+diceNum+".png";
    document.getElementById("numbers").innerHTML=document.getElementById("numbers").innerHTML+diceNum+" ";
    if(diceNum!=6){
        document.getElementById("diceSize").disabled=true;
        turn=1;
        setThings();
        return;
    }
    turn++;
    if(turn==4){
        turn=1;
        i++;
        i=(i%4);
        document.getElementById("numbers").innerHTML="";
        document.getElementById("name").innerHTML=colorArr[i];
        document.getElementById("name").style.color=colorArr[i];
        return;
    }
}
function setThings(){
    var tr=document.getElementById("numbers").innerHTML;
    const myArray = tr.split(" ");
    if(myArray[0]==6)
        for(var z=1;z<=4;z++){
            if(document.getElementById(left[i]+z)!==null)
                document.getElementById(left[i]+z).disabled=false;
            if(document.getElementById(left[i]+z+'O')!==null)
                document.getElementById(left[i]+z+'O').disabled=false;
        }
    else
    {
        const ar=document.getElementsByClassName(colorArr[i]+"PieceO");
        if(ar.length==0){
             i++;
             i=(i%4);
             document.getElementById("numbers").innerHTML="";
             document.getElementById("name").innerHTML=colorArr[i];
             document.getElementById("name").style.color=colorArr[i];
             document.getElementById("diceSize").disabled=false;
            return;
        }
        for(var z=1;z<=4;z++)
            if(document.getElementById(left[i]+z+'O')!==null)
                document.getElementById(left[i]+z+'O').disabled=false;
    }
}
var idClicked=0;
function selectNext(){
    var tr=document.getElementById("numbers").innerHTML;
    const myArray = tr.split(' ');
    if(myArray[0]!=6)
        for(var z=1;z<=4;z++)
            if(document.getElementById(left[i]+z)!==null)
                document.getElementById(left[i]+z).disabled=true;
    if(myArray.length>1)
        return false;
    else{
        for(var z=1;z<=4;z++){
            if(document.getElementById(left[i]+z)!==null)
                document.getElementById(left[i]+z).disabled=true;
            if(document.getElementById(left[i]+z+'O')!==null)
                document.getElementById(left[i]+z+'O').disabled=true;
        }
        i++;
        i=(i%4);
        document.getElementById("numbers").innerHTML="";
        document.getElementById("name").innerHTML=colorArr[i];
        document.getElementById("name").style.color=colorArr[i];
        document.getElementById("diceSize").disabled=false;
        return true;
    }
}
function playerClick(idComing){
    if(idComing.length==2){
        var elem=document.getElementById(idComing);
        elem.id=idComing+'O';
        elem.className+='O';
        document.getElementById(start[i]).appendChild(elem);
        let text=document.getElementById("numbers").innerHTML;
        document.getElementById("numbers").innerHTML=text.replace("6 ","");
        ifStacked();
        selectNext();
    }
    else{
        idClicked=idComing;
        var e=0;
        var tr=document.getElementById("numbers").innerHTML;
        const myArray = tr.split(' '); 
        if(myArray.length==2){
            e = myArray[0];
            var elem=document.getElementById(idComing).parentElement.id;
            var clickedPlayer=document.getElementById(idComing);
            var move=(parseInt(elem)+parseInt(e));
            let pos=(i*12)+(i-1);
            if(pos<0)
                pos=51; 
            if(parseInt(elem)<=pos && move>pos){
                let count=pos-parseInt(elem);
                let nexPos=e-count;
                if(nexPos==6){
                    pugGai[i]++;
                    document.getElementById(idComing).remove();
                    if(pugGai[i]==4){
                        alert('Congratulations player '+ colorArr[i] + ' wins');
                        location.reload();
                    }
                }
                else if(nexPos>6){
                    alert("cannot move this piece");
                    checkMore(idComing);
                    return;
                }
                else
                    document.getElementById(idComing[0]+'h'+nexPos).appendChild(clickedPlayer);
                document.getElementById("numbers").innerHTML="";
            }
            else{
                if(elem.length==3){
                    var curPos=parseInt(elem[2]);
                    var nexPos=curPos+parseInt(e);
                    if(nexPos==6){
                        pugGai[i]++;
                        document.getElementById(idComing).remove();
                        if(pugGai[i]==4){
                            alert('Congratulations player '+ colorArr[i] + ' wins');
                            location.reload();
                        }
                    }
                    else if(nexPos>6){
                        alert("cannot move this piece");
                        checkMore(idComing);
                        return;
                    }
                    else
                        document.getElementById(idComing[0]+'h'+nexPos).appendChild(clickedPlayer);
                    document.getElementById("numbers").innerHTML="";
                }
                else{
                    let p=(parseInt(elem)+parseInt(e))%52;
                    if(p==0)
                        p=52;
                    kill(idComing,p);
                    (document.getElementById(p)!=null)?document.getElementById(p).appendChild(clickedPlayer):0;
                    document.getElementById("numbers").innerHTML="";
                }
            }
            selectNext();
        }
        else{
            if(document.getElementById("numbers").firstChild.tagName=="BUTTON")
                return;
            document.getElementById("numbers").innerHTML="";
            for(var ind=0;ind<myArray.length-1;ind++){
                let btn = document.createElement("button");
                btn.innerHTML = myArray[ind];
                btn.className="numBtn";
                document.getElementById("numbers").appendChild(btn);   
            }
            const button=document.getElementsByClassName("numBtn");
            for(let btnSize=0;btnSize<button.length;btnSize++){
                let f=button[btnSize].innerHTML;
                button[btnSize].onclick=function(){
                    var pId=document.getElementById(idComing).parentElement.id;
                    var move=(parseInt(pId)+parseInt(f));
                    let pos=(i*12)+(i-1);
                    if(pos<0)
                        pos=51;
                    if(parseInt(pId)<=pos && move>pos){
                        let count=pos-parseInt(pId);
                        let nextPos=f-count;
                        document.getElementById(idComing[0]+'h'+nextPos).appendChild(document.getElementById(idComing));
                    }
                    else{
                        kill(idComing,parseInt(pId)+parseInt(f)%52);
                        (document.getElementById(parseInt(pId)+parseInt(f)%52)!=null)?document.getElementById(parseInt(pId)+parseInt(f)%52).appendChild(document.getElementById(idComing)):0;
                    }
                    this.remove();
                    unBtn();
                    selectNext();
                }
            }
        }
    }  
}
function unBtn(){
    var numStr="";
    const btnArr=document.getElementsByClassName("numBtn");
    for(var btn=0;btn<btnArr.length;btn++){
        numStr+=btnArr[btn].innerHTML;
        numStr+=" ";
    }
    document.getElementById("numbers").innerHTML=numStr;
}
function kill(ID,nextId){
    var child=document.getElementById(nextId).firstChild;
    if(child!=null && document.getElementById(nextId).className.length==5){
        if(document.getElementById(ID).className!=child.className){
            var newChildId=child.id[0]+child.id[1];
            var clr=child.className;
            var getID=clr.split('P');
            var newID=getID[0]+child.id[1];
            child.id=newChildId;
            child.className=getID[0]+"Piece";
            child.disabled=true;
            document.getElementById(newID).appendChild(child);
        }
    }
}
function checkMore(idCheck){
    var comingClass=document.getElementById(idCheck).className;
    let classArr=document.getElementsByClassName(comingClass);
    if(classArr.length==1){
        document.getElementById("numbers").innerHTML="";
        selectNext();
    }
}
function restart(){
    location.reload();
}
function ifStacked(){
    const checkStack=document.getElementsByClassName("cheera");
    for(var cheeraCount=0;cheeraCount<checkStack.length;cheeraCount++)
        if(checkStack[cheeraCount].childNodes.length>1){
            var getChilds=checkStack[cheeraCount].childNodes;
            for(var ch=0;ch<getChilds.length;ch++)
                if(getChilds[ch].className==colorArr[i]+"PieceO"){
                    swap(getChilds[ch],getChilds[0]);
                    return;
                }
        }
}
function swap(nodeA, nodeB) { //copied from stackoverflow for swapping
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
    nodeB.parentNode.insertBefore(nodeA, nodeB);
    parentA.insertBefore(nodeB, siblingA);
};