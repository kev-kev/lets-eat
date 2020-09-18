import React from 'react'
import { render } from "@testing-library/react"
import NewRecipeForm from '../src/components/NewRecipeForm'
import RecipeInboxGrid from '../src/components/RecipeInboxGrid'
import GlobalState from '../src/context/GlobalState'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });



describe('<NewRecipeForm />', () => {
  const container = shallow(<NewRecipeForm />)
  
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })

  it('should have a field for the recipe title', () => {
    expect(container.find('#title'))
  })  

  it('should have a field for the recipe url', () => {
    expect(container.find('#link'))
  })
})