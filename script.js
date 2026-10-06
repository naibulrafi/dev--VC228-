let requirementsData = null;

let requirements = [];

let uploadedFiles = [];

let matches = {};

let language = "en";


const $ = function(id) {
    return document.getElementById(id);
};


pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";


const ui = {

    en: {

        appTitle: "Tender Document Package Builder",

        appSubtitle:
            "Check, match and combine tender documents in the browser.",

        language: "বাংলা",

        requirementsHeading:
            "1. Tender Requirements",

        requirementsLabel:
            "Open requirements.json",

        requirementsHint:
            "Load the requirements.json file supplied with the problem.",

        uploadHeading:
            "2. Upload PDF Files",

        uploadLimit:
            "Up to 30 PDFs and 50 MB total.",

        uploadLabel:
            "Choose PDF files",

        clearFiles:
            "Clear Files",

        matchHeading:
            "3. Match Documents",

        matchHint:
            "Match each uploaded PDF to at most one requirement.",

        statusHeading:
            "4. Status Check",

        statusHint:
            "Fix every blocking status before generating the package.",

        generateHeading:
            "5. Generate Package",

        generateHint:
            "The button stays disabled while a blocking problem exists.",

        generate:
            "Generate PDF Package",

        noRequirements:
            "No requirements loaded yet.",

        noFiles:
            "No PDF files uploaded yet.",

        tenderId:
            "Tender ID",

        tenderTitle:
            "Tender Title",

        procuringEntity:
            "Procuring Entity",

        bidder:
            "Bidder",

        deadline:
            "Submission Deadline",

        pages:
            "pages",

        remove:
            "Remove",

        noFile:
            "No file",

        expiry:
            "Expiry date",

        mandatory:
            "Mandatory",

        optional:
            "Optional",

        missing:
            "Missing",

        expiryNeeded:
            "Expiry date needed",

        expired:
            "Expired",

        notProvided:
            "Not provided",

        ok:
            "OK",

        blocking:
            "blocking",

        ready:
            "Ready to generate.",

        notReady:
            "Fix blocking statuses first.",

        duplicates:
            "Duplicate",

        packageCreated:
            "Package created successfully.",

        invalidPdf:
            "Only PDF files are allowed.",

        tooMany:
            "Maximum 30 PDF files allowed.",

        tooLarge:
            "Total PDF size must not exceed 50 MB.",

        invalidJson:
            "Invalid requirements.json.",

        duplicateMatch:
            "This file is already matched to another requirement.",

        noBlocking:
            "No blocking problems.",

        reason:
            "Reason"

    },


    bn: {

        appTitle:
            "টেন্ডার ডকুমেন্ট প্যাকেজ বিল্ডার",

        appSubtitle:
            "ব্রাউজারের মধ্যে টেন্ডার ডকুমেন্ট যাচাই, মিল এবং একত্র করুন।",

        language:
            "English",

        requirementsHeading:
            "১. টেন্ডারের প্রয়োজনীয়তা",

        requirementsLabel:
            "requirements.json খুলুন",

        requirementsHint:
            "Problem-এর দেওয়া requirements.json ফাইলটি লোড করুন।",

        uploadHeading:
            "২. PDF ফাইল আপলোড",

        uploadLimit:
            "সর্বোচ্চ ৩০টি PDF এবং মোট ৫০ MB।",

        uploadLabel:
            "PDF ফাইল নির্বাচন করুন",

        clearFiles:
            "ফাইল মুছুন",

        matchHeading:
            "৩. ডকুমেন্ট মিল করুন",

        matchHint:
            "প্রতিটি PDF সর্বোচ্চ একটি requirement-এর সাথে মিল করুন।",

        statusHeading:
            "৪. Status Check",

        statusHint:
            "Package তৈরি করার আগে সব blocking সমস্যা ঠিক করুন।",

        generateHeading:
            "৫. Package তৈরি করুন",

        generateHint:
            "Blocking সমস্যা থাকলে Generate button বন্ধ থাকবে।",

        generate:
            "PDF Package তৈরি করুন",

        noRequirements:
            "এখনও requirements লোড করা হয়নি।",

        noFiles:
            "এখনও কোনো PDF আপলোড করা হয়নি।",

        tenderId:
            "টেন্ডার ID",

        tenderTitle:
            "টেন্ডারের নাম",

        procuringEntity:
            "ক্রয়কারী প্রতিষ্ঠান",

        bidder:
            "বিডার",

        deadline:
            "জমাদানের শেষ তারিখ",

        pages:
            "পৃষ্ঠা",

        remove:
            "মুছুন",

        noFile:
            "কোনো ফাইল নেই",

        expiry:
            "মেয়াদ শেষের তারিখ",

        mandatory:
            "আবশ্যিক",

        optional:
            "ঐচ্ছিক",

        missing:
            "নেই",

        expiryNeeded:
            "Expiry date প্রয়োজন",

        expired:
            "মেয়াদ শেষ",

        notProvided:
            "দেওয়া হয়নি",

        ok:
            "ঠিক আছে",

        blocking:
            "blocking",

        ready:
            "Package তৈরির জন্য প্রস্তুত।",

        notReady:
            "আগে blocking status ঠিক করুন।",

        duplicates:
            "Duplicate",

        packageCreated:
            "Package সফলভাবে তৈরি হয়েছে।",

        invalidPdf:
            "শুধু PDF ফাইল দেওয়া যাবে।",

        tooMany:
            "সর্বোচ্চ ৩০টি PDF দেওয়া যাবে।",

        tooLarge:
            "সব PDF মিলিয়ে সর্বোচ্চ ৫০ MB হতে পারবে।",

        invalidJson:
            "requirements.json সঠিক নয়।",

        duplicateMatch:
            "এই ফাইলটি অন্য একটি requirement-এ আগে থেকেই matched।",

        noBlocking:
            "কোনো blocking সমস্যা নেই।",

        reason:
            "কারণ"

    }

};


