<?php
/**
 * Billing Priority Checkout module.
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

class BillingPriority extends Module
{
    public function __construct()
    {
        $this->name = 'billingpriority';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'ChatGPT';
        $this->need_instance = 0;
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->trans('Billing priority checkout', [], 'Modules.Billingpriority.Admin');
        $this->description = $this->trans('Shows invoice address before delivery address in checkout.', [], 'Modules.Billingpriority.Admin');
        $this->ps_versions_compliancy = ['min' => '1.7.8.0', 'max' => _PS_VERSION_];
    }

    public function install()
    {
        return parent::install()
            && $this->registerHook('actionFrontControllerSetMedia');
    }

    public function uninstall()
    {
        return parent::uninstall();
    }

    public function hookActionFrontControllerSetMedia(array $params)
    {
        if (!isset($this->context->controller) || !isset($this->context->controller->php_self)) {
            return;
        }

        $eligibleControllers = ['order', 'orderopc'];
        if (!in_array($this->context->controller->php_self, $eligibleControllers, true)) {
            return;
        }

        $this->context->controller->registerJavascript(
            $this->name . '-checkout',
            'modules/' . $this->name . '/views/js/checkout.js',
            [
                'priority' => 150,
                'position' => 'bottom',
            ]
        );

        \Media::addJsDef([
            'billingPriorityTranslations' => [
                'differentDelivery' => $this->trans('Use a different delivery address', [], 'Modules.Billingpriority.Shop'),
                'sameDelivery' => $this->trans('Use the same address for delivery', [], 'Modules.Billingpriority.Shop'),
                'invoiceHeading' => $this->trans('Invoice address', [], 'Modules.Billingpriority.Shop'),
                'deliveryHeading' => $this->trans('Delivery address', [], 'Modules.Billingpriority.Shop'),
            ],
        ]);
    }
}
