export const fetchDataFromIframe = async (link) => {
    return new Promise((resolve, reject) => {
        // Create an iframe element
        const iframe = document.createElement('iframe');

        // Set iframe styles to make it hidden
        iframe.style.position = 'absolute';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        iframe.style.visibility = 'hidden';

        // Set the source of the iframe
        iframe.src = link;

        // Append the iframe to the body
        document.body.appendChild(iframe);

        // On load event
        iframe.onload = () => {
            try {
                // Access the content of the iframe
                const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                const data = iframeDocument.body.innerHTML;

                // Resolve the promise with the data
                resolve(data);

                // Remove the iframe from the body
                document.body.removeChild(iframe);
            } catch (error) {
                reject(new Error('Failed to read content from iframe'));
            }
        };

        // Handle iframe load error
        iframe.onerror = () => {
            reject(new Error('Failed to load iframe content'));
            document.body.removeChild(iframe);
        };
    });
};