function t(key) {

    return ui[language][key] || key;

}


function titleFor(req) {

    if (language === "bn") {

        return req.title_bn ||
            req.title_en ||
            req.title ||
            req.id;

    }

    return req.title_en ||
        req.title ||
        req.title_bn ||
        req.id;

}


function setText(id, key) {

    if ($(id)) {

        $(id).textContent = t(key);

    }

}


function updateLanguage() {

    document.documentElement.lang =
        language === "bn" ? "bn" : "en";


    setText("appTitle", "appTitle");

    setText("appSubtitle", "appSubtitle");

    setText("languageBtn", "language");

    setText(
        "requirementsHeading",
        "requirementsHeading"
    );

    setText(
        "requirementsLabel",
        "requirementsLabel"
    );

    setText(
        "requirementsHint",
        "requirementsHint"
    );

    setText(
        "uploadHeading",
        "uploadHeading"
    );

    setText(
        "uploadLimit",
        "uploadLimit"
    );

    setText(
        "uploadLabel",
        "uploadLabel"
    );

    setText(
        "clearFilesBtn",
        "clearFiles"
    );

    setText(
        "matchHeading",
        "matchHeading"
    );

    setText(
        "matchHint",
        "matchHint"
    );

    setText(
        "statusHeading",
        "statusHeading"
    );

    setText(
        "statusHint",
        "statusHint"
    );

    setText(
        "generateHeading",
        "generateHeading"
    );

    setText(
        "generateHint",
        "generateHint"
    );

    setText(
        "generateBtn",
        "generate"
    );


    renderTender();

    renderFiles();

    renderRequirements();

    renderStatuses();

}


function toggleLanguage() {

    language =
        language === "en" ? "bn" : "en";

    localStorage.setItem(
        "tdpb-language",
        language
    );

    updateLanguage();

}


$("requirementsFile").addEventListener(
    "change",
    async function(event) {

        const file =
            event.target.files[0];

        if (!file) return;


        try {

            const text =
                await file.text();

            const data =
                JSON.parse(text);


            if (
                !data.tender ||
                !Array.isArray(data.requirements)
            ) {

                throw new Error(
                    "Invalid structure"
                );

            }


            requirementsData = data;


            requirements =
                data.requirements.slice();


            requirements.sort(
                function(a, b) {

                    return Number(a.order) -
                        Number(b.order);

                }
            );


            matches = {};


            uploadedFiles.forEach(
                function(item) {

                    item.matchedRequirement =
                        null;

                }
            );


            renderTender();

            renderRequirements();

            renderStatuses();

            showMessage(
                "fileMessage",
                "",
                ""
            );


        } catch (error) {

            requirementsData = null;

            requirements = [];

            matches = {};

            renderRequirements();

            renderStatuses();

            showMessage(
                "fileMessage",
                t("invalidJson"),
                "error"
            );

        }

    }
);


