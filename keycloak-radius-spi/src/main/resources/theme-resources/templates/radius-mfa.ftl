<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "title">
        ${msg("loginTitle",realm.name)}
    <#elseif section = "header">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${msg("loginTitleHtml",realm.name)}
    <#elseif section = "form">
        <form id="kc-totp-login-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
           <div class="${properties.kcFormGroupClass!}">
             <label for="totp" class="${properties.kcLabelClass!}">${formTokenLabel}</label>
             <input tabindex="1" id="totp" class="${properties.kcInputClass!}" name="totp" type="text" autofocus autocomplete="off" />
           </div>
            <div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
                <div class="">
                    <button type="submit" class="${properties.kcButtonClass!} ${properties.kcButtonDefaultClass!} ${properties.kcButtonLargeClass!}" name="submit" value="submit">Submit</button>
                </div>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>
