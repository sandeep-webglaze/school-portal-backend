"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolEnquiryTemplates = SchoolEnquiryTemplates;
function SchoolEnquiryTemplates(param) {
    const subject = 'Ed-Hippo School enquiry';
    const text = `A new School Enquiry has been generated.
        ${JSON.stringify(param, null, 2)}
    `;
    const html = `
        <div class="container"
        style="margin: auto;max-width:700px;border-collapse:collapse;border:1px solid #f0f1f6;align-items: center;background-color: rgba(0, 128, 0, 0.754);">
        <div style="font-size:14px;text-align:left;background-color:#f7f8fa;text-decoration:none">
            <img src="https://admin.edhippo.com/logo.jpeg" width="80" alt="Ed-Hippo"
                style="margin: 6px;border-radius: 5px;cursor: pointer;">
        </div>
        <h2 style="font-family:'Roboto',Arial;margin-left: 6px; color: #fff;">School Enquiry Details</h2>
        <div style="background-color: #fff; margin: 6px;padding: 6px;border-radius: 4px;">
            <table style="font-family:'Roboto',Arial;">
                <tr style="color:#666666">
                    <td><strong>Name</strong></td>
                    <td>${param.name}</td>
                </tr>
                <tr style="color:#666666">
                    <td><strong>Email</strong></td>
                    <td>${param.email}</td>
                </tr>
                <tr style="color:#666666">
                    <td><strong>Phone</strong></td>
                    <td>${param.phoneNumber}</td>
                </tr>
                <tr style="color:#666666">
                    <td><strong>Class</strong></td>
                    <td>${param.userClass}</td>
                </tr>
                <tr style="color:#666666">
                    <td><strong>Gender</strong></td>
                    <td>${param.gender}</td>
                </tr>
                ${param.message ? `
                <tr style="color:#666666">
                    <td><strong>Message</strong></td>
                    <td>${param.message}</td>
                </tr>` : ''}
            </table>
        </div>
    </div>
    `;
    return {
        subject,
        html,
        text,
    };
}
//# sourceMappingURL=school-enquiry.template.js.map