$("pdfFiles").addEventListener(
    "change",
    async function(event) {

        const files =
            Array.from(
                event.target.files || []
            );


        if (!files.length) return;


        const currentSize =
            uploadedFiles.reduce(
                function(sum, item) {

                    return sum + item.file.size;

                },
                0
            );


        const incomingSize =
            files.reduce(
                function(sum, file) {

                    return sum + file.size;

                },
                0
            );


        if (
            uploadedFiles.length +
            files.length > 30
        ) {

            showMessage(
                "fileMessage",
                t("tooMany"),
                "error"
            );

            return;

        }


        if (
            currentSize +
            incomingSize >
            50 * 1024 * 1024
        ) {

            showMessage(
                "fileMessage",
                t("tooLarge"),
                "error"
            );

            return;

        }


        const newItems = [];


        for (const file of files) {

            if (
                file.type !== "application/pdf" &&
                !file.name
                    .toLowerCase()
                    .endsWith(".pdf")
            ) {

                showMessage(
                    "fileMessage",
                    file.name +
                    ": " +
                    t("invalidPdf"),
                    "error"
                );

                continue;

            }


            try {

                const buffer =
                    await file.arrayBuffer();


                const pdf =
                    await pdfjsLib
                        .getDocument({
                            data: buffer.slice(0)
                        })
                        .promise;


                const hash =
                    await sha256(buffer);


                const duplicate =
                    uploadedFiles.find(
                        function(item) {

                            return item.hash === hash;

                        }
                    ) ||
                    newItems.find(
                        function(item) {

                            return item.hash === hash;

                        }
                    );


                newItems.push({

                    id:
                        crypto.randomUUID
                            ? crypto.randomUUID()
                            : String(
                                Date.now() +
                                Math.random()
                            ),

                    file: file,

                    buffer: buffer,

                    pages:
                        pdf.numPages,

                    hash: hash,

                    duplicate:
                        Boolean(duplicate),

                    matchedRequirement:
                        null,

                    expiry: ""

                });


            } catch (error) {

                showMessage(
                    "fileMessage",
                    file.name +
                    ": PDF could not be read.",
                    "error"
                );

            }

        }


        uploadedFiles.push(
            ...newItems
        );


        $("pdfFiles").value = "";


        renderFiles();

        renderRequirements();

        renderStatuses();

    }
);


async function sha256(buffer) {

    const digest =
        await crypto.subtle.digest(
            "SHA-256",
            buffer
        );


    return Array.from(
        new Uint8Array(digest)
    )
        .map(
            function(byte) {

                return byte
                    .toString(16)
                    .padStart(2, "0");

            }
        )
        .join("");

}


function showMessage(
    id,
    message,
    type
) {

    const element = $(id);

    if (!element) return;


    element.textContent =
        message;


    element.className =
        "message" +
        (
            type
                ? " " + type
                : ""
        );

}


function clearFiles() {

    uploadedFiles = [];

    matches = {};


    renderFiles();

    renderRequirements();

    renderStatuses();


    showMessage(
        "fileMessage",
        "",
        ""
    );

}


function removeFile(id) {

    const item =
        uploadedFiles.find(
            function(file) {

                return file.id === id;

            }
        );


    if (!item) return;


    if (item.matchedRequirement) {

        delete matches[
            item.matchedRequirement
        ];

    }


    uploadedFiles =
        uploadedFiles.filter(
            function(file) {

                return file.id !== id;

            }
        );


    renderFiles();

    renderRequirements();

    renderStatuses();

}


function renderTender() {

    const box =
        $("tenderInfo");


    if (!requirementsData) {

        box.className =
            "info-grid empty";


        box.innerHTML =
            "<p>" +
            t("requirementsHint") +
            "</p>";


        return;

    }


    const tender =
        requirementsData.tender;


    box.className =
        "info-grid";


    box.innerHTML = `

        <div class="info-item">

            <strong>${t("tenderId")}</strong>

            ${escapeHtml(
                tender.tender_id || "-"
            )}

        </div>


        <div class="info-item">

            <strong>${t("tenderTitle")}</strong>

            ${escapeHtml(
                tender.title || "-"
            )}

        </div>


        <div class="info-item">

            <strong>${t("procuringEntity")}</strong>

            ${escapeHtml(
                tender.procuring_entity || "-"
            )}

        </div>


        <div class="info-item">

            <strong>${t("bidder")}</strong>

            ${escapeHtml(
                tender.bidder || "-"
            )}

        </div>


        <div class="info-item">

            <strong>${t("deadline")}</strong>

            ${escapeHtml(
                tender.submission_deadline || "-"
            )}

        </div>

    `;

}


