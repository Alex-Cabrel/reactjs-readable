  import React, { Component } from 'react'
  import PropTypes from 'prop-types'
  import { Link } from 'react-router-dom'
  import AddIcon from 'react-icons/lib/md/add-circle'

/*This is the Component that renders the available categories 
and provides the possibility for a user to add a post to a category*/
  class Categories extends Component {
    
/*Defining the data types pf te property categories*/
    static propTypes = {
        categories: PropTypes.array.isRequired
    }
/*Reders the available categories with a clickable plus icon giving 
the user the possibility to add a post to the categories*/
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Names of Categories</th>
                        <th>Add a Post to a Category</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.categories.map((category, i) =>
                        <tr key={i}><td>
                            <Link to={'/' + category.name}>{category.name}</Link>
                        </td><td>
                            <Link to={'/' + category.name + '/new'}>
                                <AddIcon size={20} />
                            </Link>
                        </td></tr>)}
                </tbody>
            </table>
        )
    }
  }

  export default Categories