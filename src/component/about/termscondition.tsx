import React from "react";
import "./about.css"
import Costum_header from "../costum_header/costum_header";
const Termscondition = () => (
    <>
    <Costum_header title={"Terms & Conditions"} classN={"about_header"} />
    <div className="container">
        <h1>Terms and Conditions</h1>
        <p>Welcome to Alki! By using our platform, you agree to the following terms and conditions. Please read them carefully before using our services.</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using the Alki website, you agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you do not agree, you may not use our services.</p>

        <h2>2. Verification of Job Locations</h2>
        <p>Alki provides a platform for users to find job opportunities and side hustles within their area using our integrated map feature. However, <strong>it is the responsibility of the user to verify the accuracy of the job location and details</strong> before attending or accepting any job offers. Alki does not guarantee the authenticity or exactness of the locations posted by employers. Users should exercise caution and verify all information independently.</p>

        <h2>3. User Conduct</h2>
        <p>You agree to use Alki in accordance with all applicable laws and regulations. <strong>You may not use Alki for any illegal activities</strong> or to post, share, or promote unlawful, fraudulent, or misleading content. Any misuse of the platform, including but not limited to fraudulent job postings or inappropriate behavior, may result in the termination of your account and further legal action.</p>

        <h2>4. Disclaimers</h2>
        <p>
            <strong>No Guarantee of Employment:</strong> Alki serves as a platform to connect individuals to job opportunities but does not guarantee employment or the accuracy of job listings.
        </p>
        <p>
            <strong>Liability:</strong> Alki is not responsible for any harm or losses that may occur as a result of your reliance on the job listings or any other content provided by third parties on our platform.
        </p>

        <h2>5. Account Responsibility</h2>
        <p>You are responsible for maintaining the confidentiality of your account information and for any activity that occurs under your account. Please notify us immediately if you suspect unauthorized use of your account.</p>

        <h2>6. Changes to Terms</h2>
        <p>Alki reserves the right to modify these Terms and Conditions at any time. We will notify users of any changes, and continued use of the platform constitutes acceptance of the updated terms.</p>

        <p><strong>By using Alki, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</strong></p>
    </div>
    </>
)

export default Termscondition;
