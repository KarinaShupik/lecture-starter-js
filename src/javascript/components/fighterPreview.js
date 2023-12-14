import createElement from '../helpers/domHelper';
import { fightersDetails } from '../helpers/mockData';
import { getFighterInfo } from './fighterSelector';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    const nameElement = createElement({ tagName: 'h3', className: 'fighter-preview___name' });
    nameElement.innerText = `Name: ${fighter.name}`;
    fighterElement.appendChild(nameElement);

    const healthElement = createElement({ tagName: 'p', className: 'fighter-preview___health' });
    healthElement.innerText = `Health: ${fighter.health}`;
    fighterElement.appendChild(healthElement);

    const attackElement = createElement({ tagName: 'p', className: 'fighter-preview___attack' });
    attackElement.innerText = `Attack: ${fighter.attack}`;
    fighterElement.appendChild(attackElement);

    const defenseElement = createElement({ tagName: 'p', className: 'fighter-preview___defense' });
    defenseElement.innerText = `Defense: ${fighter.defense}`;
    fighterElement.appendChild(defenseElement);

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
