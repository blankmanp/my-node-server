import React, { Component } from 'react';

let Body = (props) => <div className={`${props.prefixName}-panel-body panel-body`}>{props.children}</div>;

export default Body;
