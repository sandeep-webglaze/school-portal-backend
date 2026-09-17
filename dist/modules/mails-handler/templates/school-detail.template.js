"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolDetailTemplates = SchoolDetailTemplates;
function SchoolDetailTemplates(param) {
    const subject = 'Ed-Hippo School detail';
    const text = `Details of School.
        ${JSON.stringify(param, null, 2)}
    `;
    const html = `
        <div class="container"
        style="margin: auto;max-width:700px;border-collapse:collapse;border:1px solid #f0f1f6;align-items: center;background-color: rgba(0, 128, 0, 0.754);">
        <div style="font-size:14px;text-align:left;background-color:#f7f8fa;text-decoration:none">
            <img src="https://admin.edhippo.com/logo.jpeg" width="80" alt="Ed-Hippo"
                style="margin: 6px;border-radius: 5px;cursor: pointer;">
        </div>
        <h2 style="font-family:'Roboto',Arial;margin-left: 6px; color: #fff;">School Details</h2>
        <div style="background-color: #fff; margin: 6px;padding: 6px;border-radius: 4px;">
            <table style="font-family:'Roboto',Arial;">
                <tr style="color:#666666">
                    <td><strong>School Name</strong></td>
                    <td>${param.name}</td>
                </tr>
                <tr style="color:#666666">
                    <td><strong>City</strong></td>
                    <td>${param.city}</td>
                </tr>
                <tr style="color:#666666">
                    <td><strong>Classification</strong></td>
                    <td>${param.classification}</td>
                </tr>
                <tr style="color:#666666">
                    <td><strong>Chairman</strong></td>
                    <td>${param.chairman}</td>
                </tr>
                <tr style="color:#666666">
                    <td><strong>School Medium</strong></td>
                    <td>${param.medium}</td>
                </tr>
                <tr style="color:#666666">
                    <td><strong>Admission Start</strong></td>
                    <td>${param.admissionStart}</td>
                </tr>
                <tr style="color:#666666">
                    <td><strong>Admission End</strong></td>
                    <td>${param.admissionEnd}</td>
                </tr>
                <tr style="color:#666666">
                    <td><strong>Class</strong></td>
                    <td>${param.classFrom}-${param.classTo}</td>
                </tr>
                <tr style="color:#666666">
                    <td><strong>Establishment Year</strong></td>
                    <td>${param.establishmentYear}</td>
                </tr>
            </table>
        </div>
        <a href="https://www.edhippo.com/school/${param.slug}"
            style="margin: auto;padding: 8px 20px;width: fit-content;margin-bottom: 8px;font-family:'Roboto',Arial;font-size:16px;background-color:#fff;color: #278b21; display: block; cursor: pointer; text-decoration: none; border-radius: 5px;align-items: center;">
            View School
        </a>
    </div>
    `;
    return {
        subject,
        html,
        text,
    };
}
//# sourceMappingURL=school-detail.template.js.map