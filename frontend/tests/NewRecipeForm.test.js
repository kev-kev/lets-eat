import React from 'react'
import { render } from "@testing-library/react"
import NewRecipeForm from '../src/components/NewRecipeForm'
import RecipeInboxGrid from '../src/components/RecipeInboxGrid'
import GlobalState from '../src/context/GlobalState'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const rootURL = process.env.REACT_APP_API_URL

describe('<NewRecipeForm />', () => {
  const container = shallow(<NewRecipeForm />)
  
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })

  it('should have fields for title, image url, link, and notes ', () => {
    expect(container.find('#title') && container.find('#imgUrl') && container.find('#link') && container.find('#notes'))
    
  })  

  it('should send a post request to /submit successfully')
})