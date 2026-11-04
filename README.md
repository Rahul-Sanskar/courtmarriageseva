# Court Marriage Seva — Website Starter

A premium, responsive React + TypeScript website for **Court Marriage Seva** with Home, About Us, Marriage Process, Gallery, Testimonials, Blogs, Contact Us, Privacy and Terms/Disclaimer pages.

**Free stack:** React, Vite, TypeScript, React Router, Lucide icons, custom CSS and native PHP. No paid plugins or UI libraries are required.

## Included

- Premium evergreen, ivory and muted-gold marriage-inspired theme.
- Responsive navigation, motion transitions, reduced-motion support and mobile call/WhatsApp shortcuts.
- Enquiry form on Home and Contact Us.
- PHP endpoint at `api/contact.php`, with basic validation and honeypot anti-spam field.
- Email destination configured in `api/config.php`.
- Gallery lightbox, FAQ accordions, blog categories and responsive layouts.
- SEO description, semantic page structure and route fallback `.htaccess`.
- Privacy and Terms/Disclaimer starter pages.

## 1. Open and run in VS Code

Install Node.js LTS and PHP 8+ (XAMPP is fine on Windows).

Open this folder in VS Code, then run:

```bash
npm install
```

Start the PHP development server in a **first terminal**, from the project root:

```bash
php -S 127.0.0.1:8000
```

Start React/Vite in a **second terminal**:

```bash
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

The Vite config forwards `/api/*` requests to the PHP server on port 8000. If using XAMPP instead, you can copy the project to `htdocs`, but the simplest local setup is to use the PHP built-in server plus Vite as shown above.

## 2. Configure the email recipient

Open `api/config.php` and change:

```php
'recipient_email' => 'replace-with-your-inbox@example.com',
'sender_email' => 'website@courtmarriageseva.com',
```

- `recipient_email`: the real inbox that should receive enquiries.
- `sender_email`: a mailbox on `courtmarriageseva.com` that your hosting/email provider allows as a sender. Create/verify this mailbox in your hosting or email admin first.
- Keep the sender on your own domain. The visitor's email is used as `Reply-To`, not `From`.

The PHP endpoint uses native PHP `mail()`. On shared hosting, this only works if the host's mail service is enabled and correctly configured. If the host blocks `mail()` or delivery is unreliable, configure authenticated SMTP using your hosting mailbox and a maintained PHPMailer installation (PHPMailer is free/open-source), or use your hosting provider's approved mail method. Do not publish mailbox passwords in frontend code or commit them to a public repository.

Test using a real enquiry and check the inbox, spam folder and hosting mail logs. The website only displays success if PHP reports that the message was accepted for sending; this is not a guarantee of inbox delivery.

## 3. Replace the placeholder business details before launch

Search in `src/App.tsx` and replace:
- `+91 98765 43210` with the verified business phone number.
- `919876543210` with the verified WhatsApp number, digits only.
- `info@courtmarriageseva.com` with the correct monitored email address if different.
- Business hours and any other contact details with verified information.

## 4. Replace placeholder images

The images in `src/App.tsx` are remote Unsplash demonstration images. Replace them with real, authorised customer photos/videos before launch. Keep explicit permission records for identifiable people and do not publish legal documents or identity records. The current image links require an internet connection.

For best performance, use optimised WebP/AVIF assets in `public/images/`, update the `photos` object to local paths, and add descriptive alt text.

## 5. Build for hosting

```bash
npm run build
```

Vite outputs the static website to `dist/`.

For typical Apache/cPanel shared hosting:
1. Upload the **contents of `dist/`** to the domain's document root (often `public_html/`).
2. Upload the `api/` directory to the same document root, so `public_html/api/contact.php` and `public_html/api/config.php` exist.
3. Upload `.htaccess` to the document root. If hidden files are not shown, enable “show hidden files” in the file manager.
4. Confirm PHP is enabled and the host allows email sending.
5. Enable HTTPS and test direct page refreshes such as `/about`, `/process`, `/gallery` and `/contact`.

If your host serves a subfolder instead of the domain root, adjust the Vite base path and rewrite rules for that deployment.

## 6. Content and legal checks

- Replace the placeholder testimonials with genuine, consented client feedback; none are fabricated in this starter.
- Add only verified team biographies, credentials, office address, response hours and service claims.
- Review Privacy and Terms/Disclaimer pages with the business/legal reviewer. They are starter text, not legal advice.
- The website clearly distinguishes civil marriage under the Special Marriage Act from registration of an already solemnized marriage. Confirm all service descriptions and current state procedures with a qualified reviewer.
- Do not claim guaranteed approval, a fixed certificate timeline or government affiliation.
- Keep only necessary enquiry data. Do not ask people to send identity-document numbers or sensitive records through the public enquiry form.

## Project structure

```text
court-marriage-seva/
├── api/
│   ├── config.php
│   └── contact.php
├── public/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── .htaccess
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
└── README.md
```

## Important

This is a complete starter website project, but it is not preconfigured with the customer's real contact details, approved gallery assets, final privacy policy, actual client testimonials or a verified email recipient. Configure and test these before publishing.
