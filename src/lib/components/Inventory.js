import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import Items from './Items';
import './d2s-ui.css';

const Inventory = (props) => {

  const [detailed, setDetailed] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', detailChange);
    document.addEventListener('keyup', detailChange);
    return () => {
      document.removeEventListener('keydown', detailChange);
      document.removeEventListener('keyup', detailChange);
    }
  }, []);

  const detailChange = (e) => setDetailed(e.ctrlKey);
  const items = props.hero.items.filter(item => item.location_id === 0 && item.alt_position_id === 1);

	return (
		<div className="d2s-hero__component d2s-inventory">
      <div className="d2s-hero__component__name">
			   <h4>{props.headerLabel}</h4>
      </div>
      {props.text && <div>
        Inventory
        <Items items={items} text={true} />
      </div>}
      {!props.text && <Grid width="10" height="4" items={items} detailed={detailed} api={props.api} handleImgReq={props.handleImgReq} />}
		</div>
	);
};

export default Inventory;