function renderFiles() {

    const box =
        $("filesList");


    if (!uploadedFiles.length) {

        box.innerHTML =
            `
            <div class="file-row">
                ${t("noFiles")}
            </div>
            `;

        return;

    }


    box.innerHTML =
        uploadedFiles
            .map(
                function(item) {

                    return `

                    <div class="file-row">

                        <div>

                            <div class="file-name">

                                ${escapeHtml(
                                    item.file.name
                                )}

                            </div>

                            <div class="small">

                                ${item.pages}
                                ${t("pages")}
                                ·
                                ${formatMB(
                                    item.file.size
                                )}

                                ${
                                    item.duplicate
                                        ? " · <strong>" +
                                          t("duplicates") +
                                          "</strong>"
                                        : ""
                                }

                            </div>

                        </div>


                        <button
                            class="secondary"
                            onclick="removeFile('${item.id}')"
                        >

                            ${t("remove")}

                        </button>

                    </div>

                    `;

                }
            )
            .join("");

}


function renderRequirements() {

    const box =
        $("requirementsList");


    if (!requirements.length) {

        box.innerHTML =
            `
            <div class="requirement-row">
                ${t("noRequirements")}
            </div>
            `;

        return;

    }


    box.innerHTML =
        requirements
            .map(
                function(req) {

                    const currentId =
                        matches[req.id] || "";


                    const options =
                        uploadedFiles
                            .filter(
                                function(item) {

                                    const assignedElsewhere =
                                        Object.entries(
                                            matches
                                        ).some(
                                            function(entry) {

                                                const reqId =
                                                    entry[0];

                                                const fileId =
                                                    entry[1];


                                                return (
                                                    reqId !==
                                                    req.id &&
                                                    fileId ===
                                                    item.id
                                                );

                                            }
                                        );


                                    return (
                                        !assignedElsewhere ||
                                        item.id ===
                                        currentId
                                    );

                                }
                            )
                            .map(
                                function(item) {

                                    return `

                                    <option
                                        value="${item.id}"
                                        ${
                                            item.id ===
                                            currentId
                                                ? "selected"
                                                : ""
                                        }
                                    >

                                        ${escapeHtml(
                                            item.file.name
                                        )}

                                        (${item.pages}
                                        ${t("pages")})

                                        ${
                                            item.duplicate
                                                ? " - " +
                                                  t("duplicates")
                                                : ""
                                        }

                                    </option>

                                    `;

                                }
                            )
                            .join("");


                    const requirementType =
                        req.mandatory
                            ? t("mandatory")
                            : t("optional");


                    return `

                    <div class="requirement-row">

                        <div>

                            <div class="requirement-title">

                                ${Number(req.order)}.
                                ${escapeHtml(
                                    titleFor(req)
                                )}

                            </div>


                            <div class="requirement-meta">

                                ${escapeHtml(
                                    req.id || ""
                                )}

                                ·

                                ${requirementType}

                                ${
                                    req.has_expiry
                                        ? " · " +
                                          t("expiry")
                                        : ""
                                }

                            </div>

                        </div>


                        <select
                            onchange="setMatch(
                                '${req.id}',
                                this.value
                            )"
                        >

                            <option value="">

                                ${t("noFile")}

                            </option>

                            ${options}

                        </select>


                        <div>

                            ${
                                currentId &&
                                req.has_expiry

                                    ? `

                                    <input
                                        type="date"
                                        value="${escapeAttr(
                                            getFile(
                                                currentId
                                            )?.expiry || ""
                                        )}"
                                        onchange="setExpiry(
                                            '${currentId}',
                                            this.value
                                        )"
                                    >

                                    `

                                    : ""

                            }

                        </div>

                    </div>

                    `;

                }
            )
            .join("");

}


