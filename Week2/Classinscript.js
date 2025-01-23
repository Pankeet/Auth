class rectangle{
    constructor(h,w,p)
    {
        this.h=h;
        this.w=w;
        this.p=p;
    }
    area() {
        const area2 = () => {
            return this.w;
        }
        console.log(area2());
        return this.h*this.w;
    }
    paint(){
        console.log('Paint is :', this.p);
    }
}

const rec = new rectangle(2,4, "red");
const pc = rec.area();
console.log(pc);
rec.paint();
