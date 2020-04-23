import React,{Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import * as Calculator from './calculator-core';
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      formula: [],
      input: '0',
      afterCalculation: false
    }
    this.onDigit = this.onDigit.bind(this);
    this.onOperator = this.onOperator.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onEqual = this.onEqual.bind(this);
    this.onDecimal = this.onDecimal.bind(this);
    this.onParenthesis = this.onParenthesis.bind(this);
    this.onBackspace = this.onBackspace.bind(this);
  }

  onDigit({ target }) {
    const digit = target.innerText;
    const input = this.state.input;

    if (this.state.afterCalculation) {
      this.setState({
        input: digit,
        afterCalculation: false
      });
    } else if (input === '0') {
      this.setState({
        input: digit
      });
    } else if (Calculator.isNotNumber(input)) {
      this.setState({
        input: digit,
        formula: this.state.formula.concat(input)
      });
    } else {
      this.setState({
        input: input.concat(digit)
      });
    }
  }

  onDecimal({ target }) {
    const decimal = target.innerText;
    const input = this.state.input;

    if (this.state.afterCalculation) {
      this.setState({
        input: `0${decimal}`,
        afterCalculation: false
      });
    } else if (Calculator.isNotNumber(input)) {
      this.setState({
        input: `0${decimal}`,
        formula: this.state.formula.concat(input)
      });
    } else if (!input.includes(decimal)) {
      this.setState({
        input: input.concat(decimal),
      });
    }
  }

  onOperator({ target }) {
    const operator = target.innerText;
    const input = this.state.input;

    if (Calculator.isOperator(input)) {
      this.setState({
        input: operator,
        afterCalculation: false
      });
    } else if (input !== '(') {
      this.setState({
        formula: this.state.formula.concat(this.state.input),
        input: operator,
        afterCalculation: false
      });
    }
  }

  onParenthesis({ target }) {
    const parenthesis = target.innerText;
    const input = this.state.input;

    if (parenthesis === '(') {
      if ((Calculator.isNumber(input) && input !== '0') ||
        (Calculator.isNumber(input) && input === '0' && this.state.formula.length > 0) ||
        input === ')') {
        this.setState({
          input: parenthesis,
          formula: this.state.formula.concat([input, '*']),
          afterCalculation: false
        });
      } else if (Calculator.isOperator(input) || input === '(') {
        this.setState({
          input: parenthesis,
          formula: this.state.formula.concat(input),
          afterCalculation: false
        });
      } else if (Calculator.isNumber(input) && input === '0' && this.state.formula.length === 0) {
        this.setState({
          input: parenthesis,
          afterCalculation: false
        });
      }
    } else {
      const arrayOpenParenthesis = this.state.formula.join("").match(/\(/g);
      const numOpenParenthesis = arrayOpenParenthesis ? arrayOpenParenthesis.length : 0;

      const arrayCloseParenthesis = this.state.formula.join("").match(/\)/g);
      const numCloseParenthesis = arrayCloseParenthesis ? arrayCloseParenthesis.length : 0;

      if ((Calculator.isNumber(input) || input === ')') && numOpenParenthesis > 0 && numOpenParenthesis > numCloseParenthesis) {
        this.setState({
          input: parenthesis,
          formula: this.state.formula.concat(input),
          afterCalculation: false
        });
      }
    }
  }

  onClear() {
    this.setState({
      formula: [],
      input: '0',
      afterCalculation: false
    });
  }

  onBackspace() {
    const input = this.state.input;
    const formula = this.state.formula;
    const currentInputLength = input.length;

    if (input === 'Infinity' || input === '-Infinity' || input === 'NaN') {
      this.setState({
        input: '0',
        afterCalculation: false
      });
    } else if (currentInputLength > 1) {
      this.setState({
        input: input.slice(0, currentInputLength - 1),
        afterCalculation: false
      });
    } else if (input !== '0') {
      this.setState({
        input: '0',
        afterCalculation: false
      });
    } else if (formula.length > 0) {
      this.setState({
        input: formula[formula.length - 1],
        formula: formula.slice(0, formula.length - 1),
        afterCalculation: false
      });
    }
  }

  onEqual() {
    const finalFormula = this.state.formula.concat(this.state.input);
    const result = Calculator.evaluate(finalFormula);

    if (!Number.isNaN(result)) {
      const newHistoryItem = {
        formula: finalFormula,
        result: result
      }

      this.setState({
        input: result + "",
        formula: [],
        history: [].concat(newHistoryItem, this.state.history),
        afterCalculation: true
      });
    }
  }

  onHistory() {
    this.setState({
      isShowHistory: !this.state.isShowHistory
    });
  }

  onClearHistory() {
    this.setState({
      history: []
    });
  }

  onHistoryItemClicked({ target }) {
    const number = target.getAttribute("value");
    const input = this.state.input;

    if (Calculator.isNumber(input)) {
      this.setState({
        input: number
      });
    } else {
      this.setState({
        input: number,
        formula: this.state.formula.concat(input)
      });
    }
  }
  render() {
    return (

      <div><AppBar variant="contained" color="secondary" style={{
background:"linear-gradient(45deg, #06beb6 60%, #48b1bf 70%)"}}><h2>CALCULATOR</h2></AppBar><br/>
    <br/>
<br/><br/>
<Container fixed style={{background:"linear-gradient(45deg, #06beb6 60%, #48b1bf 70%)" ,
position:"absolute",border:"solid",paddingTop:"50px",paddingLeft:"25px",paddingRight:"0px",width:"320px"}}>

        <div className="calculator">
        <div className="display-toolbar">
        <form className="display">
          <TextField variant="outlined" type="number" className="display-formula" id="f"  value={this.state.formula} ></TextField>
          <TextField variant="outlined" type="number" className="display-input" id="display" rows="1"  value={this.state.input}></TextField>
        </form>
        <div className="toolbar">
                  <div>
            <span className="toolbar-item" onClick={this.state.onBackspace} id="backspace"><i className="fas fa-backspace"></i></span>
          </div>
        </div>
      
<div className="buttons">
        <Button variant="outlined" id="parenthesis-open" onClick={this.onParenthesis}>(</Button>
        <Button variant="outlined" id="parenthesis-close" onClick={this.onParenthesis}>)</Button>
        <Button variant="outlined" id="modulo" onClick={this.onOperator}>%</Button>
        <Button variant="outlined" id="clear" onClick={this.onClear}>AC</Button>
<br/>
        <Button variant="outlined" id="seven" onClick={this.onDigit}>7</Button>
        <Button variant="outlined" id="eight" onClick={this.onDigit}>8</Button>
        <Button variant="outlined" id="nine" onClick={this.onDigit}>9</Button>
        <Button variant="outlined" id="divide" onClick={this.onOperator}>/</Button>
<br/>
        <Button variant="outlined" id="four" onClick={this.onDigit}>4</Button>
        <Button variant="outlined" id="five" onClick={this.onDigit}>5</Button>
        <Button variant="outlined" id="six" onClick={this.onDigit}>6</Button>
        <Button variant="outlined" id="multiply" onClick={this.onOperator}>*</Button>
<br/>
        <Button variant="outlined" id="one" onClick={this.onDigit}>1</Button>
        <Button variant="outlined" id="two" onClick={this.onDigit}>2</Button>
        <Button variant="outlined" id="three" onClick={this.onDigit}>3</Button>
        <Button variant="outlined" id="subtract" onClick={this.onOperator}>-</Button>
<br/>
        <Button variant="outlined" id="zero" onClick={this.onDigit}>0</Button>
        <Button variant="outlined" id="decimal" onClick={this.onDecimal}>.</Button>
        <Button variant="outlined" id="equals" onClick={this.onEqual}>=</Button>
        <Button variant="outlined" id="add" onClick={this.onOperator}>+</Button>
      </div>
        </div>
        </div></Container></div>
    )
  }
}
export default App;