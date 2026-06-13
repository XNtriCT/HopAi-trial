import React, { useEffect, useState } from 'react';
import { X, Target, Shield, FileText } from 'lucide-react';

interface FooterModalProps {
   type: 'objectives' | 'privacy' | 'terms' | null;
   onClose: () => void;
}

export function FooterModal({ type, onClose }: FooterModalProps) {
   const [isRendered, setIsRendered] = useState(false);
   const [isAnimated, setIsAnimated] = useState(false);

   useEffect(() => {
      if (type) {
         setIsRendered(true);
         document.body.style.overflow = 'hidden';
         // Trigger fade-in animation in next frame
         const timer = setTimeout(() => setIsAnimated(true), 10);
         return () => clearTimeout(timer);
      } else {
         setIsAnimated(false);
         const timer = setTimeout(() => {
            setIsRendered(false);
            document.body.style.overflow = '';
         }, 300); // Wait for transition to end
         return () => clearTimeout(timer);
      }
   }, [type]);

   if (!isRendered || !type) return null;

   const getTitle = () => {
      switch (type) {
         case 'objectives':
            return 'HOP AI Foundation Objectives';
         case 'privacy':
            return 'Privacy Policy';
         case 'terms':
            return 'Terms of Service';
      }
   };

   const getIcon = () => {
      switch (type) {
         case 'objectives':
            return <Target className="text-primary w-6 h-6 animate-pulse" />;
         case 'privacy':
            return <Shield className="text-primary w-6 h-6 animate-pulse" />;
         case 'terms':
            return <FileText className="text-primary w-6 h-6 animate-pulse" />;
      }
   };

    return (
      <div 
         className={`fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 transition-all duration-300 ${
            isAnimated ? 'bg-black/70 backdrop-blur-md' : 'bg-black/0 backdrop-blur-none pointer-events-none'
         }`}
         onClick={onClose}
         data-lenis-prevent
      >
         <div 
            className={`w-full max-w-4xl max-h-[85vh] bg-background/95 border border-border/80 rounded-3xl flex flex-col shadow-2xl overflow-hidden transition-all duration-300 transform ${
               isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onClick={(e) => e.stopPropagation()}
         >
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-border/60 flex items-center justify-between bg-secondary/10 relative">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                     {getIcon()}
                  </div>
                  <div>
                     <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">
                        {getTitle()}
                     </h2>
                     <p className="text-xs text-muted-foreground mt-0.5">
                        {type === 'objectives' ? 'Strategic Goals & Mission' : 'Effective Date: June 10, 2026'}
                     </p>
                  </div>
               </div>
               
               <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary hover:scale-110 active:scale-95 transition-all duration-200"
                  aria-label="Close modal"
               >
                  <X size={18} />
               </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar font-body select-text" data-lenis-prevent>
               {type === 'objectives' && <ObjectivesContent />}
               {type === 'privacy' && <PrivacyContent />}
               {type === 'terms' && <TermsContent />}
            </div>

            {/* Modal Footer */}
            <div className="p-4 md:p-6 border-t border-border/60 bg-secondary/10 flex justify-end">
               <button 
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white font-semibold shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
               >
                  Close
               </button>
            </div>
         </div>
      </div>
   );
}

function ObjectivesContent() {
   return (
      <div className="text-muted-foreground leading-relaxed text-sm md:text-base space-y-6">
         <div>
            <h3 className="font-display font-bold text-lg md:text-xl text-foreground mb-4 flex items-center gap-2">
               <span className="text-primary text-lg">01.</span> Primary Objectives
            </h3>
            <ol className="space-y-4 list-decimal pl-5">
               <li>
                  <strong className="text-foreground">Technology Capacity Building:</strong> To empower non-governmental organizations (NGOs), civil society organizations (CSOs), and community-based institutions through technology capacity building. This involves strengthening their operational effectiveness, programmatic impact, and long-term stability by facilitating the adoption of advanced and emerging technologies, with a principal focus on Artificial Intelligence (AI) and digital transformation.
               </li>
               <li>
                  <strong className="text-foreground">Train-the-Trainer Model:</strong> To design, develop, and implement a sustainable, scalable "Train-the-Trainer" model. This includes finding, selecting, and providing intensive training to a group of individuals who will serve as certified master trainers. These trainers will then be deployed to deliver high-quality technology training to other organizations and their personnel across various sectors and geographies.
               </li>
               <li>
                  <strong className="text-foreground">Center of Excellence:</strong> To act as a center of excellence and a knowledge hub for the application of AI and emerging technologies in the social sector. We aim to be the go-to resource for using AI and new technologies for social good, ensuring that technology is leveraged ethically and for the public good.
               </li>
            </ol>
         </div>

         <hr className="border-border/40" />

         <div>
            <h3 className="font-display font-bold text-lg md:text-xl text-foreground mb-4">
               Ancillary Objectives
            </h3>
            <div className="space-y-6">
               <div>
                  <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                     I. Training, Capacity Building, and Human Resource Development
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                     <li>To establish and manage training centers, academies, and both physical and virtual learning environments.</li>
                     <li>To create, update, and disseminate comprehensive training curricula on subjects including, but not limited to, Artificial Intelligence, data science, digital literacy, cybersecurity, cloud computing, blockchain, Internet of Things (IoT), and robotics.</li>
                     <li>To create and manage a database of trainees, certified trainers, and technology experts, ensuring compliance with data protection and privacy regulations.</li>
                     <li>To conduct assessments, interviews, and aptitude tests for the selection of training candidates and to issue certifications, digital badges, and accreditations upon successful completion of programs.</li>
                     <li>To organize Train-the-Trainer (ToT) programs focusing on pedagogical skills, curriculum delivery, and facilitation techniques to ensure high standards of training.</li>
                     <li>To provide continuous professional development, mentorship, and create knowledge-sharing networks and alumni communities for all certified trainers.</li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                     II. Technology Implementation, Advisory, and Support Services
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                     <li>To provide technology consulting, advisory, and end-to-end implementation support to partner NGOs, from needs assessment and digital strategy formulation to solution deployment and post-implementation support.</li>
                     <li>To assist organizations in the selection and adoption of relevant software and hardware, including open-source tools, customized solutions, and platforms for management, monitoring, and evaluation.</li>
                     <li>To pilot and test new technology solutions in real-world scenarios to assess their viability and impact before wider dissemination.</li>
                     <li>To provide on-site and remote technical support, troubleshooting, and maintenance services to partner organizations.</li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                     III. Research, Development, and Knowledge Management
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                     <li>To conduct research and study the intersection of technology, AI, and social impact, focusing on adoption patterns, impact assessment, ethical considerations, and emerging trends.</li>
                     <li>To publish and disseminate research findings through reports, white papers, case studies, policy briefs, and academic journals.</li>
                     <li>To develop, own, license, and distribute intellectual property such as software, frameworks, educational content, and proprietary tools that support the Foundation's mission.</li>
                     <li>To establish and maintain a comprehensive knowledge management system, including digital libraries, repositories of best practices, open-source resources, and toolkits.</li>
                     <li>To organize, host, and participate in conferences, seminars, workshops, hackathons, and webinars at local, national, and international levels.</li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                     IV. Partnership, Collaboration, and Network Building
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                     <li>To build strategic partnerships with technology companies, academic institutions, research centers, government bodies, funding agencies, and other non-profit organizations worldwide.</li>
                     <li>To create a multi-stakeholder ecosystem that fosters collaboration, resource sharing (including financial, technical, and human resources), and joint program development.</li>
                     <li>To engage with corporate entities to develop Corporate Social Responsibility (CSR) partnerships, employee volunteering programs, and pro-bono technical support initiatives.</li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                     V. Content Development and Dissemination
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                     <li>To create, translate, and distribute a wide range of educational and informational materials in multiple languages and accessible formats, including manuals, video tutorials, e-learning modules, podcasts, and multimedia content.</li>
                     <li>To maintain an online presence. Establish, maintain, and operate websites, mobile applications, online learning platforms, and other digital communication channels to disseminate information and provide access to resources.</li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                     VI. Advocacy, Policy, and Ethical Governance
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                     <li>To engage in policy advocacy to promote the ethical and inclusive use of technology in the social sector, influencing government policies, and contributing to the development of regulatory frameworks for AI and data protection.</li>
                     <li>To develop and promote ethical guidelines, standards, and frameworks for the responsible use of AI, addressing issues such as algorithmic bias, data privacy, and digital inclusion.</li>
                     <li>To represent the interests of technology-enabled NGOs in national and international forums, committees, and policy-making bodies.</li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                     VII. Financial and Operational Sustainability
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                     <li>To raise funds and accept grants, donations, sponsorships, and contributions in cash or in kind from individuals, corporations, trusts, governments (national and international), and other funding agencies, subject to the laws of the land.</li>
                     <li>To generate revenue through ancillary activities such as providing fee-based premium training, consulting services, licensing of intellectual property, and organizing paid events, with all income being applied solely towards the promotion of the Foundation's charitable objectives.</li>
                     <li>To invest and manage the funds and assets of the Foundation in a manner consistent with its non-profit status and as permitted by law.</li>
                     <li>To acquire, by purchase, lease, exchange, or otherwise, any movable or immovable property, and to construct, alter, and maintain any buildings or infrastructure necessary for carrying out the Foundation's work.</li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                     VIII. General and Miscellaneous Activities
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                     <li>To establish regional centers, branch offices, and operational hubs in any part of the world to further the Foundation's objectives.</li>
                     <li>To provide humanitarian relief and disaster response support by deploying technology, AI-driven tools, and trained personnel during emergencies and crises.</li>
                     <li>To create or support incubators, accelerators, and innovation labs to foster the development of new technology-for-good ventures and solutions.</li>
                     <li>To enter into any arrangement or joint venture with any other entity, whether for-profit or non-profit, for the purpose of achieving the Foundation's objectives.</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
}

function PrivacyContent() {
   return (
      <div className="text-muted-foreground leading-relaxed text-sm md:text-base space-y-6">
         <div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">Introduction</h3>
            <p>
               HOP AI Foundation ("Foundation", "we", "us", or "our") is a Kerala-based Section 8 non-profit organisation dedicated to bridging the technology gap for the social sector (CIN: U85500KL2026NPL101861, Registered Address: Building No 58/1518(1), Alu ninna Vila, Poonkulam, Thiruvananthapuram, Kerala, India – 695522). We empower non-governmental organisations (NGOs), civil society organisations (CSOs), and community-based institutions through AI capacity building, digital transformation, and ethical technology research.
            </p>
            <p className="mt-2">
               This Privacy Policy explains how we collect, use, store, share, and protect your personal information when you interact with our website, programs, training activities, events, and services. We are committed to responsible data practices aligned with our core values of Human-Centered Innovation, Ethical AI, Accessibility, Inclusion, and Collaboration.
            </p>
            <p className="mt-2">
               By using our website or participating in our programs, you agree to the terms of this Privacy Policy. Please read it carefully. If you do not agree, you should discontinue use of our services.
            </p>
         </div>

         <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">1. Information We Collect</h3>
            <div>
               <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">1.1 Information You Provide Directly</h4>
               <ul className="list-disc pl-5 space-y-1">
                  <li>Name, email address, phone number, and organisational affiliation when you register for training programs, workshops, or events.</li>
                  <li>Professional background, designations, and sector information provided during applications or intake forms.</li>
                  <li>Communication data when you contact us via email, phone, or contact forms.</li>
                  <li>Feedback, survey responses, and assessment data from training evaluations.</li>
                  <li>Financial information (where applicable) for fee-based programs, such as billing details — processed securely through authorised payment gateways.</li>
               </ul>
            </div>
            <div>
               <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">1.2 Information Collected Automatically</h4>
               <ul className="list-disc pl-5 space-y-1">
                  <li>Device information including IP address, browser type, operating system, and device identifiers.</li>
                  <li>Usage data such as pages visited, time spent, referral sources, and interaction patterns on our website.</li>
                  <li>Cookies and similar tracking technologies (see Section 7 for details).</li>
               </ul>
            </div>
            <div>
               <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">1.3 Information from Third Parties</h4>
               <ul className="list-disc pl-5 space-y-1">
                  <li>Partner NGOs or event co-organisers may share participant information with us for joint programs.</li>
                  <li>Social media platforms may share interaction data when you engage with our official pages.</li>
                  <li>Technology platform providers used for online learning, event registration, or communication.</li>
               </ul>
            </div>
         </div>

         <div className="space-y-3">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">2. How We Use Your Information</h3>
            <p>We process your personal information for the following purposes, grounded in legitimate interests and fulfilment of our non-profit mission:</p>
            <ul className="list-disc pl-5 space-y-1.5">
               <li><strong className="text-foreground">Program Delivery:</strong> To register you for and administer training programs, workshops, hackathons, and events.</li>
               <li><strong className="text-foreground">Certification & Credentialing:</strong> To assess eligibility, conduct evaluations, and issue certifications and digital badges.</li>
               <li><strong className="text-foreground">Communication:</strong> To send program updates, newsletters, policy briefs, and relevant announcements. You may opt out at any time.</li>
               <li><strong className="text-foreground">Research & Impact Assessment:</strong> To conduct anonymised or aggregated analysis of technology adoption and training impact in the social sector.</li>
               <li><strong className="text-foreground">Knowledge Management:</strong> To maintain our database of trainees, certified trainers, and technology experts, ensuring program continuity and quality.</li>
               <li><strong className="text-foreground">Legal & Regulatory Compliance:</strong> To comply with applicable laws, respond to lawful requests, and fulfil our statutory obligations.</li>
               <li><strong className="text-foreground">Improvement of Services:</strong> To analyse usage patterns and feedback to enhance our website, training content, and service delivery.</li>
               <li><strong className="text-foreground">Partnerships & Fundraising:</strong> To share relevant information with partner organisations, funding agencies, and donors in support of our charitable objectives.</li>
            </ul>
            <p className="mt-2 text-sm italic">We do not sell, rent, or trade your personal information to any third party for commercial purposes.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">3. Legal Basis for Processing</h3>
            <p>
               As an organisation operating under Indian law (including the Information Technology Act, 2000, the IT (Amendment) Act, 2008, and applicable data protection principles), we process your data on the following grounds:
            </p>
            <ul className="list-disc pl-5 space-y-1">
               <li><strong className="text-foreground">Consent:</strong> Where you have provided explicit consent, such as subscribing to our newsletter or participating in research.</li>
               <li><strong className="text-foreground">Contractual Necessity:</strong> Where processing is necessary to deliver a service or program you have enrolled in.</li>
               <li><strong className="text-foreground">Legitimate Interests:</strong> For purposes consistent with our non-profit mission, such as internal research and communication with stakeholders.</li>
               <li><strong className="text-foreground">Legal Obligation:</strong> Where we are required to process data under applicable law.</li>
            </ul>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">4. Sharing of Information</h3>
            <p>We may share your personal information with:</p>
            <ul className="list-disc pl-5 space-y-1">
               <li>Certified Master Trainers and Facilitators who deliver programs on our behalf, under strict confidentiality obligations.</li>
               <li>Technology Platform Providers (e.g., learning management systems, video conferencing tools, email services) who process data on our instructions as data processors.</li>
               <li>Partner NGOs, CSOs, and Co-organisers for joint programs or events, with appropriate data sharing agreements in place.</li>
               <li>Funding Agencies and Donors who may require anonymised participant data for grant reporting purposes.</li>
               <li>Government Bodies and Regulatory Authorities where required by law or in response to lawful requests.</li>
               <li>Academic and Research Institutions for collaborative research, strictly in anonymised or aggregated form.</li>
            </ul>
            <p className="mt-2 text-sm">Any third party receiving personal data is required to maintain its confidentiality and use it only for the purposes for which it was shared.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">5. Data Retention</h3>
            <p>We retain your personal information only for as long as necessary to fulfil the purposes described in this Policy, including:</p>
            <ul className="list-disc pl-5 space-y-1">
               <li><strong className="text-foreground">Training records and certifications:</strong> Retained for the lifetime of the Foundation to maintain the integrity of our credentialing system.</li>
               <li><strong className="text-foreground">Communication data:</strong> Retained for up to 3 years following your last interaction with us.</li>
               <li><strong className="text-foreground">Financial records:</strong> Retained in accordance with applicable statutory requirements (typically 7 years).</li>
               <li><strong className="text-foreground">Website usage data:</strong> Retained for up to 12 months in anonymised or aggregated form.</li>
            </ul>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">6. Data Security</h3>
            <p>We implement industry-standard technical and organisational measures to protect your personal information, including:</p>
            <ul className="list-disc pl-5 space-y-1">
               <li>Encryption of data in transit and at rest where applicable.</li>
               <li>Access controls and role-based permissions to limit data access to authorised personnel only.</li>
               <li>Regular security reviews and updates to our systems and platforms.</li>
               <li>Staff awareness and training on data protection responsibilities.</li>
            </ul>
            <p className="mt-2 text-sm italic">While we take every reasonable precaution, no transmission over the internet or electronic storage is completely secure. We encourage you to exercise caution when sharing personal information online.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">7. Cookies and Tracking Technologies</h3>
            <p>
               Our website uses cookies and similar technologies to improve your browsing experience. These include essential cookies (required for basic functionality), analytics cookies (used to understand visitor interaction, e.g. Google Analytics), and preference cookies (to remember settings). You may control cookies through your browser settings, though disabling them may affect website functionality. We do not use cookies for targeted advertising.
            </p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">8. Your Rights</h3>
            <p>Subject to applicable law, you have the right to access, correct, delete, or object to the processing of your personal data, as well as the right to withdraw consent at any time. To exercise these rights, please email us at <a href="mailto:foundation.hopai@gmail.com" className="text-primary hover:underline">foundation.hopai@gmail.com</a>.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">9. Children's Privacy</h3>
            <p>
               Our programs are directed at adults and organisations. We do not knowingly collect personal information from individuals below 18 without parental/guardian consent. If we inadvertently collect such data, we will delete it promptly upon notification.
            </p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">10. Links to Third-Party Websites</h3>
            <p>Our website may contain links to third-party sites. We are not responsible for their privacy practices and encourage you to review their policies.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">11. Changes to This Privacy Policy</h3>
            <p>We may update this Privacy Policy from time to time. The updated policy will be posted with a revised effective date. Continued use of our services constitutes acceptance of the updated policy.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">12. Contact Us</h3>
            <p>For questions or concerns, please contact us at:</p>
            <div className="p-4 bg-secondary/15 rounded-2xl border border-border/40 text-sm space-y-1 text-foreground">
               <p className="font-bold">HOP AI Foundation</p>
               <p>Building No 58/1518(1), Alu ninna Vila, Poonkulam, Thiruvananthapuram, Kerala, India – 695522</p>
               <p>Email: <a href="mailto:foundation.hopai@gmail.com" className="text-primary hover:underline">foundation.hopai@gmail.com</a></p>
               <p>Phone: +91 80754 61489</p>
            </div>
         </div>
      </div>
   );
}

function TermsContent() {
   return (
      <div className="text-muted-foreground leading-relaxed text-sm md:text-base space-y-6">
         <div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">Acceptance of Terms</h3>
            <p>
               These Terms of Service ("Terms") govern your access to and use of the website, programs, training services, events, digital platforms, publications, and resources provided by HOP AI Foundation ("Foundation", "we", "us", or "our"), a Section 8 non-profit company incorporated under the Companies Act, 2013, with CIN U85500KL2026NPL101861 (Registered Address: Building No 58/1518(1), Alu ninna Vila, Poonkulam, Thiruvananthapuram, Kerala, India – 695522).
            </p>
            <p className="mt-2">
               By accessing our website, registering for a program, attending an event, or using any of our services, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must not access or use our services.
            </p>
            <p className="mt-2">
               These Terms apply to all visitors, participants, partner organisations, trainers, volunteers, donors, and other users of our services. HOP AI Foundation reserves the right to update these Terms at any time, and continued use of services constitutes acceptance of the revised Terms.
            </p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">1. About HOP AI Foundation</h3>
            <p>
               HOP AI Foundation is a Kerala-based non-profit organisation whose mission is to empower NGOs, CSOs, and community-based institutions through AI capacity building, digital transformation consulting, and ethical technology research.
            </p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">2. Eligibility</h3>
            <p>Our services are available to representatives of NGOs/CSOs, individual professionals, researchers, students, volunteers in the social sector, and corporate entities participating through CSR. You must be at least 18 years of age to access our services independently. We reserve the right to refuse access to any individual or organisation whose participation conflicts with our values, objectives, or applicable law.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">3. Registration and User Accounts</h3>
            <p>When registering, you agree to provide accurate and complete information, maintain credentials confidentiality, and accept responsibility for all activities under your account. Suspected unauthorized use must be reported immediately to <a href="mailto:foundation.hopai@gmail.com" className="text-primary hover:underline">foundation.hopai@gmail.com</a>.</p>
         </div>

         <div className="space-y-3">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">4. Programs, Training, and Events</h3>
            <div>
               <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">4.1 Enrollment and Participation</h4>
               <p>Enrollment is subject to availability and eligibility assessments. The Foundation reserves the right to modify, postpone, or cancel any program, providing reasonable notice where possible. Respectful and constructive participation is required.</p>
            </div>
            <div>
               <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">4.2 Fees and Payments</h4>
               <p>Many programs are free or subsidised. Any fee-based premium programs will be clearly communicated. Fees are non-refundable unless the program is cancelled by the Foundation. All revenue directly supports our charitable objectives.</p>
            </div>
            <div>
               <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">4.3 Certifications and Digital Badges</h4>
               <p>Certifications are issued only upon successful completion of assessments and attendance criteria. Misrepresentation is prohibited, and the Foundation reserves the right to revoke credentials in cases of fraud or misconduct.</p>
            </div>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">5. Intellectual Property</h3>
            <p>
               All content created, published, or distributed by HOP AI Foundation  including curricula, toolkits, branding, and software  is our intellectual property. You may use public resources for non-commercial, educational purposes with appropriate attribution. Use of our name, logo, and tagline in promotional materials requires prior written authorisation.
            </p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">6. Code of Conduct</h3>
            <p>Users and participants must treat others with respect, engage in good faith, respect confidentiality, and refrain from using the Foundation's name or resources for commercial/political gain outside the program's scope. Adhering to technology ethics is mandatory. Violations may result in program removal or certification revocation.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">7. Technology Services and Advisory</h3>
            <p>Advisory and implementation recommendations are provided in good faith. The Foundation does not warrant specific outcomes, and partner organisations are responsible for their own due diligence. The Foundation will not be liable for data loss or disruptions unless caused by gross negligence.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">8. Research and Publications</h3>
            <p>Research publications will anonymise and aggregate participant data unless written consent is obtained. Research findings represent independent analysis and do not constitute legal or financial advice.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">9. Third-Party Platforms and Links</h3>
            <p>We are not responsible for the availability, content, or practices of external third-party platforms linked to or integrated with our services. Use of those platforms is governed by their respective terms.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">10. Disclaimer of Warranties</h3>
            <p>Our website, content, and services are provided on an 'as is' and 'as available' basis. The Foundation makes no warranties regarding the accuracy of content, uninterrupted or secure access, or fitness for any particular purpose.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">11. Limitation of Liability</h3>
            <p>To the maximum extent permitted by Indian law, the Foundation, its trustees, employees, and volunteers shall not be liable for any indirect, incidental, or consequential damages resulting from your use of or inability to use our services, or reliance on our recommendations. Our aggregate liability is limited to the amount paid by you (if any) for the specific service.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">12. Donations and Funding</h3>
            <p>Donations and grants are accepted in accordance with applicable law and used exclusively for our charitable mission. Donors are responsible for verifying tax implications.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">13. Governing Law and Dispute Resolution</h3>
            <p>These Terms shall be governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts in Thiruvananthapuram, Kerala. Parties agree to attempt good-faith negotiation before initiating formal legal proceedings.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">14. Severability</h3>
            <p>If any provision of these Terms is held to be invalid or unenforceable, it shall be modified to the minimum extent necessary to make it enforceable, and all remaining provisions shall continue in full force.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">15. Entire Agreement</h3>
            <p>These Terms, our Privacy Policy, and program agreements constitute the entire agreement between you and the Foundation with respect to your use of our services.</p>
         </div>

         <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-foreground border-b border-border/40 pb-1">16. Contact Us</h3>
            <p>For questions or concerns, please contact:</p>
            <div className="p-4 bg-secondary/15 rounded-2xl border border-border/40 text-sm space-y-1 text-foreground">
               <p className="font-bold">HOP AI Foundation</p>
               <p>Building No 58/1518(1), Alu ninna Vila, Poonkulam, Thiruvananthapuram, Kerala, India – 695522</p>
               <p>Email: <a href="mailto:foundation.hopai@gmail.com" className="text-primary hover:underline">foundation.hopai@gmail.com</a></p>
               <p>Phone: +91 80754 61489</p>
            </div>
         </div>
      </div>
   );
}
