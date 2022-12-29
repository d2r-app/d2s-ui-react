import React, { useEffect, useState } from 'react';
import Items from './Items';
import './d2s-ui.css';

const Equipped = (props) => {

  const [altDisplayed, setAltDisplayed] = useState(false);
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
    null, 'head', 'neck', 'torso',
    'right_hand', 'left_hand',
    'right_finger', 'left_finger',
    'waist', 'feet', 'hands',
    'alt_right_hand', 'alt_left_hand'
  ];
  props.hero.items.map(item => lu[item.equipped_id] && (lu[lu[item.equipped_id]] = item));
  const items = props.hero.items.filter(item => item.location_id === 1);
  const api = props.api;
  const handleImgReq = props.handleImgReq;
  const itemAttrs = { detailed, api, handleImgReq, imgCache };

	return (
		<div className="d2s-hero__component d2s-equipped">
      <div className="d2s-hero__component__name">
			   <h4>{props.headerLabel}</h4>
      </div>
      {props.text && <div>
        Equipped
        <Items items={items} text={true} />
      </div>}
      {!props.text && <div className="inventory">
        <span className="head">
          {lu.head && <Items items={[lu.head]} {...itemAttrs} />}
        </span>
        <span className="neck">
          {lu.neck && <Items items={[lu.neck]} {...itemAttrs} />}
        </span>
        <span className="torso">
          {lu.torso && <Items items={[lu.torso]} {...itemAttrs} />}
        </span>
        <span className="right-tab tabs">
          <span className="tab" onClick={() => setAltDisplayed(false)}>I</span>
          <span className="tab" onClick={() => setAltDisplayed(true)}>II</span>
        </span>
        {!altDisplayed && <span className="right-hand weapon">
          {lu.right_hand && <Items items={[lu.right_hand]} {...itemAttrs} />}
        </span>}
        {altDisplayed && <span className="alt-right-hand weapon">
          {lu.alt_right_hand && <Items items={[lu.alt_right_hand]} {...itemAttrs} />}
        </span>}
        <span className="left-tab tabs">
          <span className="tab" onClick={() => setAltDisplayed(false)}>I</span>
          <span className="tab" onClick={() => setAltDisplayed(true)}>II</span>
        </span>
        {!altDisplayed && <span className="left-hand weapon">
          {lu.left_hand && <Items items={[lu.left_hand]} {...itemAttrs} />}
        </span>}
        {altDisplayed && <span className="alt-left-hand weapon">
          {lu.alt_left_hand && <Items items={[lu.alt_left_hand]} {...itemAttrs} />}
        </span>}
        <span className="right-finger ring">
          {lu.right_finger && <Items items={[lu.right_finger]} {...itemAttrs} />}
        </span>
        <span className="left-finger ring">
          {lu.left_finger && <Items items={[lu.left_finger]} {...itemAttrs} />}
        </span>
        <span className="waist">
          {lu.waist && <Items items={[lu.waist]} {...itemAttrs} />}
        </span>
        <span className="feet">
          {lu.feet && <Items items={[lu.feet]} {...itemAttrs} />}
        </span>
        <span className="hands">
          {lu.hands && <Items items={[lu.hands]} {...itemAttrs} />}
        </span>
      </div>}
		</div>
	);
};

export default Equipped;
