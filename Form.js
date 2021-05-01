class Form{

constructor(){

    this.button = createButton('Play');
}
hide(){
  
    this.button.hide();
   // this.button.visible=false
  }
display(){

    this.button.position(550, 350);




    this.button.mousePressed(()=>{
   this.button.hide();
   g.State=1
   //this.button.position(550, 1000);
   
  });



}




}