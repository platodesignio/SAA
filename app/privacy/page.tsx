export default function PrivacyPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mt-1">Effective date: June 17, 2026</p>
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-900">Overview</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Statement Audit does not collect, transmit, or store any personal data on external servers.
          All audit history is stored locally on your device and never leaves it.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-900">Data We Do Not Collect</h2>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex gap-2"><span className="text-gray-300 shrink-0">—</span>No account or login required</li>
          <li className="flex gap-2"><span className="text-gray-300 shrink-0">—</span>No name, email, or contact information</li>
          <li className="flex gap-2"><span className="text-gray-300 shrink-0">—</span>No device identifiers or advertising IDs</li>
          <li className="flex gap-2"><span className="text-gray-300 shrink-0">—</span>No location data</li>
          <li className="flex gap-2"><span className="text-gray-300 shrink-0">—</span>No usage analytics or tracking</li>
          <li className="flex gap-2"><span className="text-gray-300 shrink-0">—</span>No text submitted for audit is transmitted to any server</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-900">Local Storage</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Audit history and settings are stored using your browser&apos;s localStorage, which remains
          on your device. This data is never transmitted externally. You can clear it at any time
          from the Settings page within the app.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-900">Third-Party Services</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          The app is served via Vercel. Vercel may collect standard server access logs (IP address,
          request timestamps) as part of their infrastructure. These logs are governed by
          Vercel&apos;s own privacy policy and are not accessed or used by Plato Design.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-900">Children&apos;s Privacy</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Statement Audit does not knowingly collect any information from children under the age of 13.
          No personal data is collected from any user regardless of age.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-900">Changes to This Policy</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          If this policy changes, the updated version will be published at this URL with a new
          effective date.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-900">Contact</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          For privacy questions, contact:{" "}
          <a href="mailto:llcterraio@gmail.com" className="text-accent underline underline-offset-2">
            llcterraio@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
}
