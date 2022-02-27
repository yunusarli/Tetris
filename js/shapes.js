// Tetris şekillerinin tutulması ve yeniden ayarlanabilmesi


class Shapes{
    constructor(x1,x2,x3,x4){
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
        this.x4 = x4;
        this.row_num = 10; //kolon ve sütun sayısı
        this.step = 1; //atılacak adım sayısı
    }
    get coords(){
        return {
            'x1':this.x1,
            'x2':this.x2,
            'x3':this.x3,
            'x4':this.x4,
                }
    }
    set coords(coord_list){
        let x1 = coord_list[0];
        let x2 = coord_list[1];
        let x3 = coord_list[2];
        let x4 = coord_list[3];
        
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
        this.x4 = x4;
    }
    Draw(collections,records){
        let id;
        let is_break = false//oyun bittiğinde ve gidilecek yer kalmadığında döngüden çıkılması için
        for (let element of collections){
            id = parseInt(element.getAttribute('data-index'))
            if (id == this.x1 || id == this.x2 || id == this.x3 || id == this.x4){
                element.style.backgroundColor = "red";//hareket eden parçanın gittiği her yeri kırmızıya boya
            }else{
                element.style.backgroundColor = "white";
                for (let record of records){
                    //hareket kabiliyeti olmayan parçaları ekranda bırak. Aşağıda kalmış kayıtlı parçalar
                    try {
                        document.getElementById(`box_${record}`).style.backgroundColor="red";
                    } catch (error) {
                        console.log("Game Over!!!");
                        is_break = true;
                        break;
                    }
                    
                }
                if (is_break){
                    break
                }
                
                }
                
            }
        }
       

    MoveDown(records){

            if (this.CondDown() & this.Condboxes(records)){
                this.x1 += this.row_num;
                this.x2 += this.row_num;
                this.x3 += this.row_num;
                this.x4 += this.row_num;
                return this.coords;
            }else{
                return false;
            }
    }
    MoveLeft(){
        
        if (this.CondLeft() & this.CondDown()){//en aşağıda ise hareket edemez
            this.x1 += this.step;
            this.x2 += this.step;
            this.x3 += this.step;
            this.x4 += this.step;
        }
        return this.coords;
    }
    MoveRight(){
        if (this.CondRight() & this.CondDown()){
            this.x1 -= this.step;
            this.x2 -= this.step;
            this.x3 -= this.step;
            this.x4 -= this.step;
        }
        
        return this.coords;
    }

    CondDown(){
        /* Aşağı doğru yapılan hareketin koşulu */
        let cond_down = this.x1 + this.row_num<=99 &
        this.x2+this.row_num<=99 & 
        this.x3+this.row_num<=99 & 
        this.x4+this.row_num<=99;

        return cond_down
    }

    Condboxes(records){
        /* Aşağıda bulunan kutulara çarpmama koşulu 
            herhangi bir köşenin bir sonraki adımı bir diğer kutuya denk geliyorsa, o kutu daha fazla hareket edemez.
        */

        let cond_box =  records.includes(this.x1+10) || 
                        records.includes(this.x2 + 10)||
                        records.includes(this.x3 + 10)||
                        records.includes(this.x4 + 10);
        
        return !cond_box//eğer en az biri bile içermiyorsa

    }

    CondLeft(){
        /* Sol tarafa yapılan hareketlerin koşulu */
        return (this.x1+this.step)%10 != 0 & 
        (this.x2+this.step)%10 != 0 & 
        (this.x3+this.step)%10 != 0 & 
        (this.x4+this.step)%10 != 0;
    }

    CondRight(){
        /* Sağ tarafa yapılan hareketlerin koşulu */

        return this.x1%10 != 0 & 
                this.x2%10 != 0 & 
                this.x3%10 != 0 & 
                this.x4%10 != 0;
    }
}

class LShape extends Shapes {
    constructor(x1,x2,x3,x4){
        super(x1,x2,x3,x4);
        this.direction = 0; 
    }
    get name() {
        return "L-SHAPE"
    }
    Variations(){
        this.direction++;
        let direction = this.direction%4;
        if (direction == 0){
            return [this.x1,this.x2+2,this.x3+4,this.x4+4];
        }else if(direction == 1){
            return [this.x1,this.x2+9,this.x3+18,this.x4+7];

        }else if(direction == 2){
            return [this.x1,this.x2,this.x3,this.x4+2];

        }else if(direction == 3){
            return [this.x1,this.x2-11,this.x3-22,this.x4-13];
        }
    }
}

class SShape extends Shapes {
    constructor(x1,x2,x3,x4){
        super(x1,x2,x3,x4);
        this.direction = 0;
    }
    get name() {
        return "S-SHAPE"
    }
    Variations(){

        this.direction++;
        let direction = this.direction%4;

        if (direction == 0){
            return [this.x1,this.x2,this.x3-20,this.x4-20];

        }else if(direction == 1){
            return [this.x1,this.x2+9,this.x3+20,this.x4+29];

        }else if(direction == 2){
            return [this.x1,this.x2,this.x3-2,this.x4-2];

        }else if(direction == 3){
            return [this.x1,this.x2-9,this.x3+2,this.x4-7];
        }

    }
}

