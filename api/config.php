<?php
/*
 * Court Marriage Seva — enquiry form email configuration.
 * Enquiries submitted via the website are delivered to recipient_email.
 * sender_email must be a mailbox on the same hosting domain so PHP mail()
 * is accepted by Hostinger's mail server without authentication errors.
 */
return [
    'recipient_email' => 'sunil.upadhyay@courtmarriageseva.com',
    'sender_email'    => 'sunil.upadhyay@courtmarriageseva.com',
    'sender_name'     => 'Court Marriage Seva Website',
];
