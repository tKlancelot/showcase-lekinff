export class ModalService {

    constructor() {
    }

    initModals() {
        const modalTriggers = document.querySelectorAll('[data-modal-ref]');
        console.log(`[modalService] ${modalTriggers.length} modal triggers found`);

        modalTriggers.forEach(trigger => {
            const modalId = trigger.getAttribute('data-modal-ref');
            const modal = document.getElementById(modalId);

            if (!modal) {
                console.warn(`[modalService] No modal found with id "${modalId}"`);
                return;
            }

            // ⚠️ Retire les listeners existants avant d'en ajouter
            trigger.replaceWith(trigger.cloneNode(true)); 
            const freshTrigger = document.querySelector(`[data-modal-ref="${modalId}"]`);

            freshTrigger.addEventListener('click', () => {
                const containerSelector = modal.getAttribute('container');
                const container = containerSelector ? document.querySelector(containerSelector) : null;

                if (container && modal.parentElement !== container) {
                    container.appendChild(modal);
                }

                if (typeof modal.open === 'function') {
                    modal.open();
                    freshTrigger.setAttribute('aria-expanded', 'true');
                    console.log(`[modalService] Modal with id "${modalId}" opened`);
                } else {
                    console.warn(`[modalService] Element with id "${modalId}" is not a modal-dialog component`);
                }
            });
        });
    }
}