class IShape extends Shapes {
    constructor(x1,x2,x3,x4){
        super(x1,x2,x3,x4);
        this.direction = 0;
    }
    get name() {
        return "I-SHAPE"
    }
    Variations(){
        this.direction++;
        let direction = this.direction%2;
        if (direction == 0){
            return [this.x1,this.x2-9,this.x3-18,this.x4-27];
        }else if(direction == 1){
            return [this.x1,this.x2+9,this.x3+18,this.x4+27];
        }
    }
}

class OShape extends Shapes {
    constructor(x1,x2,x3,x4){
        super(x1,x2,x3,x4);
    }
    get name() {
        return "O-SHAPE";
    }

    Variations(){
        return [this.x1,this.x2,this.x3,this.x4]
    }

}

class TShape extends Shapes{
    constructor(x1,x2,x3,x4){
        super(x1,x2,x3,x4);
        this.direction = 0;//direction pointer
    }

    get name(){
        return "T-Shape";
    }
    Variations(){
        this.direction++;
        let direction = this.direction%4;

        if (direction == 1){
            return [this.x1,this.x2+9,this.x3+20,this.x4+18];
        }else if(direction == 2){
            return [this.x1,this.x2-9,this.x3,this.x4-18];

        }else if(direction == 3){
            return [this.x1,this.x2+9,this.x3-2,this.x4+18];

        }else if(direction == 0){
            return [this.x1,this.x2-9,this.x3-18,this.x4-18];

        }
        
    }

}

class Game{
    constructor(){
        this.collections = Array.prototype.slice.call(document.getElementsByClassName('box'));
        this.coords_records = []
    }
    
    RecreateBoxes(all_shapes){
        /* Random olarak kutu oluşturmak ve bu kutuyu çizdirmek */
        let random_number = Game.Shuffle();
        let random_shape = all_shapes[random_number];
        random_shape.Draw(this.collections,this.coords_records)
        return random_shape
    }
    CoordsRecords(instance){
        /* Verilen koordinatları coords_records'a aktarmak ve güncel hali vermek */
        if (instance != null){
            this.coords_records.push(instance.x1);
            this.coords_records.push(instance.x2);
            this.coords_records.push(instance.x3);
            this.coords_records.push(instance.x4);

        }
        return this.coords_records
    }

    MoveToDown(coord){
        /* Eğer başarı koşulu sağlanırsa ve bir satırdaki kutular silinirse 
            ve bunların altı boş ise, kutuları boşluğa taşıma işlemi.
            Eğer alınan koordinatın altı boş ise onun da bir altına bakılır ve süreç böyle devam eder.
        */
       let look_for = coord

    }

    SpecifyDeletings(){
        /*
        Eğer kazanma koşullarından biri sağlanmışsa bunların silinmesi.
        */
        let specifieds = this.DeleteForWin();
        if ( specifieds != null){
            for (let x of specifieds){
                let index = this.coords_records.indexOf(x);
                this.coords_records.splice(index,1);
                
            }
        }
    
    }

    DeleteForWin(){
        /* 
        Tüm kazanma olasılıklarının bulunduğu bir liste oluşturmak
        ve bu koşulun olup olmasığını kontrol etmek.
        Eğer sağlanmışsa koordinatlarını vermek
        */
        let winning_conds = []
        let counter = 0
        let step = 10
        let arr = []
    
        while (counter <= 100){
            
            if (counter != 0 & counter%step == 0){
                winning_conds.push(arr)
                arr = [];
            }
            arr.push(counter);
            counter ++
        }
        for (let wnng of winning_conds){
            if (Game.ArrIncludes(wnng,this.coords_records)){
                return wnng;
            }
        }
        
    }

    static ArrIncludes(arr,check){
        /* bir array'in toplam arrayler içerisinde olup olmamasını kontrol etmek */
        for (let x of arr){
            if (!check.includes(x)){
                return false;
            }
        }
        return true;
    }

    static Shuffle(){
        /* listenin uzunluğuna göre rastgele bir sayı vermek */
        return parseInt(Math.random()*this.GenerateShape().length);
    }
    static GenerateShape(){
        let lshape = new LShape(4,5,6,16);
        let oshape = new OShape(4,5,14,15);
        let sshape = new SShape(13,14,4,5);
        let ishape = new IShape(3,4,5,6);
        let tshape = new TShape(14,15,5,16);
        let all_shapes = [lshape,oshape,sshape,ishape,tshape];
        return all_shapes;

    }

}







all_shapes = Game.GenerateShape();

let game = new Game();
let sample = game.RecreateBoxes(all_shapes);

document.addEventListener('keypress',(e)=>{
    all_shapes = Game.GenerateShape();

    if (e.key=="a" || e.key == "A"){
        sample.MoveRight();
        sample.Draw(game.collections,game.CoordsRecords());
    }else if (e.key == "s" || e.key == "S"){

        if (!sample.MoveDown(game.CoordsRecords())){
            game.CoordsRecords(sample);
            sample = game.RecreateBoxes(all_shapes);
        }

        game.SpecifyDeletings();
        sample.Draw(game.collections,game.CoordsRecords());

    }else if (e.key=="d" || e.key == "D"){
        sample.MoveLeft();
        sample.Draw(game.collections,game.CoordsRecords());
    }else if(e.key=="w" || e.key == "W"){
        let variation_list = sample.Variations();
        sample.coords = variation_list;
        sample.Draw(game.collections,game.CoordsRecords());
    }
})