const SupportTicketService = (function (){
    //CHECK FOR FILE SIZE.
    //2MB = 2097152
    //5MB = 5242880
    //10MB = 10485760
    const MAX_ATTACHMENT = {
        items: 5,
        size: 5242880,
    }
    const EMAIL_REGEX = /^([\w-\.\+]+@([\w-]+\.)+[\w-]{2,4})?$/;
    let attachmentIdCounter = 0;

    function createId() {
        return `attachment_id_${++attachmentIdCounter}`;
    }

    function fileSizeToString(number) {
        if(number < 1024) {
            return number + "bytes"
        } else if(number >= 1024 && number < 1048576) {
            return (number/1024).toFixed(1) + "KB"
        } else if(number >= 1048576) {
            return (number/1048576).toFixed(1) + "MB"
        }
    }

    function noopValidator($inputElement) { return ""}

    function requiredValidator($inputElement) {
        return $inputElement.val() ? "" : `The ${$inputElement.attr("id")} is required`
    }

    function emailValidator($inputElement) {
        if(!$inputElement.val()) {
            return ""
        }

        return EMAIL_REGEX.test($inputElement.val()) ? "" : `The ${$inputElement.attr("id")} format is invalid. Expected a valid email address`
    }

    function requiredEmailValidator($inputElement) {
        return requiredValidator($inputElement) || emailValidator($inputElement)
    }

    const validators = {
        email: requiredEmailValidator,
        cc: emailValidator,
        subject: requiredValidator,
        description: requiredValidator,
    }

    function showValidationError($inputFieldElement, inputFieldErrorId, errorMessage) {
        $inputFieldElement.parent().addClass("has-error")
        //data-validation-location CAN ONLY BE before or after
        const errorLocation = $inputFieldElement.attr("data-validation-location") || "after"
        $inputFieldElement[errorLocation](`<div class="help-block" id="${inputFieldErrorId}">${errorMessage}</div>`)
    }

    function clearValidationError($inputFieldElement, inputFieldErrorId) {
        $inputFieldElement.parent().removeClass("has-error")
        $(`#${inputFieldErrorId}`).remove()
    }

    function focusOnInput($inputFieldElement) {
        $inputFieldElement.focus()
        $(`label[for='${$inputFieldElement.attr("id")}']`).get(0).scrollIntoView({ behavior: "smooth", block: "center" })
    }

    function validateForm(event) {
        let $errorElement = null
        $("[data-toggle='form-validate']").each((index, element) => {
            const $inputFieldElement = $(element);
            const inputFieldId = $inputFieldElement.attr("id")
            const inputFieldErrorId = `${inputFieldId}_error`
            clearValidationError($inputFieldElement, inputFieldErrorId)

            const validator = validators[inputFieldId] || noopValidator
            const errorMessage = validator($inputFieldElement)
            if (errorMessage) {
                $errorElement = $errorElement || $inputFieldElement
                showValidationError($inputFieldElement, inputFieldErrorId, errorMessage)
            }
        })
        if($errorElement) {
            event.preventDefault();
            focusOnInput($errorElement)
            return
        }

        //SHOW FULL PAGE SPINNER
        $("body").addClass("modal-open")
        $("#full-page-spinner").show()
    }

    function clearAttachmentsError() {
        const $attachmentsElement = $("#attachments")
        const errorElementId = "attachments_error"
        clearValidationError($attachmentsElement, errorElementId)
    }

    function showAttachmentsError(message) {
        const $attachmentsElement = $("#attachments")
        const errorElementId = "attachments_error"
        showValidationError($attachmentsElement, errorElementId, message)
    }

    function deleteAttachment(event) {
        clearAttachmentsError()
        const attachmentContainerId = event.currentTarget.getAttribute("data-attachment-container")
        $(`#${attachmentContainerId}`).remove()
    }

    function updateAttachmentContent(event) {
        clearAttachmentsError()
        const $fileElement = $(event.currentTarget)
        const files = $fileElement.prop('files')
        if (!files || files.length === 0) {
            return
        }

        const fileInfo = files[0]
        if(fileInfo.size > MAX_ATTACHMENT.size) {
            createAttachmentElement((newAttachment) => {
                $fileElement.parent().replaceWith(newAttachment)
            })
            showAttachmentsError(`Max attachment size is ${fileSizeToString(MAX_ATTACHMENT.size)}. Selected file size is ${fileSizeToString(fileInfo.size)}`)
            return
        }

        const fileInputId = event.currentTarget.id
        $(`label[for='${fileInputId}']`).text(`Selected file: ${fileInfo.name} (${fileSizeToString(fileInfo.size)}).`)
    }

    function createAttachmentElement(attachmentPlacementCallback) {
        const newAttachmentContainerId = createId()
        const newFileInputId = createId()
        const newAttachment =
        `<div class="attachment-input" id="${newAttachmentContainerId}">
           <div class="form-control attachment-input-content">
              <label class="attachment-file-label" for="${newFileInputId}">No file selected</label>
              <span class="attachment-delete" data-toggle="attachment-delete" data-attachment-container="${newAttachmentContainerId}" title="Delete attachment"><i class="fas fa-trash-alt"></i></span>
           </div>
           <input class="form-control"  type="file" name="support_ticket[attachments][]" id="${newFileInputId}">
        </div>`

        attachmentPlacementCallback(newAttachment)
        $("input[type='file']").on("change", updateAttachmentContent)
        $("[data-toggle='attachment-delete']").on("click", deleteAttachment)
        return newAttachment
    }

    function addAttachment() {
        clearAttachmentsError()
        if($("input[type='file']").length >= MAX_ATTACHMENT.items ) {
            showAttachmentsError("No more attachments allowed")
            return
        }

        createAttachmentElement((newAttachment) => {
            $("#attachments-container").append(newAttachment)
        })
    }

    $(function() {
        $("[data-toggle='attachments-add']").on("click", addAttachment)
        $("#new_support_ticket").submit(validateForm)
    });

    return { addAttachment, createId, validateForm }
})()