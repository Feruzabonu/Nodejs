const fs = require("fs/promises");
const path = require("path");

class Ombor{
    constructor(method, name, count ){
        this.method = method;
        this.name = name;
        this.count = count;
    }

        //    Main methods

    async dash(){
        let products = await this.#read();
        if(products.length==0){console.log("Omborda mahsulot mavjud emas")}
        else{console.table(products)}
    }

    async dep(){
        let products = await this.#read();
        if(products.length == 0){
            await this.#newProduct()
        }else{
        let flag = await this.#checkProduct();
        if(!flag){
           await this.#newProduct()
        }else{
            products.find( p => p.name.toLowerCase() === this.name.toLowerCase() &&
            ( p.count = Number(this.count)+Number(p.count), 
            p.total = Number(this.count)+Number(p.total), true ) );
    
            await fs.writeFile(
                path.join(__dirname, "db.json"), JSON.stringify({products: products})
            )
        }
        }  }
        
        
    async sell(){
        let products = await this.#read();
        if(products.length == 0){
            console.log("Omborda mahsulot mavjud emas!")
        }else{
        let flag = await this.#checkProduct();
        if(!flag){
            console.log("Omborda bunday mahsulot turi mavjud emas!")
        }else{
            products.find( p => p.name.toLowerCase() === this.name.toLowerCase() &&
            Number(p.count)<Number(this.count) ? console.log(`Omborda ushbu mahsulot kam, ${p.count} ta sotishingiz mumkin` ) : 
            ( p.count = Number(p.count)-Number(this.count), 
            p.sell = Number(this.count) + Number(p.sell), true ) 
            );
    
            await fs.writeFile(
                path.join(__dirname, "db.json"), JSON.stringify({products: products})
            )
        }
        } 
    }

            //   Private methods

   async #read(){
    let db = await fs.readFile(path.join(__dirname, "db.json"), "utf-8");
        db = await JSON.parse(db);
        let products = db.products;
        return products
    }

    async #newProduct(){
        let db = await fs.readFile(path.join(__dirname, "db.json"), "utf-8");
        db = await JSON.parse(db);
        let products = db.products;
        let product = {
            id: products.length +1,
            name:this.name,
            count: this.count,
            sell: 0,
            total: this.count
        }

     await products.push(product);

        await fs.writeFile(
            path.join(__dirname, "db.json"), JSON.stringify({products: products})
        )
    }

    async #checkProduct(){
        let db = await fs.readFile(path.join(__dirname, "db.json"), "utf-8");
        db = await JSON.parse(db);
        let products = db.products;
        return  products.find(product=>product.name.toLowerCase()===this.name.toLowerCase()
        ) ? true : false 
    }
  
}

let product1 = new Ombor(process.argv[2], process.argv[3], process.argv[4]);
product1.method == "dev" ? product1.dep() : ""
product1.method == "dash" ? product1.dash() : ""
product1.method == "sell" ? product1.sell() : ""
// product1.dep()
// product1.dash()
// product1.sell()