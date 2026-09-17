"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationUserTemplates = void 0;
function RegistrationUserTemplates({ supportMail, name, otp, validTill, }) {
    const subject = 'Welcome on board!';
    const text = `your registration OTP is ${otp}, This OTP is valid for next ${validTill} minutes`;
    const html = `
        <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#eff2f7" align="center"
        style="border-collapse:collapse">
        <tbody>
            <tr>
                <td valign="top" align="center" height="30"></td>
            </tr>
            <tr>
                <td valign="top" align="center" width="600">
                    <table border="0" align="center" cellpadding="0" cellspacing="0"
                        style="max-width:600px;border-collapse:collapse;border:1px solid #f0f1f6">
                        <tbody>
                            <tr>
                                <td width="600" valign="top" bgcolor="#FFFFFF" align="center" style="max-width:600px">
                                    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="border-collapse:collapse">
                                        <tbody>
                                            <tr>
                                                <td valign="top" align="center" bgcolor="#f7f8fa">
                                                    <table width="95%" align="center" border="0" cellspacing="0"
                                                        cellpadding="0" style="border-collapse:collapse">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" height="35"></td>
                                                            </tr>

                                                            <tr>
                                                                <td valign="top">
                                                                    <table width="105" align="left" border="0"
                                                                        cellspacing="0" cellpadding="0"
                                                                        style="border-collapse:collapse">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td height="35"><a href="#"
                                                                                        style="font-size:14px;text-align:left;color:#006ab9;text-decoration:none"
                                                                                        target="_blank"> <img
                                                                                            src="https://admin.edhippo.com/logo.jpeg"
                                                                                            width="120" alt=""
                                                                                            border="0"
                                                                                            style="font-family:'Roboto',Arial;border-radius: 5px;font-size:14px;text-align:left;color:#006ab9"
                                                                                            class="CToWUd"></a> </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td valign="top" height="25"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td valign="top" align="center">
                                                    <table width="92%" border="0" align="center" cellpadding="0"
                                                        cellspacing="0" style="border-collapse:collapse">
                                                        <tbody>
                                                            <tr>
                                                                <td height="30"></td>
                                                            </tr>

                                                            <tr>
                                                                <td valign="top" align="left">
                                                                    <table width="100%" border="0" cellspacing="0"
                                                                        cellpadding="0"
                                                                        style="border-collapse:collapse">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="left"
                                                                                    style="font-family:'Roboto',Arial;text-align:left;font-size:14px;color:#666666;line-height:20px">
                                                                                    Hello ${name},</td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td height="20"></td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td align="left"
                                                                                    style="font-family:'Roboto',Arial;text-align:left;font-size:14px;color:#666666;line-height:20px">
                                                                                    Welcome to the EdHippo Academy.
                                                                                    Below
                                                                                    is your registration OTP for
                                                                                    starting your
                                                                                    journey of finding new home with our
                                                                                    community
                                                                                </td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td height="20"></td>
                                                                            </tr>

                                                                            <tr align="center">
                                                                                <td align="center">
                                                                                    <a target="_blank"
                                                                                        style="font-family:'Roboto',Arial;font-size:16px;color:#fff;background-color: #278b21; padding:15px; width: 150px; display: block; cursor: pointer; text-decoration: none;border-radius: 5px;">
                                                                                        ${otp}
                                                                                    </a>
                                                                                </td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td height="20"></td>
                                                                            </tr>

                                                                            <tr align="center">
                                                                                <td align="center"
                                                                                    style="font-family:'Roboto',Arial;text-align:left;font-size:14px;color:#666666;line-height:20px">
                                                                                    This OTP is only valid for the next
                                                                                    ${validTill} minutes.</td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td height="20"></td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td align="left"
                                                                                    style="font-family:'Roboto',Arial;text-align:left;font-size:14px;color:#666666;line-height:20px">
                                                                                    Regards<br>EdHippo Academy Support
                                                                                    Team
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td height="39"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td valign="top" align="center">
                    <table style="width:100%;max-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0"
                        align="center">
                        <tbody>
                            <tr>
                                <td align="center">
                                    <!--container-->
                                    <table class="row" style="width:600px;max-width:600px;" width="600" cellspacing="0"
                                        cellpadding="0" border="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td bgcolor="#278b21" align="center">
                                                    <!--wrapper-->
                                                    <table class="row" style="width:540px;max-width:540px;" width="540"
                                                        cellspacing="0" cellpadding="0" border="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td class="container-padding" align="center">
                                                                    <!-- content container -->
                                                                    <table width="540" border="0" cellpadding="0"
                                                                        cellspacing="0" align="center" class="row"
                                                                        style="width:540px;max-width:540px;">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center">
                                                                                    <!-- content -->
                                                                                    <table border="0" width="100%"
                                                                                        cellpadding="0" cellspacing="0"
                                                                                        align="center"
                                                                                        style="width:100%; max-width:100%;">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td height="40">&nbsp;
                                                                                                </td>
                                                                                            </tr>
                                                                                            <!-- <tr>
                                                                                             <td align="center" style="font-family:'Josefin Sans', Arial, Helvetica, sans-serif;font-size: 18px;color: #ffffff;font-weight: 400;">Get in Touch</td>
                                                                                         </tr> -->
                                                                                            <tr>
                                                                                                <td height="20">&nbsp;
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center"
                                                                                                    style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size: 13px;color: #ffffff;line-height: 19px">
                                                                                                    Kindly note that
                                                                                                    this is
                                                                                                    a system generated
                                                                                                    email. PLEASE DO NOT
                                                                                                    REPLY.<br> For any
                                                                                                    help
                                                                                                    assistance and
                                                                                                    support,
                                                                                                    you can email us on
                                                                                                    <a href="mailto:${supportMail}"
                                                                                                        target="_blank"
                                                                                                        style="color: #ffffff">${supportMail}.</a>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>&nbsp;</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center">
                                                                                                    <table
                                                                                                        cellspacing="0"
                                                                                                        cellpadding="0"
                                                                                                        border="0">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="center"
                                                                                                                    style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size: 13px;color: #ffffff;line-height: 20px;text-decoration: underline">
                                                                                                                    <a href="https://www.edhippo.com/terms"
                                                                                                                        target="_blank"
                                                                                                                        style="color: #ffffff">Terms
                                                                                                                        of
                                                                                                                        service
                                                                                                                    </a>
                                                                                                                </td>
                                                                                                                <td width="20"
                                                                                                                    align="center"
                                                                                                                    style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size: 13px;color: #ffffff;line-height: 20px;">
                                                                                                                    |
                                                                                                                </td>
                                                                                                                <td align="center"
                                                                                                                    style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size: 13px;color: #ffffff;line-height: 20px;text-decoration: underline">
                                                                                                                    <a href="https://www.edhippo.com/privacy-policy"
                                                                                                                        target="_blank"
                                                                                                                        style="color: #ffffff">Privacy
                                                                                                                        Policy
                                                                                                                    </a>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td height="40">&nbsp;
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    `;
    return {
        subject,
        html,
        text,
    };
}
exports.RegistrationUserTemplates = RegistrationUserTemplates;
//# sourceMappingURL=register-user-otp.template.js.map