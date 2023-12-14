import showModal from './modal';

export default function showWinnerModal(fighter) {

    showModal({ title: 'The winner is', bodyElement: fighter.name });
    
}
