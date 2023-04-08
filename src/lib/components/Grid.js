import React from 'react';
import Items from './Items';

const Grid = (props) => {

  return (
		<div className={`grid w-${props.width} h-${props.height} Grid`}>
      <Items
        items={props.items || []}
        detailed={props.detailed}
        compact={props.compact}
        api={props.api}
        handleImgReq={props.handleImgReq}
      />
		</div>
	);
};

export default Grid;
