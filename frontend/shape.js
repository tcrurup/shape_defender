class Shape{

    constructor(className, width, height){
        this.element = document.createElement('canvas')
        this.element.setAttribute('width', width)
        this.element.setAttribute('height', height)
        this.element.className = className
    }

    set borderWidth(width){
        this.canvas.lineWidth = width
    }

    set borderColor(color){
        this.canvas.strokeStyle = color
    }

    set fillColor(color){
        this.canvas.fillStyle = color
    }

    get canvas(){
        return this.element.getContext('2d')
    }

    drawAndFill(){
        this.canvas.stroke()
        this.canvas.fill()
    }

    asElement(){
        this.drawAndFill()
        return this.element
    }


    static equilateralTriangle(className, width, height){
        
        let shape = new Shape(className, width, height)

        shape.canvas.beginPath();
        shape.canvas.moveTo(10,40)
        shape.canvas.lineTo(25,10)
        shape.canvas.lineTo(40,40)
        shape.canvas.closePath()

        shape.borderWidth = 5;
        shape.borderColor = '#666666';
        shape.canvas.fillStyle = "#FFCC00";
  

        return shape.asElement()
    }

    static line(className, width, height){

        let shape = new Shape(className, width, height)

        shape.canvas.beginPath();
        shape.canvas.moveTo(width/2 ,0)
        shape.canvas.lineTo(width/2, height)

        shape.borderWidth = 1;
        shape.borderColor = '#666666';

        return shape.asElement()
    }

    static circle(className, diameter){

        let shape = new Shape(className, diameter, diameter)

        shape.canvas.beginPath();
        shape.canvas.arc(diameter/2, diameter/2, diameter/2*.8, 0, Math.PI * 2)

        shape.borderWidth = 5;
        shape.borderColor = '#666666';

        shape.fillColor = "#FF0000";

        return shape.asElement()
    }
}