import React from 'react';
import {shallow,mount} from 'enzyme';
import Calculator from './Calculator';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';


describe('Gonna test Calculator',()=>{
    let wrapper;
    beforeEach(()=>wrapper=shallow(<Calculator/>));

    it('To add Snapshot',()=>{
        expect(wrapper).toMatchSnapshot();
    })

    it('Check for Display and Keypad Component',()=>
    expect(wrapper.containsAllMatchingElements(
    [<Display displayValue={wrapper.instance().state.displayValue}/>,
    <Keypad 
    numbers={wrapper.instance().state.numbers}
    operators={wrapper.instance().state.operators}
    callOperator={wrapper.instance().callOperator}
    setOperator={wrapper.instance().setOperator}
    updateDisplay={wrapper.instance().updateDisplay}
    />

    ])).toEqual(true));

    it('Tests Calculator Component',()=>{
        expect(wrapper.find('div').length).toEqual(1);
    })
})

describe('Mounted Calculator',()=>{
    let wrapper;
    beforeEach(()=>wrapper=mount(<Calculator/>));
    it('calls the updateDisplay when a number is clicked',()=>{
        const spy=jest.spyOn(wrapper.instance(),'updateDisplay');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        wrapper.find('.number-key').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it('calls setOperator when a operator key is pressed',()=>{
        const spy=jest.spyOn(wrapper.instance(),'setOperator');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        wrapper.find('.operator-key').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);

    })
    it('calls callOperator when the submit key is clicked',()=>{
        const spy=jest.spyOn(wrapper.instance(),'callOperator');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        wrapper.find('.submit-key').simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    })

})

describe('updates the Display',()=>{
    let wrapper;
    beforeEach(()=>wrapper=shallow(<Calculator/>));

    it('updates the display value',()=>{
        wrapper.instance().updateDisplay('5');
        expect(wrapper.state('displayValue')).toEqual('5');
    })
    it('concatenates the values',()=>{
        wrapper.instance().updateDisplay('5');
        wrapper.instance().updateDisplay('0');
        expect(wrapper.state('displayValue')).toEqual('50');
    })
it('eliminates the 0 if its added with other number',()=>{
    wrapper.instance().updateDisplay('0');
    wrapper.instance().updateDisplay('5');
    expect(wrapper.state('displayValue')).toEqual('5');
})
it('prevents multiple instances leading "0"',()=>{
    wrapper.instance().updateDisplay('0');
    wrapper.instance().updateDisplay('0');
    expect(wrapper.state('displayValue')).toEqual('0');
})
it('prevents multiple instances of "."',()=>{
    wrapper.instance().updateDisplay('.');
    wrapper.instance().updateDisplay('.');
    expect(wrapper.state('displayValue')).toEqual('.');
})
it('removes the last char',()=>{
    wrapper.instance().updateDisplay('5');
    wrapper.instance().updateDisplay('0');
    wrapper.instance().updateDisplay('ce');
    expect(wrapper.state('displayValue')).toEqual('5');
})
it('will set displayValue to "0" if the displayValue is equal to to an empty string',()=>{
    wrapper.instance().updateDisplay('ce');
    expect(wrapper.state('displayValue')).toEqual('0');
})


});

describe('set Operator',()=>{
    let wrapper;
    beforeEach(()=>wrapper=shallow(<Calculator/>));

    it('updates the value of selected Operator',()=>{
        wrapper.instance().setOperator('+');
        expect(wrapper.state('selectedOperator')).toEqual('+');
        wrapper.instance().setOperator('/');
        expect(wrapper.state('selectedOperator')).toEqual('/');
    })

    it('updates the storedValue to displayValue',()=>{
        wrapper.setState({displayValue:'5'});
        wrapper.instance().setOperator('+');
        expect(wrapper.state('storedValue')).toEqual('5');
    })
    it('updates the displayValue=0',()=>{
        wrapper.setState({displayValue:'5'});
        wrapper.instance().setOperator('+');
        expect(wrapper.state('displayValue')).toEqual('0');
    })
    it('selectedOperator is not an empty string,does not update storedValue',()=>{
        wrapper.setState({displayValue:'5'});
        wrapper.instance().setOperator('+');
        expect(wrapper.state('storedValue')).toEqual('5');
        wrapper.instance().setOperator('-');
        expect(wrapper.state('storedValue')).toEqual('5');
    })
})

describe('callOperator',()=>{
    let wrapper;
    beforeEach(()=>wrapper=shallow(<Calculator/>));

    it('updates displayValue to sum of storedValue and displayValue',()=>{
        wrapper.setState({storedValue:'3'});
        wrapper.setState({displayValue:'2'});
        wrapper.setState({selectedOperator:'+'});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('5');
    })
    it('updates displayValue to difference of storedValue and displayValue',()=>{
        wrapper.setState({storedValue:'3'});
        wrapper.setState({displayValue:'2'});
        wrapper.setState({selectedOperator:'-'});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('1');
    })
    it('updates displayValue to product of storedValue and displayValue',()=>{
        wrapper.setState({storedValue:'3'});
        wrapper.setState({displayValue:'2'});
        wrapper.setState({selectedOperator:'*'});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('6');
    })
    it('updates displayValue to quotient of storedValue and displayValue',()=>{
        wrapper.setState({storedValue:'3'});
        wrapper.setState({displayValue:'2'});
        wrapper.setState({selectedOperator:'/'});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('1.5');
    })
    it('updates displayValue to "0" if the operation results in Infinity',()=>{
        wrapper.setState({storedValue:'3'});
        wrapper.setState({displayValue:'0'});
        wrapper.setState({selectedOperator:'/'});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');
    })
    it('updates displayValue to "0" if the operation results in NAN',()=>{
        wrapper.setState({storedValue:'3'});
        wrapper.setState({displayValue:'string'});
        wrapper.setState({selectedOperator:'/'});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');
    })
    it('updates displayValue to "0" if selectedOperator does not match cases', () => {
        wrapper.setState({ storedValue: '7' });
        wrapper.setState({ displayValue: '10' });
        wrapper.setState({ selectedOperator: 'string' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');
      });
    it('updates displayValue to "0" if the storedValue or selectedOperator has no value',()=>{
        wrapper.setState({storedValue:''});
        wrapper.setState({displayValue:'10'});
        wrapper.setState({selectedOperator:''});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');
    })
})