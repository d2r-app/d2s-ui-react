import React from 'react';
import Item from './Item';

const Items = (props) => {

  const items = props.items;
  const itemAttrs = { ...props, items: null, getItemName };

  const htmlRegex = new RegExp('<(?:"[^"]*"[\'"]*|\'[^\']*\'[\'"]*|[^\'">])+>', 'g');
  for (const item of items) {
    item.htmlDisplayName = getItemName(item);
    item.displayName = item.htmlDisplayName.replace(htmlRegex, '');
  }

  if (props.text) {
    items.sort((a, b) => a.displayName.localeCompare(b.displayName));
  }

  function getItemName(item) {
    let name = `<span class="d2s-item__type">${item.type_name}</span>`;
    if (item.magic_prefix_name) {
      name = `${item.magic_prefix_name} ${name}`;
    }
    if (item.magic_suffix_name) {
      name = `${name} ${item.magic_suffix_name}`;
    }
    if (item.rare_name) {
      name = `${item.rare_name} ${name}`;
    }
    if (item.rare_name2) {
      name = `${name} ${item.rare_name2}`;
    }
    const personalizedName = item.personalized_name ? `${item.personalized_name}'s ` : '';
    if (item.set_name) {
      name = `${name}\\n${personalizedName}${item.set_name}`;
    }
    if (item.unique_name) {
      name = `${name}\\n${personalizedName}${item.unique_name}`;
    }
    if (item.runeword_name) {
      const runes = item.socketed_items.map(e => e.type_name.split(' ')[0]).join('');
      name = `\\gold;'${runes}'\\n${name}\\n\\gold;${personalizedName}${item.runeword_name}`;
    }
    return name.split('\\n').map((d) => {
      const s = d.replace(/\\(.*?);/gi, (result, match) => `</div><div class="${match}">`);
      return `<div class="d2s-item__name-part">${s}</div>`;
    }).reverse().join('').replace(/<div( class="[^"]*")?><\/div>/g, '');
  }

  function getItemKey(item, index) {
    if (item.id) {
      return item.id;
    }
    if (typeof item.location_id !== 'undefined' && typeof item.position_x !== 'undefined' && typeof item.position_y !== 'undefined') {
      return `${item.location_id}-${item.position_x}-${item.position_y}`;
    }
    return index;
  }

	return (
		<div className="d2s-items">
      {props.text && <ul className="d2s-items__ul">
        {items.map((item, index) =>
          <li key={getItemKey(item, index)}>
            <Item item={item} text={true} detailed={props.detailed} compact={props.compact} />
          </li>
        )}
      </ul>}
      {!props.text && <div>
        {items.map((item, index) => <Item key={getItemKey(item, index)} item={item} {...itemAttrs} />)}
      </div>}
		</div>
	);
};

export default Items;
