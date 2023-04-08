import React, { useEffect, useState } from 'react';
import Items from './Items';
import './d2s-ui.css';
import './d2s-ui-react.css';

const Equipped = (props) => {

  const altDisplayed = props.altDisplayed;
  const setAltDisplayed = props.setAltDisplayed;
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
  const lu = [
    null, 'head', 'neck', 'torso',
    'right_hand', 'left_hand',
    'right_finger', 'left_finger',
    'waist', 'feet', 'hands',
    'alt_right_hand', 'alt_left_hand'
  ];
  const hero = props.hero;
  const items = (hero.is_dead ? hero.corpse_items : hero.items).filter(item => item.location_id === 1);
  items.map(item => lu[item.equipped_id] && (lu[lu[item.equipped_id]] = item));
  const attrs = { detailed, compact: props.compact };
  const textAttrs = { ...attrs, text: true, items };
  const imgAttrs = { ...attrs, api: props.api, handleImgReq: props.handleImgReq };

	return (
		<div className={'d2s-hero__component' + (props.compact ? ' d2s-hero__component--compact' : '') + ' d2s-equipped'}>
      <div className="d2s-hero__component__name">
			   <h4>{props.headerLabel}</h4>
      </div>
      {props.text && <div>
        Equipped
        <Items {...textAttrs} />
      </div>}
      {!props.text && <div className="inventory">
        <span className="head">
          {lu.head && <Items items={[lu.head]} {...imgAttrs} />}
        </span>
        <span className="neck">
          {lu.neck && <Items items={[lu.neck]} {...imgAttrs} />}
        </span>
        <span className="torso">
          {lu.torso && <Items items={[lu.torso]} {...imgAttrs} />}
        </span>
        <span className="right-tab tabs">
          <span className="tab" onClick={() => setAltDisplayed(false)}>I</span>
          <span className="tab" onClick={() => setAltDisplayed(true)}>II</span>
        </span>
        {!altDisplayed && <span className="right-hand weapon">
          {lu.right_hand && <Items items={[lu.right_hand]} {...imgAttrs} />}
        </span>}
        {altDisplayed && <span className="alt-right-hand weapon">
          {lu.alt_right_hand && <Items items={[lu.alt_right_hand]} {...imgAttrs} />}
        </span>}
        <span className="left-tab tabs">
          <span className="tab" onClick={() => setAltDisplayed(false)}>I</span>
          <span className="tab" onClick={() => setAltDisplayed(true)}>II</span>
        </span>
        {!altDisplayed && <span className="left-hand weapon">
          {lu.left_hand && <Items items={[lu.left_hand]} {...imgAttrs} />}
        </span>}
        {altDisplayed && <span className="alt-left-hand weapon">
          {lu.alt_left_hand && <Items items={[lu.alt_left_hand]} {...imgAttrs} />}
        </span>}
        <span className="right-finger ring">
          {lu.right_finger && <Items items={[lu.right_finger]} {...imgAttrs} />}
        </span>
        <span className="left-finger ring">
          {lu.left_finger && <Items items={[lu.left_finger]} {...imgAttrs} />}
        </span>
        <span className="waist">
          {lu.waist && <Items items={[lu.waist]} {...imgAttrs} />}
        </span>
        <span className="feet">
          {lu.feet && <Items items={[lu.feet]} {...imgAttrs} />}
        </span>
        <span className="hands">
          {lu.hands && <Items items={[lu.hands]} {...imgAttrs} />}
        </span>
      </div>}
		</div>
	);
};

export default Equipped;
