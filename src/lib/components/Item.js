import React, { useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';

const Item = (props) => {

  const item = props.item || {};
  const getItemName = props.getItemName;
  const detailed = props.detailed;
  const handleImgReq = props.handleImgReq;
  const [tooltipShown, setTooltipShown] = useState(false);
  let api = (props.api || '').trim();
  if (api && !/\/$/.test(api)) {
    api += '/';
  }

  const getItemClass = () => {
    let cls = `item w-${item.inv_width} h-${item.inv_height}`;
    if (item.location_id !== 1) {
      cls += ` x-${item.position_x} y-${item.position_y}`;
    }
    return cls;
  };

  const getImgSrc = (item) => {
    const base = `${api}${item.inv_file}.png`;
    return item.inv_transform && item.transform_color
      ? `${base}?inv_transform=${item.inv_transform}&transform_color=${item.transform_color}`
      : base;
  };

  // http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever
  const tinySrc = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

  const ItemImg = (props) => {
    const item = props.item;
    const imgRef = useRef();
    const reqSrc = getImgSrc(item);
    let src = tinySrc;
    if (api) {
      src = reqSrc;
    }
    else if (handleImgReq) {
      handleImgReq(reqSrc, (resSrc) => {
        imgRef.current?.setAttribute('src', resSrc);
      });
    }
    return (
      <img ref={imgRef} src={src} className={item.ethereal ? 'ethereal' : null} alt="" />
    );
  };

  const Sockets = () => {
    const sockets = [];
    for (let i = 0; i < item.total_nr_of_sockets; i++) {
      sockets.push(<Socket key={i} idx={i} />)
    }
    return (
      <div className="sockets">
        {sockets}
      </div>
    );
  };

  const Socket = (props) => {
    const idx = props.idx;
    return (
      <div style={getSocketStyle(idx + 1)} className={getSocketClass(idx)}>
        {item.socketed_items && item.socketed_items[idx] && <ItemImg item={item.socketed_items[idx]} />}
      </div>
    );
  };

  const getSocketStyle = (idx) => {
    const y = [[50], [25, 75], [5, 50, 95]];
    const x = [[50], [10, 90]];
    const i = idx - 1;
    switch (item.total_nr_of_sockets) {
      case 1:
      case 2:
      case 3: {
        const j = item.total_nr_of_sockets - 1;
        if (item.inv_height > 2 || item.total_nr_of_sockets < 3) {
          return {
            transform: `translateX(-${x[0][0]}%) translateY(-${y[j][i]}%)`,
            top: `${y[j][i]}%`,
            left: `${x[0][0]}%`,
          };
        }
        const k = [y[2][0], y[2][2], y[2][2]];
        const l = [x[0][0], x[1][0], x[1][1]];
        return {
          transform: `translateX(-${l[i]}%) translateY(-${k[i]}%)`,
          top: `${k[i]}%`,
          left: `${l[i]}%`,
        };
      }
      case 4:
      case 6: {
        const j = (item.total_nr_of_sockets / 2) - 1;
        return {
          transform: `translateX(-${x[1][i % 2]}%) translateY(-${y[j][Math.floor(i / 2)]}%)`,
          top: `${y[j][Math.floor(i / 2)]}%`,
          left: `${x[1][i % 2]}%`,
        };
      }
      case 5: {
        const k = [y[2][0], y[2][0], y[2][2], y[2][2], y[2][1]];
        const l = [x[1][0], x[1][1], x[1][0], x[1][1], x[0][0]];
        return {
          transform: `translateX(-${l[i]}%) translateY(-${k[i]}%)`,
          top: `${k[i]}%`,
          left: `${l[i]}%`,
        };
      }
      default: {
        return {};
      }
    }
  };

  const getSocketClass = (idx) => {
    let cls = 'socket';
    if (!item.socketed_items || !item.socketed_items[idx]) {
      cls += ' empty-socket';
    }
    return cls;
  };

  const getItemNameClass = () => {
    if (item.given_runeword) {
      return 'white';
    }
    switch (item.quality) {
      case 1:
        return 'grey';
      case 2:
      case 3:
        return 'white';
      case 4:
        return 'blue';
      case 5:
        return 'green';
      case 6:
        return 'yellow';
      case 7:
        return 'gold';
      case 8:
        return 'orange';
      default:
        return 'white';
    }
  };

  const getStatDescription = (stat) => {
    if (!stat.description || stat.visible === false) {
      return '';
    }
    const ds = stat.description.split('\\n');
    return ds.map((d) => {
      const s = d.replace(/\\(.*?);/gi, (result, match) => `</div><div class="${match}">`);
      return `<div>${s}</div>`;
    }).reverse().join('');
  };

  const name = item.htmlDisplayName;
  const nameCls = getItemNameClass();

  const getTip = () => {
    let tip = `<div class="${nameCls}">${name}</div>`;
    if (item.defense_rating ) {
      tip += `<div>Defense: ${item.defense_rating}</div>`;
    }
    if (item.base_damage) {
      tip += `<div>`;
      if (item.base_damage.mindam && item.base_damage.maxdam) {
        tip += `<div>` +
          `One Hand Damage: ${item.base_damage.mindam}-${item.base_damage.maxdam}` +
        `</div>`;
      }
      if (item.base_damage.twohandmindam && item.base_damage.twohandmaxdam) {
        tip += `<div>` +
          `Two Hand Damage: ${item.base_damage.twohandmindam}-${item.base_damage.twohandmaxdam}` +
        `</div>`;
      }
      tip += `</div>`;
    }
    if (item.max_durability) {
      tip += `<div>` +
        `Durability: ${item.current_durability} of ${item.max_durability}` +
      `</div>`;
    }
    if (!detailed && item.displayed_combined_magic_attributes?.length) {
      tip += `<div>`;
      item.displayed_combined_magic_attributes.forEach((stat, idx) => {
        const description = getStatDescription(stat);
        tip += `<div class="blue" key="${idx}">${description}</div>`;
      });
      tip += `</div>`;
    }
    if (detailed) {
      tip += `<div>`;
      if (item.displayed_magic_attributes?.length) {
        tip +=  `<div>`;
        tip +=    `<span class="white">Magic Attributes</span>`;
        item.displayed_magic_attributes.forEach((stat, idx) => {
          const description = getStatDescription(stat);
          tip += `<div class="blue" key="${idx}">${description}</div>`;
        });
      }
      if (item.displayed_runeword_attributes?.length) {
        tip +=  `<div>`;
        tip +=    `<span class="white">Runeword Attributes</span>`;
        item.displayed_runeword_attributes.forEach((stat, idx) => {
          const description = getStatDescription(stat);
          tip += `<div class="blue" key="${idx}">${description}</div>`;
        });
      }
      if (item.socketed_items?.length) {
        tip +=  `<div>`;
        tip +=    `<span class="white">Socketed Items</span>`;
        item.socketed_items.forEach((socket, idx) => {
          const name = getItemName(socket);
          const nameCls = getItemNameClass(socket);
          tip +=  `<div key="${idx}">`;
          tip +=    `<div class="${nameCls}">${name}</div>`;
          if (socket.displayed_magic_attributes?.length) {
            socket.displayed_magic_attributes.forEach((stat, idx) => {
              const description = getStatDescription(stat);
              tip += `<div class="blue" key="${idx}">${description}</div>`;
            });
          }
        });
      }
      if (item.ethereal) {
        tip += `<div class="blue">Etheral</div>`;
      }
      if (item.total_nr_of_sockets) {
        tip += `<div class="blue">Socketed (${item.total_nr_of_sockets})</div>`;
      }
    }
    return tip;
  };

  const mouseEnter = () => { ReactTooltip.hide(); setTooltipShown(true); }
  const mouseLeave = () => { ReactTooltip.hide(); setTooltipShown(false); }
  const tipId = `tip-${item.location_id}-${item.position_x}-${item.position_y}`;

	return (
		<div className="d2s-item">
      {props.text && <div className={nameCls + ' Item_text'} dangerouslySetInnerHTML={{ __html: name }} data-tip={getTip(item)} data-for={tipId} />}
      {!props.text && <div>
        <div className={getItemClass(item) + ' Item_image_container'} data-tip={getTip(item)} data-for={tipId} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
          <ItemImg item={item} />
          {item.total_nr_of_sockets && tooltipShown && <Sockets />}
        </div>
      </div>}
      <ReactTooltip place="left" effect="solid" html={true} id={tipId} />
		</div>
	);
};

export default Item;
