import React, { PureComponent } from 'react'

class StudentItem extends PureComponent {
  render() {
    const { firstName, lastName } = this.props

    return(
        <div>
          <p>"Students first Name =" {firstName}</p>
          <p>"Students lastName =" {lastName}</p>
        </div>

    )
  }
}

export default StudentItem
