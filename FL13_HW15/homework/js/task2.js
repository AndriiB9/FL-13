function Vehicle(color, engine) {
    this.color = color;
    this.engine = engine;
    this.maxSpeed = 70;
    this.currentSpeed = 0;
    this.isBreaking = false;
    this.isDriving = false;

    this.getMaxSpeed = function() {
        return this.maxSpeed;
    }
    this.upgradeEngine = function(newEngine, maxSpeed) {
        this.engine = newEngine;
        this.maxSpeed = maxSpeed;
    }

    this.handleHighSpeed = function() {
        console.log('speed is too high, SLOW DOWN!.');
    }
    
    this.drive = function() {   
        if (this.isDriving) {
            console.log('Already driving')
            return;
        }
        this.isDriving = true;
        let timerId = setInterval(() => {
            if (this.isBreaking === true) {
                clearInterval(timerId);
                this.isDriving = false;
            }
            this.currentSpeed += 20;
            console.log(this.currentSpeed);
            if(this.currentSpeed > this.maxSpeed) {
                this.handleHighSpeed();
            }
        }, 2000 ,this.currentSpeed);  
    }

    this.stop = function() {
        if (this.isBreaking) {
            console.log('Already breaking');
            return;
        }
        this.isBreaking = true;
        let maxSpeed = this.currentSpeed;
        let timerId = setInterval(() => {
            this.currentSpeed -= 20;
            console.log(this.currentSpeed > 0 ? this.currentSpeed : 0);
            if(this.currentSpeed <= 0) {
                this.currentSpeed = 0;
                clearInterval(timerId)
                console.log(`Vehicle is stopped. Maximum speed during the drive was ${maxSpeed}`);
                this.isBreaking = false;
                return;
            }
        }, 1500 ,this.currentSpeed);       
    }
}

  function Car(model, color, engine) {
    Vehicle.apply(this, [color, engine]);
    this.model = model;
    this.maxSpeed = 80;
    
    this.getInfo = function() {
        console.log(`engine: ${this.engine}, color: ${this.color}, maxSpeed: ${this.maxSpeed}, model: ${this.model}`)
    }

    this.changeColor = function(newColor) {
        if (newColor !== this.color) {
            this.color = newColor;
        }
    }
  }
  let car = new Car('Ford Mustang','green', 'V8')
  car.getInfo()
  
  function Motorcycle(model, color, engine) {
    Vehicle.apply(this, [color, engine]);
    this.model = model;
    this.maxSpeed = 90;

    this.getInfo = function() {
        console.log(`engine: ${this.engine}, color: ${this.color}, maxSpeed: ${this.maxSpeed}, model: ${this.model}`)
    }

    this.handleHighSpeed = function() {
        console.log('speed is too high, SLOW DOWN!.');
        if (this.currentSpeed + 30 > this.maxSpeed) {
            console.log('Engine overheating.');
            this.stop();
        }
    }
  }

  let motorcycle = new Motorcycle('Honda','blue', 'V4')
  motorcycle.getInfo();
  motorcycle.drive();
  


