import React from 'react';
import {shallow} from 'enzyme';
import Key from './Key';

describe('checks for Key component',()=>{
    let wrapper;
    beforeEach(()=>wrapper=shallow(<Key
    keyAction={jest.fn()}
    keyValue={''}
    keyType={''}/>));

    it('should render correctly',()=>expect(wrapper).toMatchSnapshot());

    it('checks for div',()=>{
        expect(wrapper.find('div').length).toEqual(1);
    })

    it('checks for the keyvalue props',()=>{
        wrapper.setProps({keyValue:'test'});
        expect(wrapper.text()).toEqual('test')
    })
})