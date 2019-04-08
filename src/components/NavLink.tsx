import * as _ from 'lodash'
import * as React from 'react'
import {NavLinkInterface} from 'src/types/interfaces'

export default (props: NavLinkInterface) => (
  <a href={props.href}>
    {_.has(props, 'icon') ? <i className={`fas fa-${props.icon}`} /> : null}
    <strong>{props.label}</strong>
  </a>
)
