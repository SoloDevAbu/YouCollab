import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="pt-28 mx-4 md:mx-16 pb-10">
            {/* Page Title */}
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
                <p className="text-gray-600">Last Updated: 12/02/2025</p>
            </header>

            <div className="bg-white rounded-xl shadow-2px px-8 md:px-16 py-10 my-5 md:my-10">
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                    <p className="text-lg text-gray-700">
                        YouCollab (“we”, “us”, or “our”) is committed to protecting your privacy.
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your personal
                        information when you use our SaaS platform that facilitates seamless collaboration between YouTubers and Editors.
                        By accessing or using YouCollab, you agree to the practices described in this Privacy Policy.
                    </p>
                </section>

                {/* 2. Information We Collect */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                    <h3 className="text-xl font-semibold mb-2">2.1. Personal Information</h3>
                    <ul className="list-disc list-inside ml-4 mb-4 text-lg text-gray-700">
                        <li>Name, email address, and contact information.</li>
                        <li>Account credentials such as username, hashed password, and authentication tokens.</li>
                        <li>User role details (e.g., YouTuber or Editor) and profile data.</li>
                    </ul>
                    <h3 className="text-xl font-semibold mb-2">2.2. Usage Data</h3>
                    <ul className="list-disc list-inside ml-4 mb-4 text-lg text-gray-700">
                        <li>Device information: IP address, browser type, OS, and device identifiers.</li>
                        <li>Log data such as pages visited, time spent, and interactions.</li>
                        <li>Cookies and tracking technologies to enhance your experience.</li>
                    </ul>
                    <h3 className="text-xl font-semibold mb-2">2.3. Third-Party Information</h3>
                    <ul className="list-disc list-inside ml-4 text-lg text-gray-700">
                        <li>Data received from third-party services like YouTube Data API when connecting your channel.</li>
                        <li>Information from cloud storage providers (e.g., AWS S3) related to your video uploads.</li>
                    </ul>
                </section>

                {/* 3. How We Use Your Information */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                    <ul className="list-disc list-inside ml-4 text-lg text-gray-700">
                        <li>To provide, maintain, and improve our services.</li>
                        <li>To personalize your experience and deliver relevant content.</li>
                        <li>To communicate with you regarding updates, promotions, and important notifications.</li>
                        <li>To conduct analytics, research, and monitor performance.</li>
                        <li>To ensure security and comply with legal obligations.</li>
                    </ul>
                </section>

                {/* 4. How We Share Your Information */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">4. How We Share Your Information</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        We do not sell your personal information. We may share your data with trusted third-party service providers,
                        business partners, or as required by law. All third parties are bound by confidentiality agreements and must
                        adhere to our privacy practices.
                    </p>
                </section>

                {/* 5. Security of Your Information */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">5. Security of Your Information</h2>
                    <p className="text-lg text-gray-700">
                        We implement robust security measures including data encryption (SSL/TLS), access controls, and regular security
                        audits to protect your information. We continuously monitor our systems to prevent unauthorized access and
                        ensure the integrity of your data.
                    </p>
                </section>

                {/* 6. Data Retention */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
                    <p className="text-lg text-gray-700">
                        We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy,
                        or as required by law. Once your data is no longer needed, it is securely deleted or anonymized.
                    </p>
                </section>

                {/* 7. Your Rights and Choices */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">7. Your Rights and Choices</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Depending on your jurisdiction, you may have rights regarding your personal data, including the right to access,
                        correct, delete, or restrict its use. You can opt out of marketing communications and request data portability
                        in a structured, commonly used, and machine-readable format.
                    </p>
                </section>

                {/* 8. International Transfers */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">8. International Transfers</h2>
                    <p className="text-lg text-gray-700">
                        Your information may be transferred to and maintained on servers located outside your country. We take appropriate
                        measures to ensure that your data receives an adequate level of protection in accordance with this Privacy Policy.
                    </p>
                </section>

                {/* 9. Third-Party Links */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">9. Third-Party Links</h2>
                    <p className="text-lg text-gray-700">
                        Our service may contain links to third-party websites. We are not responsible for the privacy practices or content of
                        these sites. We encourage you to review the privacy policies of any third-party sites you visit.
                    </p>
                </section>

                {/* 10. Contact Information */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
                    <p className="text-lg text-gray-700">
                        If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
                        <strong>privacy@youcollab.com</strong> or at our office address.
                    </p>
                </section>

                {/* 11. Changes to This Privacy Policy */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
                    <p className="text-lg text-gray-700">
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
                        Policy on this page with a revised “Last Updated” date. We encourage you to review this policy periodically.
                    </p>
                </section>
            </div>
            {/* 1. Introduction */}
        </div>
    );
};

export default PrivacyPolicy;