function setMatch(
    reqId,
    fileId
) {

    const oldFileId =
        matches[reqId];


    if (oldFileId) {

        const old =
            getFile(oldFileId);


        if (old) {

            old.matchedRequirement =
                null;

        }

    }


    if (!fileId) {

        delete matches[reqId];


        renderRequirements();

        renderStatuses();

        return;

    }


    const duplicate =
        getFile(fileId)?.duplicate;


    if (duplicate) {

        showMessage(
            "fileMessage",
            language === "bn"
                ? "Duplicate file অন্য document-এ match করা যাবে না।"
                : "A duplicate file cannot be matched to a document.",
            "error"
        );


        renderRequirements();

        return;

    }


    const assigned =
        Object.entries(matches)
            .find(
                function(entry) {

                    const id =
                        entry[0];

                    const value =
                        entry[1];


                    return (
                        id !== reqId &&
                        value === fileId
                    );

                }
            );


    if (assigned) {

        showMessage(
            "fileMessage",
            t("duplicateMatch"),
            "error"
        );


        renderRequirements();

        return;

    }


    matches[reqId] =
        fileId;


    const item =
        getFile(fileId);


    if (item) {

        item.matchedRequirement =
            reqId;

    }


    showMessage(
        "fileMessage",
        "",
        ""
    );


    renderRequirements();

    renderStatuses();

}


function setExpiry(
    fileId,
    value
) {

    const item =
        getFile(fileId);


    if (item) {

        item.expiry =
            value;

    }


    renderStatuses();

}


function getFile(id) {

    return uploadedFiles.find(
        function(item) {

            return item.id === id;

        }
    );

}


function getStatus(req) {

    const fileId =
        matches[req.id];


    const item =
        getFile(fileId);


    if (!item) {

        if (req.mandatory) {

            return {

                key: "missing",

                blocking: true,

                reason: t("missing")

            };

        }


        return {

            key: "notProvided",

            blocking: false,

            reason: t("notProvided")

        };

    }


    if (item.duplicate) {

        return {

            key: "missing",

            blocking: true,

            reason: t("duplicates")

        };

    }


    if (req.has_expiry) {

        if (!item.expiry) {

            return {

                key: "expiryNeeded",

                blocking: true,

                reason: t("expiryNeeded")

            };

        }


        const deadline =
            requirementsData
                ?.tender
                ?.submission_deadline;


        if (
            deadline &&
            item.expiry < deadline
        ) {

            return {

                key: "expired",

                blocking: true,

                reason: t("expired")

            };

        }

    }


    return {

        key: "ok",

        blocking: false,

        reason: t("ok")

    };

}


function renderStatuses() {

    const box =
        $("statusList");


    if (!requirements.length) {

        box.innerHTML =
            `
            <div class="status-row">
                ${t("noRequirements")}
            </div>
            `;


        updateGenerateState(0);

        return;

    }


    let blocking = 0;


    box.innerHTML =
        requirements
            .map(
                function(req) {

                    const status =
                        getStatus(req);


                    if (status.blocking) {

                        blocking++;

                    }


                    const cls =
                        status.blocking
                            ? "status-block"
                            : status.key ===
                              "notProvided"
                                ? "status-neutral"
                                : "status-ok";


                    return `

                    <div class="status-row">

                        <div class="status-left">

                            <strong>

                                ${Number(req.order)}.
                                ${escapeHtml(
                                    titleFor(req)
                                )}

                            </strong>


                            <p>

                                ${t("reason")}:
                                ${escapeHtml(
                                    status.reason
                                )}

                            </p>

                        </div>


                        <span
                            class="status-badge ${cls}"
                        >

                            ${t(status.key)}

                        </span>

                    </div>

                    `;

                }
            )
            .join("");


    updateGenerateState(
        blocking
    );

}


function updateGenerateState(
    blocking
) {

    $("generateBtn").disabled =
        !requirementsData ||
        requirements.length === 0 ||
        blocking > 0;


    $("summary").textContent =
        blocking
            ? blocking +
              " " +
              t("blocking")
            : t("noBlocking");


    showMessage(
        "generateMessage",
        blocking
            ? t("notReady")
            : (
                requirements.length
                    ? t("ready")
                    : ""
            ),
        blocking
            ? "warning"
            : "success"
    );

}


