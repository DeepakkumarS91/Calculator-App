import React from 'react';
import Keypad from './Keypad';
import {shallow,mount} from 'enzyme';


describe('checking the Keypad component',()=>{
    let wrapper;
    beforeEach(()=>wrapper=shallow(<Keypad numbers={[]}
    operators={[]}
    callOperator={jest.fn()}
    setOperator={jest.fn()}
    updateDisplay={jest.fn()}/>));

    it('Snapshot of the Keypad component',()=>
    expect(wrapper).toMatchSnapshot()
    );

    it('checks for div',()=>
    expect(wrapper.find('div').length).toEqual(4));

    
        it('should render Key compoenent for each instance of numbers,operators and submit',()=>{
            let numbers=['1','2'];
            let operators=['+','-'];
            let submit=1;
            let totalKeys=numbers.length+operators.length+submit;
            wrapper.setProps({numbers,operators});
            expect(wrapper.find('Key').length).toEqual(totalKeys);
        })

    });

   describe('Mounted Keypad', ()=>{
     let wrapper;
     beforeEach(()=>{
        wrapper=mount(
        <Keypad
        numbers={[]}
        operators={[]}
        callOperator={jest.fn()}
        setOperator={jest.fn()}
        updateDisplay={jest.fn()}/>
        ); })

        it('Should render correctly',()=>
        expect(wrapper).toMatchSnapshot()
        );
    

    it('checks for the numbers props value',()=>
    {
        wrapper.setProps({numbers:['1','2','3']});
        expect(wrapper.find('.numbers-container').text()).toEqual('123');
    });

    it('checks for operators',()=>{
        wrapper.setProps({operators:['+','-','*','/']});
        expect(wrapper.find('.operators-container').text()).toEqual('+-*/');
    })    
