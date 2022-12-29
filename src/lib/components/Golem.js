import React, { useEffect, useState } from 'react';
import Items from './Items';
import './d2s-ui.css';

const Golem = (props) => {

  const item = props.hero.golem_item;
  const [detailed, setDetailed] = useState(false);
  const imgCache = {};

  useEffect(() => {
    document.addEventListener('keydown', detailChange);
    document.addEventListener('keyup', detailChange);
    return () => {
      document.removeEventListener('keydown', detailChange);
      document.removeEventListener('keyup', detailChange);
    }
  }, []);

  const detailChange = (e) => setDetailed(e.ctrlKey);
  const lu = [
    null, 'head', null, 'torso',
    'right_hand', 'left_hand',
  ];
  if (lu[item.equipped_id] ) {
    lu[lu[item.equipped_id]] = item;
  }
  const api = props.api;
  const handleImgReq = props.handleImgReq;
  const itemAttrs = { detailed, api, handleImgReq, imgCache };

	return (
		<div className="d2s-hero__component d2s-golem">
      <div className="d2s-hero__component__name">
			   <h4>{props.headerLabel}</h4>
      </div>
      {props.text && <div key={item.id}>
        Golem
        <Items items={[item]} text={true} />
      </div>}
      {!props.text && <div className="inventory">
        <span className="head">
          {lu.head && <Items items={[lu.head]} {...itemAttrs} />}
        </span>
        <span className="torso">
          {lu.torso && <Items items={[lu.torso]} {...itemAttrs} />}
        </span>
        <span className="right-hand weapon">
          {lu.right_hand && <Items items={[lu.right_hand]} {...itemAttrs} />}
        </span>
        <span className="left-hand weapon">
          {lu.left_hand && <Items items={[lu.left_hand]} {...itemAttrs} />}
        </span>
      </div>}
		</div>
	);
};

export default Golem;