async function generatePackage() {

    if (
        !requirementsData ||
        !requirements.length
    ) {

        return;

    }


    const statuses =
        requirements.map(
            function(req) {

                return getStatus(req);

            }
        );


    if (
        statuses.some(
            function(status) {

                return status.blocking;

            }
        )
    ) {

        showMessage(
            "generateMessage",
            t("notReady"),
            "error"
        );

        return;

    }


    const PDFDocument =
        PDFLib.PDFDocument;


    const StandardFonts =
        PDFLib.StandardFonts;


    const rgb =
        PDFLib.rgb;


    const outputPdf =
        await PDFDocument.create();


    const font =
        await outputPdf.embedFont(
            StandardFonts.Helvetica
        );


    const cover =
        outputPdf.addPage([
            595.28,
            841.89
        ]);


    const tender =
        requirementsData.tender;


    const margin = 45;


    let y = 795;


    function draw(
        text,
        size = 11
    ) {

        cover.drawText(
            String(text),
            {

                x: margin,

                y: y,

                size: size,

                font: font,

                color: rgb(
                    0,
                    0,
                    0
                )

            }
        );


        y -=
            size + 9;

    }


    draw(
        "Tender Document Package",
        20
    );


    y -= 5;


    draw(
        "Tender ID: " +
        (tender.tender_id || "-")
    );


    draw(
        "Tender Title: " +
        (tender.title || "-")
    );


    draw(
        "Procuring Entity: " +
        (tender.procuring_entity || "-")
    );


    draw(
        "Bidder: " +
        (tender.bidder || "-")
    );


    draw(
        "Submission Deadline: " +
        (tender.submission_deadline || "-")
    );


    draw(
        "Package Made: " +
        new Date()
            .toISOString()
            .slice(0, 10)
    );


    y -= 12;


    draw(
        "Included Documents",
        14
    );


    y -= 2;


    for (
        const req of requirements
    ) {

        const fileId =
            matches[req.id];


        const item =
            getFile(fileId);


        if (
            !item &&
            !req.mandatory
        ) {

            continue;

        }


        if (item) {

            draw(
                req.order +
                ". " +
                (
                    req.title_en ||
                    req.title ||
                    req.id
                ) +
                " - " +
                item.file.name,
                10
            );

        }

    }


    for (
        const req of requirements
    ) {

        const item =
            getFile(
                matches[req.id]
            );


        if (!item) {

            continue;

        }


        const source =
            await PDFDocument.load(
                item.buffer
            );


        const copiedPages =
            await outputPdf.copyPages(
                source,
                source.getPageIndices()
            );


        copiedPages.forEach(
            function(page) {

                outputPdf.addPage(
                    page
                );

            }
        );

    }


    const totalPages =
        outputPdf.getPageCount();


    outputPdf
        .getPages()
        .forEach(
            function(page, index) {

                page.drawText(

                    (
                        tender.tender_id ||
                        "TENDER"
                    ) +
                    " | Page " +
                    (index + 1) +
                    " of " +
                    totalPages,

                    {

                        x: 40,

                        y: 18,

                        size: 8,

                        font: font,

                        color: rgb(
                            0.2,
                            0.2,
                            0.2
                        )

                    }

                );

            }
        );


    const bytes =
        await outputPdf.save();


    const blob =
        new Blob(
            [bytes],
            {
                type:
                    "application/pdf"
            }
        );


    const safeTenderId =
        String(
            tender.tender_id ||
            "tender"
        )
            .replace(
                /[^a-zA-Z0-9_-]/g,
                "_"
            );


    const fileName =
        safeTenderId +
        "_Package.pdf";


    const url =
        URL.createObjectURL(
            blob
        );


    const a =
        document.createElement(
            "a"
        );


    a.href =
        url;


    a.download =
        fileName;


    document.body.appendChild(
        a
    );


    a.click();


    a.remove();


    URL.revokeObjectURL(
        url
    );


    showMessage(
        "generateMessage",
        t("packageCreated") +
        " " +
        fileName,
        "success"
    );

}


function formatMB(bytes) {

    return (
        bytes /
        (1024 * 1024)
    ).toFixed(2) +
    " MB";

}


function escapeHtml(value) {

    return String(
        value ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


function escapeAttr(value) {

    return escapeHtml(
        value
    );

}


language =
    localStorage.getItem(
        "tdpb-language"
    ) || "en";


updateLanguage();
