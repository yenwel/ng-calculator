import { Component, OnInit } from '@angular/core';

export interface Number  {
  text: string;
  value: number;
}

export interface Operation {
  text: string;
  symbol: string;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  numbers: Number [] = [
    {text: '1', value: 1},
    {text: '2', value: 2},
    {text: '3', value: 3},
    {text: '4', value: 4},
    {text: '5', value: 5},
    {text: '6', value: 6},
    {text: '7', value: 7},
    {text: '8', value: 8},
    {text: '9', value: 9},
    {text: '0', value: 0},
  ]

  operations: Operation [] = [
    {text: "+", symbol: "+"},
    {text: "*", symbol: "*"},
    {text: ".", symbol: "."},
    {text: "=", symbol: "="},
    {text: "C", symbol: "C"}
  ]

  numberOnStack: number = 0;
  numberDisplayed: number = 0;
  currentSymbol: string = "";
  decimals: number=0;

  constructor() { }

  ngOnInit() {
  }

  onNumber(value: number){
    console.log(`clicked number ${value}`)
    if(this.numberDisplayed == 0)
    {
      this.numberDisplayed = value;
    }
    else if( this.currentSymbol === ".")
    {
      this.numberDisplayed = Number(this.numberDisplayed) + Number(`0.${"0".repeat(this.decimals-1)}${value}`);
      this.decimals++;
    }
    else {
      this.numberDisplayed = (this.numberDisplayed * 10) + value;
    }
  }

  onOperation(symbol: string){    
    console.log(`clicked operation ${symbol}`)
    if(symbol === "+" || symbol === "*" )
    {
      this.numberOnStack = this.numberDisplayed;
      this.numberDisplayed = 0;
      this.currentSymbol = symbol;
    }
    else if(symbol === "C")
    {
      this.numberDisplayed = 0;
      this.numberOnStack = 0;
      this.currentSymbol = "";
      this.decimals = 0;
    }
    else if (symbol === "=")
    {
      if(this.currentSymbol === "+")
      {
        this.numberDisplayed = Number(this.numberDisplayed) + Number(this.numberOnStack)
        this.numberOnStack = 0;
        this.currentSymbol = "";
        this.decimals = 0;
      }
      else if (this.currentSymbol === "*")
      {
        this.numberDisplayed = this.numberDisplayed * this.numberOnStack
        this.numberOnStack = 0;
        this.currentSymbol = "";
        this.decimals = 0;
      }
    }
    else if (symbol === ".")
    {
      this.currentSymbol = symbol;
      this.decimals++;
    }
  }
}
