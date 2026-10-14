let num=153;
let sum=0;
let t=num;
let count=0;
while(t>0){
    count++;
    t=Math.floor(t/10);
}
t=num;
while(t>0){
    let d=t%10;
    sum+=d**3;
    t=Math.floor(t/10);
}
if (sum===num){
    console.log("Armstrong number.");
}else{
    console.log("Nope");
}