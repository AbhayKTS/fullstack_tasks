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
    if(isArmstrong(val)){
        console.log("Armstrong");
        document.getElementById("result").innerHTML=val+" is an Armstrong number";
    }else{
        console.log("Not Armstrong");
        document.getElementById("result").innerHTML=val+" is not an Armstrong number";
    }
}