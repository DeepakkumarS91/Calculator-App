import React from 'react';
import Display from './Display';
import {shallow} from 'enzyme';

describe('Tests the Display',()=>
{let wrapper;
    
beforeEach(()=>wrapper=shallow(<Display displayValue= {'0'}/>));

it('Snapshot the Display',()=>{
    expect(wrapper).toMatchSnapshot()
})

it("Checks inside the Display that render <div/>",()=>{
    expect(wrapper.find('div').length).toEqual(1);
});

it("Checks the rendered value",()=>
{
    wrapper.setProps({displayValue:'2'});
    expect(wrapper.text()).toEqual('2')
})
 });