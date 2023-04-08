import React, { useEffect, useState } from 'react';
import Items from './Items';
import './d2s-ui.css';
import './d2s-ui-react.css';

const Mercenary = (props) => {

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
    null, 'head', null, 'torso',
    'right_hand', 'left_hand',
  ];
  const items = props.hero.merc_items;
  items.map(item => lu[item.equipped_id] && (lu[lu[item.equipped_id]] = item));
  const attrs = { detailed, compact: props.compact };
  const textAttrs = { ...attrs, text: true, items };
  const imgAttrs = { ...attrs, api: props.api, handleImgReq: props.handleImgReq };

	return (
		<div className={'d2s-hero__component' + (props.compact ? ' d2s-hero__component--compact' : '') + ' d2s-mercenary'}>
      <div className="d2s-hero__component__name">
			   <h4>{props.headerLabel}</h4>
      </div>
      {props.text && <div>
        Mercenary
        <Items {...textAttrs} />
      </div>}
      {!props.text && <div className="inventory">
        <span className="head">
          {lu.head && <Items items={[lu.head]} {...imgAttrs} />}
        </span>
        <span className="torso">
          {lu.torso && <Items items={[lu.torso]} {...imgAttrs} />}
        </span>
        <span className="right-hand weapon">
          {lu.right_hand && <Items items={[lu.right_hand]} {...imgAttrs} />}
        </span>
        <span className="left-hand weapon">
          {lu.left_hand && <Items items={[lu.left_hand]} {...imgAttrs} />}
        </span>
      </div>}
		</div>
	);
};

export default Mercenary;
