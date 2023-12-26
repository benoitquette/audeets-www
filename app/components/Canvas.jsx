import React from "react";
import Title from "@components/Title";
import Text from "@components/Text";
import PropTypes from 'prop-types';

function Canvas(props) {
  return (
    <div>
      <div>
        {props.toolbar !== undefined && (props.toolbar)}
        {props.title !== undefined && (
          <Title text={props.title}/>
        )}
        {props.text !== undefined && (
          <Text text={props.text}/>
        )}
        <div>
          {props.children}
        </div>
      </div>
    </div>
  )
}

Canvas.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
  toolbar: PropTypes.object
};

export default Canvas;
