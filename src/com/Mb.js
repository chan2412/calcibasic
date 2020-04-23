import React,{Component} from 'react';
import Button from "@material-ui/core/Button";
export default class Mb extends Component{
	render()
	{return(
		<div>
		<Button variant="contained" color="primary" value='1'>1</Button><t/>
		<Button variant="contained" color="primary" value='2'>2</Button><t/>
		<Button  variant="contained" color="primary" value='3'>3</Button><t/><br/>
		<Button  variant="contained" color="primary" value='4'>4</Button><t/>
		<Button  variant="contained" color="primary" value='5'>5</Button><t/>
		<Button  variant="contained" color="primary"value='6'>6</Button><t/><br/>
		<Button variant="contained" color="primary" value='7'>7</Button><t/>
		<Button variant="contained" color="primary" value='8'>8</Button><t/>
		<Button variant="contained" color="primary" value='9'>9</Button><t/><br/>
		<Button variant="contained" color="primary" value='0'>0</Button><t/>
		<Button variant="contained" color="primary" value='+'>+</Button><t/>
		<Button variant="contained" color="primary" value='-'>-</Button><t/><br/>
		<Button variant="contained" color="primary" value='/'>/</Button><t/>
		<Button variant="contained" color="primary" value='*'>X</Button><t/>
		<Button variant="contained" color="primary" value='%'>%</Button><t/><br/>
		<Button variant="contained" color="primary" value='mod'>mod</Button><t/>
		</div>);
	}
}