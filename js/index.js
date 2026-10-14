function isArmstrong(n){
    const num = Number(n);
    if (!Number.isInteger(num) || num < 0) return false;

    let sum=0;
    let temp=num;
    let digits=num.toString().length;
    while(temp>0){
        let d=temp%10;
        sum+=Math.pow(d,digits);
        temp=Math.floor(temp/10);
    }
    return sum===num;
}
function checkandshow(){
    let val=Number(document.getElementById("num").value);
    let para=document.createElement("p");
    if(isArmstrong(val)){
        para.innerHTML=val+" is <b style='color: green'>an Armstrong number</b>";
        console.log("Armstrong");
    }else{
        para.innerHTML=val+" is <b style='color: red'>not an Armstrong number</b>";
        console.log("Not Armstrong");
    }
    document.getElementsByTagName("body")[0].append(para);
}

