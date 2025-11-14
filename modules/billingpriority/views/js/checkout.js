(function () {
  const READY_STATE_COMPLETE = 'complete';

  function onReady(callback) {
    if (document.readyState === READY_STATE_COMPLETE || document.readyState === 'interactive') {
      callback();
      return;
    }

    document.addEventListener('DOMContentLoaded', callback);
  }

  function getWrapper(element) {
    if (!element) {
      return null;
    }

    const selectors = ['.col-lg-6', '.col-md-6', '.col-sm-12', '.address-selector'];
    for (const selector of selectors) {
      const wrapper = element.closest(selector);
      if (wrapper) {
        return wrapper;
      }
    }

    return element;
  }

  function reorderAddressBlocks() {
    const step = document.querySelector('#checkout-addresses-step .content, #checkout-addresses-step .step-content');
    if (!step) {
      return;
    }

    const invoiceContainer = document.querySelector('#invoice-addresses');
    const deliveryContainer = document.querySelector('#delivery-addresses');

    const invoiceWrapper = getWrapper(invoiceContainer);
    const deliveryWrapper = getWrapper(deliveryContainer);

    if (!invoiceWrapper || !deliveryWrapper || !invoiceWrapper.parentElement || invoiceWrapper === deliveryWrapper) {
      return;
    }

    const parent = invoiceWrapper.parentElement;
    if (deliveryWrapper.previousElementSibling !== invoiceWrapper) {
      parent.insertBefore(invoiceWrapper, deliveryWrapper);
    }
  }

  function reorderVatField(form) {
    if (!form) {
      return;
    }

    const vatInput = form.querySelector('[name="vat_number"]');
    const companyInput = form.querySelector('[name="company"]');

    if (!vatInput || !companyInput) {
      return;
    }

    const vatGroup = vatInput.closest('.form-group, .form-field, .form-floating, .col-md-6');
    const companyGroup = companyInput.closest('.form-group, .form-field, .form-floating, .col-md-6');

    if (!vatGroup || !companyGroup || vatGroup === companyGroup || !companyGroup.parentElement) {
      return;
    }

    if (companyGroup.previousElementSibling === vatGroup) {
      return;
    }

    companyGroup.parentElement.insertBefore(vatGroup, companyGroup);
  }

  function reorderVatFields() {
    const forms = document.querySelectorAll('#checkout-addresses-step form, .js-address-form');
    forms.forEach((form) => reorderVatField(form));
  }

  function updateTextContent(element, text) {
    if (!element || !text) {
      return;
    }

    if (element.textContent === text) {
      return;
    }

    element.textContent = text;
  }

  function updateLabels() {
    const translations = window.billingPriorityTranslations || {};

    updateTextContent(
      document.querySelector('#checkout-addresses-step a[data-link-action="different-invoice-address"]'),
      translations.differentDelivery
    );

    updateTextContent(
      document.querySelector('label[for="use_same_address"]'),
      translations.sameDelivery
    );

    const invoiceHeading = document.querySelector('#invoice-addresses h2, #invoice-addresses h3, #invoice-addresses h4');
    const deliveryHeading = document.querySelector('#delivery-addresses h2, #delivery-addresses h3, #delivery-addresses h4');

    updateTextContent(invoiceHeading, translations.invoiceHeading);
    updateTextContent(deliveryHeading, translations.deliveryHeading);
  }

  let isApplying = false;

  function applyCustomizations() {
    if (isApplying) {
      return;
    }

    isApplying = true;

    try {
      reorderAddressBlocks();
      reorderVatFields();
      updateLabels();
    } finally {
      isApplying = false;
    }
  }

  onReady(() => {
    const body = document.body;
    if (!body || (!body.classList.contains('page-order') && body.id !== 'checkout')) {
      return;
    }

    const step = document.querySelector('#checkout-addresses-step');
    if (!step) {
      return;
    }

    applyCustomizations();

    const observerOptions = {childList: true, subtree: true};
    const observer = new MutationObserver(() => {
      applyCustomizations();
    });

    observer.observe(step, observerOptions);

    if (window.prestashop && typeof window.prestashop.on === 'function') {
      window.prestashop.on('updatedAddressForm', applyCustomizations);
      window.prestashop.on('editAddress', applyCustomizations);
    }
  });
})();
